
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
    var currKey;
    document.addEventListener('keydown', function (e) {
        currKey = e.key;
    });
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
        // add input logic
        $(timeInputs).each(function (i, l) {
            $(l).attr('value', openingArr[i]);
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
            xhr.open("POST", './admin/schedule_post.php', true);
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





    // panel new activity post creation
    const eventForm = $(panel).find('#events');
    const competitionForm = $(panel).find('#competitions');
    const linkForm = $(panel).find('#links');
    function setActivityForm(index) {
        eventForm.css({ display: index == 0 ? 'block' : 'none' });
        competitionForm.css({ display: index == 1 ? 'block' : 'none' });
        linkForm.css({ display: index == 2 ? 'block' : 'none' });
    }
    $(panel).find('#activity-select').change(function () {
        setActivityForm($(this).val());
    });
    setActivityForm(0);


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