
/**
 * sends a request to the specified url from a form. this will change the window location.
 * @param {string} path the path to send the post request to
 * @param {object} params the parameters to add to the url
 * @param {string} [method=post] the method to use on the form
 */

function post(path, params, method = 'post') {

    // The rest of this code assumes you are not using a library.
    // It can be made less verbose if you use one.
    const form = document.createElement('form');
    form.method = method;
    form.action = path;

    for (const key in params) {
        if (params.hasOwnProperty(key)) {
            const hiddenField = document.createElement('input');
            hiddenField.type = 'hidden';
            hiddenField.name = key;
            hiddenField.value = params[key];

            form.appendChild(hiddenField);
        }
    }

    document.body.appendChild(form);
    form.submit();
}


function addInputLogic(inputs, arr) {
    var currKey;
    document.addEventListener('keydown', function (e) {
        currKey = e.key;
    });
    $(inputs).each(function (i, l) {
        $(l).attr('value', arr[i]);
        $(l).on('input', function () {
            const usingArrowKeys = currKey == 'ArrowUp' || currKey == 'ArrowDown';
            if (!usingArrowKeys) {
                if (this.value.length >= 2) this.value = this.value.slice(1);
                if (this.value.length === 1) this.value = '0' + this.value;
                if (!this.value) this.value = '00';
                // check if over the limit
                const max = $(this).attr('max');
                if (this.value > max) this.value = max;
            } else {
                if (this.value.length === 1) this.value = '0' + this.value;
                if (!this.value) this.value = '00';
            }
        });
    });
}


function pdfEmbed(pdf, target) {
    PDFObject.embed(pdf, target, {
        pdfOpenParams: {
            view: 'Fit',
            scrollbars: '0',
            toolbar: '0',
            statusbar: '0',
            navpanes: '0'
        },
        width: '400px',
        height: '550px',
        suppressConsole: true,
        forceIframe: true
    });
}

// pdfEmbed('https://www.hohtokeilailu.fi/wp-content/uploads/2021/06/kesakaadot.pdf', '#pdf1')
// pdfEmbed('../content/uploads/template1.pdf', '#pdf2')

// called by .php
function galleryAddOldPreviews(data) {
    const parent = $('.admin-panel').find('#gallery .container#old .content');
    data.forEach(e => {
        if (e.substr(e.length - 1, 1) != '.') {
            var type = '';
            const spl = e.split('.');
            switch (spl[spl.length - 1]) {
                case 'png':
                case 'jpg':
                case 'gif':
                    type = 'image'
                    break;
                case 'mp4':
                case 'mov':
                    type = 'video';
                    break;
            }
            addPreviewToGallery(type, e, parent, true);
        }
    })
}

function addPreviewToGallery(type, src, parent, deletable = false) {
    // create the parent
    const di = document.createElement('div');
    di.className = 'item';
    if (deletable) {
        di.innerHTML = `
            <div class="close" onclick="removePreview(this, '${src}')">
                <img src="./img/close.png" alt="poista kuva">
            </div>
        `;
    }
    $(parent).append(di);
    var el = null;
    // check which type the file is
    switch (type) {
        case 'image':
            el = document.createElement('img');
            break;
        case 'video':
            el = document.createElement('video');
            el.setAttribute('controls', true);
            break;
    }
    if (el != null) {
        $(el).attr('src', src);
        $(di).append(el);
    }
}

// called by the item itself, no listeners
function removePreview(item, src) {
    const t = item.parentNode;
    t.parentNode.removeChild(t);
    post('./admin/gallery_post.php', { gallery_remove_media: src.split('/').pop() });
}

$(function () {
    const panel = $('.admin-panel');
    const anchors = $(panel).find('.anchors');
    const content = $(panel).find('.content');

    // schedule
    const scheduleForm = $(content).find('#schedule');
    const timeInputs = $(scheduleForm).find('input[type=number]');
    // load the opening.json that has all of the openings
    var openingArr = [];
    fetch('./content/opening.json').then(v => v.json()).then(data => {
        data['days'].forEach(e => {
            if (e.includes(',')) {
                e.split(',').forEach(x => {
                    openingArr.push(...x.split('.'));
                });
            } else openingArr.push('00', '00', '00', '00');
        });
        
        addInputLogic(timeInputs, openingArr);

        // create a submittable .json-format xhr-request. more about the format in 'README.md'.
        $(scheduleForm).find('button[type=button]').on('click', function () {
            var arr = [];
            for (let i = 0; i < timeInputs.length; i++) {
                const a = timeInputs[i];
                const b = timeInputs[i + 1];
                if (Number.parseInt(a.value) == 0) {
                    arr.push('');
                } else {
                    arr.push(a.value);
                    if (i % 2 == 0) {
                        arr.push(Number.parseInt(b.value) != 0 ? b.value : '00');
                        i++;
                    }
                }
            }
            var arr2 = [];
            for (let i = 0; i < arr.length; i += 4)
                arr2.push(arr[i].length != 0 ? `${arr[i]}.${arr[i + 1]},${arr[i + 2]}.${arr[i + 3]}` : '');
            var output = JSON.stringify({ days: arr2 });
            const xhr = new XMLHttpRequest();
            xhr.open("POST", './admin/admin_post.php', true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
            xhr.send(output);
        });
    });


    // pricing
    const pricingForm = $(panel).find('#pricing');

    // - Hohtokeilaus hae kellonajat "opening.json" (16.00-22.00)
    // - Päiväkeilaus koko päivän 17 asti.
    // - Iltakeilaus alkaa 17 ja kestää niin pitkään kun halli on auki
    // - viikonloppu koko päivän (La & Su)

    // add already existing pricing data to the form.
    fetch('./content/index.json').then(v => v.json()).then(data => {
        const p = data['pricing'];
        function f(id) {
            $(pricingForm).find(`#${id} input`).attr('value', p[id]);
        }
        f('hohto');
        f('day');
        f('night');
        f('weekend');
        f('equipment');
        f('snooker');
        f('discount');
        
        const bs = $(pricingForm).find('#birthday_small input');
        $(bs[0]).attr('value', p['birthday_small']['normal']);
        $(bs[1]).attr('value', p['birthday_small']['hohto']);

        const ss = $(pricingForm).find('#birthday_big input');
        $(ss[0]).attr('value', p['birthday_big']['normal']);
        $(ss[1]).attr('value', p['birthday_big']['hohto']);
    });

    $(pricingForm).find('button[type="button"]').on('click', function () {
        function f(id, index = 0) {
            return Number.parseInt(
                $(pricingForm).find(`#${id} input`).eq(index).val());
        }
        var output = JSON.stringify({
            pricing: {
                birthday_small: {
                    normal: f('birthday_small'),
                    hohto: f('birthday_small', 1)
                },
                birthday_big: {
                    normal: f('birthday_big'),
                    hohto: f('birthday_big', 1)
                },
                hohto: f('hohto'),
                day: f('day'),
                night: f('night'),
                weekend: f('weekend'),
                equipment: f('equipment'),
                snooker: f('snooker'),
                discount: f('discount')
            }
        });
        const xhr = new XMLHttpRequest();
        xhr.open("POST", './admin/admin_post.php', true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
        xhr.send(output);

    });


    // activity
    const activityForm = $(panel).find('#activities');
    const eventForm = $(activityForm).find('#events');
    const competitionForm = $(activityForm).find('#competitions');
    const linkForm = $(activityForm).find('#links');
    var currentActivityIndex = -1;
    var currentActivityForm = null;
    function setActivityForm(index) {
        eventForm.attr('active', index == 0 ? 'true' : 'false');
        competitionForm.attr('active', index == 1 ? 'true' : 'false');
        linkForm.attr('active', index == 2 ? 'true' : 'false');
        currentActivityIndex = index;
        if (index == 0) currentActivityForm = eventForm;
        else if (index == 1) currentActivityForm = competitionForm;
        else currentActivityForm = linkForm;
    }
    $(panel).find('#activity-select').change(function () {
        setActivityForm($(this).val());
    });
    setActivityForm(0);

    function postNewActivity() {

        console.log($(currentActivityForm).find('input'));
        return;

        var title = "TITLE";
        var date = "20.9.2021";
        var header_image = "";
        var content = "Test content goes here";
        
        var processed_title = "title-20";

        var output = null;
        if (currentActivityIndex == 1) {
            output = {
                type: "competition",
                title: title,
                date: date,
                header_image: header_image,
                content: content,
                files: [
                    {
                        text: "Kilpailuilmoitus",
                        link: "https://www.hohtokeilailu.fi/wp-content/uploads/2021/06/kesakaadot.pdf"
                    },
                    {
                        text: "Olosuhde",
                        link: "https://www.hohtokeilailu.fi/wp-content/uploads/2021/06/vph-kuljetus-kesa-kaadot.pdf"
                    }
                ]
            };
        } else if (currentActivityIndex == 0) {
            output = {
                type: "event",
                title: title,
                date: date,
                header_image: header_image,
                content: content,
                files: [
                    {
                        text: "Kilpailuilmoitus",
                        link: "https://www.hohtokeilailu.fi/wp-content/uploads/2021/06/kesakaadot.pdf"
                    },
                    {
                        text: "Olosuhde",
                        link: "https://www.hohtokeilailu.fi/wp-content/uploads/2021/06/vph-kuljetus-kesa-kaadot.pdf"
                    }
                ]
            }; 
        } else {
            output = {
                type: "link",
                title: title,
                date: date,
                header_image: header_image,
                link: "https://www.ikatyros.com"
            };
        }
        if (output != null) {
            const xhr = new XMLHttpRequest();
            xhr.open("POST", './admin/admin_post.php', true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
            xhr.send(JSON.stringify({ activity: output, title: processed_title }));
        }
    }
    $(activityForm).find('button[type="button"]').on('click', function () {
        postNewActivity();
    });

    // gallery
    const gallery = $(panel).find('#gallery');
    const galleryPreviewHolder = $(gallery).find('.container#new .content');
    const galleryInput = $(gallery).find('#file-input');
    $(galleryInput).change(function () {
        const files = $(galleryInput).prop('files');
        $(files).each(function (i, l) {
            const reader = new FileReader();
            reader.onload = function (e) {
                addPreviewToGallery(l['type'].split('/')[0], e.target.result, galleryPreviewHolder);
            }
            reader.readAsDataURL(l);
        });
    });


    // panel expansion
    var expanded = true;
    function resizePanel(val) {
        expanded = val;
        $(panel).get(0).setAttribute('expanded', val ? 'true' : 'false');
    }
    $(anchors).find('.control').on('click', function () {
        resizePanel(!expanded);
    });
    resizePanel(false);
});