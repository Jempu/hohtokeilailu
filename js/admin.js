
const html = $('html');

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


// limit inputs to a certain range of characters
// and limit the amount of characters
function check(e, value) {
    //Check Charater
    // var unicode = e.charCode ? e.charCode : e.keyCode;
    // if (value.indexOf(".") != -1) if (unicode == 46) return false;
    // if (unicode != 8) if ((unicode < 48 || unicode > 57) && unicode != 46) return false;
    return true;
}
function checkLength(l, e) {
    var fieldLength = e.value.length;
    if (fieldLength <= l) {
        return true;
    }
    else {
        var str = e.value;
        str = str.substring(0, str.length - 1);
        e.value = str;
    }
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
    const parent = $('.admin-panel').find('#gallery .content');
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
    const overlayContainer = $('.overlay-container');

    //limit inputs to their character limits
    $('.webflow-style-input').each(function (i, l) {
        const p = $(l).find('p');
        const v = $(p).html() ?? null;
        if (v !== null) {
            checkLength(v, $(l).find('input').get(0));
            const input = $(l).find('input');
            $(input).on('input', function () {
                $(p).html(v - $(input).val().length)
            });
        }
    });

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
                if (Number.parseInt(a.value) != 0) {
                    arr.push(a.value);
                    if (i % 2 == 0) {
                        arr.push(Number.parseInt(b.value) != 0 ? b.value : '00');
                        i++;
                    }
                } else arr.push('');
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

    fetch('./content/index.json').then(v => v.json()).then(data => {
        
        // add title text to the input
        $(panel).find('#titlecard-title input#title-main').val(data['titlecard_title']);
        $(panel).find('#titlecard-title input#title-sub').val(data['titlecard_subtitle']);

        // add already existing pricing data to the form.
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
    const activityView = $(panel).find('.content .activities .activity-view')

    // load already existing activities
    function setOverlayContainer(item) {
        if (item != "") {
            overlayContainer.css({ display: 'block', transform: 'translateX(-50%) scale(100%)' });
            html.css({ overflowX: 'clip', overflowY: 'clip' });
            overlayContainer.children().each(function(i, l) {
                $(l).css({ display: l.id == item ? 'block' : 'none' });
            });
            overlayContainer.animate({ now: 108 }, {
                duration: '400',
                step: function (now, fx) {
                    $(this).css('transform', `translateX(-50%) scale(${now}%)`);
                }
            });
        } else {
            overlayContainer.animate({ now: 0 }, {
                duration: '400',
                step: function (now, fx) {
                    $(this).css('transform', `translateX(-50%) scale(${now}%)`);
                },
                complete: function () {
                    overlayContainer.css({ display: 'none' });
                    html.css({ overflowX: 'clip', overflowY: 'scroll' });
                }
            });
        }
    }
    setOverlayContainer("");
    const directory = './content/activities/';
    function createActivityViewItem(item, title, date, content, headerImg, dateStatus) {
        // container item
        const e = document.createElement('div');
        e.className = 'item';
        e.id = item;
        e.innerHTML = `
            <div class="content">
                ${headerImg}
                <div class="bo" id="a"></div>
                <h2>${title}</h2>
                <h3>${date}</h3>
                <div class="bo" id="b"></div>
            </div>
            <div class="control">
                <h1>Tapahtuma ${dateStatus}</h1>
                <h2 onclick="deleteActivityItem(${item});">Poista Ilmoitus<h2>
            </div>
        `;
        $(activityView).append(e);
        // On container item click open overlay window
        $(e).find('.content').on('click', function () {
            setOverlayContainer(item);
        });
        $(e).find('.control h2').on('click', function () {
            deleteActivityItem(e, item);
        });
        // overlay item
        const o = document.createElement('div');
        o.className = 'item';
        o.id = item;
        o.innerHTML = `
            <div class="item">
                <div class="content">
                    <div class="left">
                        <div class="header-img"></div>
                        <h1>${title}</h1>
                        <h2>${date}</h2>
                        <p>${content}</p>
                        <a href="http://tulokset.keilailu.fi/printpdfindex.php?reportid=10&id=77942&id2=22" target="#">Tulokset</a>
                        <a href="https://www.varaavuoro.com/mikkeli/competitions" target="#">Vuoron varaus</a>
                    </div>
                    <div class="right">
                        <div class="media">
                            <iframe src="https://www.hohtokeilailu.fi/wp-content/uploads/2021/06/kesakaadot.pdf" frameborder="0"></iframe>
                            <iframe src="https://www.hohtokeilailu.fi/wp-content/uploads/2021/06/vph-kuljetus-kesa-kaadot.pdf" frameborder="0"></iframe>
                        </div>
                    </div>
                    <div class="close">
                        <img src="./img/close.png" alt="Sulje näkymä">
                    </div>
                </div>
            </div>
        `;
        overlayContainer.append(o);
        // On overlay item click close overlay window
        $(o).find('.close').on('click', function () {
            setOverlayContainer("");
        });
    }
    function deleteActivityItem(e, id) {
        console.log(e, id);
    }
    function createFooterEventItem(item, img, title, date) {
        let e = document.createElement('div');
        e.className = 'item';
        e.innerHTML = `
            <div>
                ${img}
                <h1>${title}</h1>
                <h2>${date}</h2>
            </div>
            <div>
                päivämäärä-status
                poista-ilmoitus
            </div>
        `;
        $(e).on('click', function () {
            setOverlayContainer(item);
        });
    }
    fetch('./content/index.json').then(v => v.json()).then(data => {
        data['activities'].forEach(item => {
            const folder = `${directory}${item}/`;
            fetch(`${folder}/activity.json`).then(v => v.json()).then(child => {
                // date
                const vdate = getDisplayableDate(child['date'], true, 3);
                const vdateStart = getDisplayableDate(child['date'], false, 1, false);
                const vdateEnd = getDisplayableDate(child['date'], false, 2, false);

                // title
                const vtitle = child['title'];
                const vimg = child['header-image'] != ''
                    ? `<img src="${folder}${child['header-image']}" alt="Tapahtumakuva">`
                    : '';

                let vfiles = child['files'];
                let vlink = child['links'];

                const vcontent = child['content'] != '' ? child['content'] : 'Tapahtumalla ei ole kuvausta.';

                const dateStatus = getDateStatus(vdateStart, vdateEnd, 'abc', 'fi');
                
                // create the default activity item, on click open overlay
                // create the link activity item, on click open url
                
                switch (child['type']) {
                    case 'event':
                    case 'link':
                        switch (dateStatus) {
                            case 0:
                            case 1:
                                createFooterEventItem(item, vimg, vtitle, vdate);
                                break;
                        }
                        break;
                    case 'competition':
                        createActivityViewItem(item, vtitle, vdate, vcontent, vimg, dateStatus);
                        break;
                }
            });
        });
    });

    const defaultForm = $(activityForm).find('#default');
    const linkForm = $(activityForm).find('#links');
    var currentActivityIndex = -1;
    var currentActivityForm = null;
    function setActivityForm(index) {
        defaultForm.attr('active', index < 2 ? 'true' : 'false');
        linkForm.attr('active', index == 2 ? 'true' : 'false');
        currentActivityIndex = index;
        currentActivityForm = index < 2 ? defaultForm : linkForm;
    }
    $(panel).find('#activity-select').change(function () {
        setActivityForm($(this).val());
    });
    setActivityForm(0);

    // set input's header_image preview
    $(currentActivityForm).find('input#cover-image-file-input').change(function () {
        const reader = new FileReader();
        reader.onload = function (e) {
            $(currentActivityForm).find('.cover-image img').attr('src', e.target.result);
        }
        reader.readAsDataURL($(this)[0].files[0]);
    });
    // set correct input for attachment file
    function setAttachmentType(index) {
        $(currentActivityForm).find('.sub-item#0').css({ display: index == 0 ? 'block' : 'none' });
        $(currentActivityForm).find('.sub-item#1').css({ display: index == 1 ? 'block' : 'none' });
    }
    $(currentActivityForm).find('select#attachment-type').change(function () {
        setAttachmentType($(this).val());
    });
    setAttachmentType(0);
    // create a new activity to the database
    function postNewActivity() {
        const title = $(currentActivityForm).find('input#title').val();
        if (title == '') {
            alert('Ilmoituksissa täytyy olla otsikko.');
            return;
        }
        const startDate = $(currentActivityForm).find('input#start-date').val();
        if (startDate == '') {
            alert('Ilmoituksissa täytyy olla alkamispäivä.');
            return;
        }
        const endDate = $(currentActivityForm).find('input#end-date').val();
        if (startDate == '') {
            alert('Ilmoituksissa täytyy olla loppumispäivä.');
            return;
        }
        let output = {};
        output.type = currentActivityIndex == 0 ? "event" : currentActivityIndex == 1 ? "competition" : "link";
        output.title = title;
        output.date = `${moment(startDate).format('DD.MM.YYYY')}-${moment(endDate).format('DD.MM.YYYY')}`;
        const file = $(currentActivityForm).find('input#cover-image-file-input')[0].files[0];
        if (file) output.header_image = file.name;
        const processed_title = `${title.toLowerCase()}-20`;
        if (currentActivityForm != linkForm) {
            output.content = $(currentActivityForm).find('input#content').val();
            output.files = [
                {
                    text: "Kilpailuilmoitus",
                    link: "https://www.hohtokeilailu.fi/wp-content/uploads/2021/06/kesakaadot.pdf"
                },
                {
                    text: "Olosuhde",
                    link: "https://www.hohtokeilailu.fi/wp-content/uploads/2021/06/vph-kuljetus-kesa-kaadot.pdf"
                }
            ];
        } else {
            output.link = "https://www.ikatyros.com";
        }
        console.log(processed_title, output);
        return;
        // check if a folder with the same title exists
        if (output != null) {
            fetch(`./content/${processed_title}/activity.json`).then(
                v => {
                    // if not, then post the new activity
                    if (v.status == 404) {
                        const xhr = new XMLHttpRequest();
                        xhr.open("POST", './admin/admin_post.php', true);
                        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
                        xhr.send(JSON.stringify({ activity: output, title: processed_title }));
                    } else alert('Saman niminen ilmoitus on jo olemassa. Vaihda ilmoituksen nimi.');
                }
            );
        }
    }
    $(activityForm).find('button[type="button"]#submit').on('click', function () {
        postNewActivity();
    });


    // gallery
    const gallery = $(panel).find('#gallery');
    const galleryContent = $(gallery).find('.content');
    const galleryInput = $(gallery).find('#file-input');
    $(galleryInput).change(function () {
        const files = $(galleryInput).prop('files');
        $(files).each(function (i, l) {
            const reader = new FileReader();
            reader.onload = function (e) {
                addPreviewToGallery(l['type'].split('/')[0], e.target.result, galleryContent);
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