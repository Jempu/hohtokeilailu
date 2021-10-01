const html = $('html');

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

    // all of the different forms
    const scheduleForm = $(content).find('#schedule');
    const titleForm = $(content).find('#titlecard-title');
    const pricingForm = $(content).find('#pricing');
    const activityForm = $(content).find('#activities');
    const galleryForm = $(content).find('#gallery');

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
    // - Hohtokeilaus hae kellonajat "opening.json" (16.00-22.00)
    // - Päiväkeilaus koko päivän 17 asti.
    // - Iltakeilaus alkaa 17 ja kestää niin pitkään kun halli on auki
    // - viikonloppu koko päivän (La & Su)

    fetch('./content/index.json').then(v => v.json()).then(data => {

        // add title text to the input
        $(titleForm).find('input#title-main').val(data['titlecard_title']);
        $(titleForm).find('input#title-sub').val(data['titlecard_subtitle']);

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

    // save new titlecard's titles
    $(titleForm).find('button[type="button"]').on('click', function () {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", './admin/admin_post.php', true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
        xhr.send(JSON.stringify({
            titles: {
                title: $(titleForm).find('input#title-main').val(),
                subtitle: $(titleForm).find('input#title-sub').val()
            }
        }));
    });

    $(pricingForm).find('button[type="button"]').on('click', function () {
        function f(id, index = 0) {
            return Number.parseInt(
                $(pricingForm).find(`#${id} input`).eq(index).val());
        }
        const xhr = new XMLHttpRequest();
        xhr.open("POST", './admin/admin_post.php', true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
        xhr.send(JSON.stringify({
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
        }));
    });

    // activity
    const activityView = $(panel).find('.content .activities .activity-view')
    // load already existing activities
    function setOverlayContainer(item) {
        if (item != "") {
            overlayContainer.css({ display: 'block', transform: 'translateX(-50%) scale(100%)' });
            overlayContainer.children().each(function (i, l) {
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
                }
            });
        }
    }
    setOverlayContainer("");
    const directory = './content/activities/';
    function createActivityItem(folder, item, title, date,
        content, headerImg, dateStatus, type, files, links) {
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
                <h1>${type}</h1>
                <h1>Tapahtuma ${dateStatus}</h1>
                <h2 id="delete">Poista Ilmoitus<h2>
            </div>
        `;
        $(activityView).append(e);
        // On container item click open overlay window
        $(e).find('.content').on('click', function () {
            switch (type) {
                case 'Linkki-ilmoitus':
                    window.open('');
                    break;
                default:
                    setOverlayContainer(item);
                    break;
            }
        });
        $(e).find('.control h2#delete').on('click', function () {
            deleteActivityItem(e, item);
        });
        // overlay item
        const o = document.createElement('div');
        o.className = 'item';
        o.id = item;
        // links
        function getAnchors(links) {
            if (links === undefined) return '';
            var output = '';
            links.forEach(e => {
                output += `<a href="${e['link']}" target="#">${e['text']}</a>`;
            });
            return output;
        }
        function getFiles(v) {
            if (v === undefined || v.length == 0) return '';
            var output = '';
            v.forEach(e => {
                switch (e['link'].split('.').pop()) {
                    case 'pdf':
                        output += `<iframe src="${folder}${e['link']}" frameborder="0"></iframe>`;
                        break;
                    case 'png':
                    case 'jpg':
                    case 'jpeg':
                    case 'gif':
                        output += `<img src="${folder}${e['text']}" />`
                        break;
                    case 'mp4':
                    case 'mov':
                        output += `<video src="${folder}${e['text']} controls"></video>`
                        break;
                }
            });
            return output != '' ? `
                <div class="right">
                    <div class="media">
                        ${output}
                    </div>
                </div>
            ` : '';
        }
        o.innerHTML = `
            <div class="item">
                <div class="content">
                    <div class="left">
                        <div class="header-img"></div>
                        <h1>${title}</h1>
                        <h2>${date}</h2>
                        <p>${content}</p>
                        ${getAnchors(links)}
                    </div>
                    ${getFiles(files)}
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
                    ? `<img src="${folder}${child['header-image']}" alt="Ei Kansikuvaa" />`
                    : '<img alt="Ei Kansikuvaa" />';

                let vfiles = child['files'];
                let vlink = child['links'];

                const vcontent = child['content'] != '' ? child['content'] : 'Tapahtumalla ei ole kuvausta.';

                const dateStatus = getDateStatus(vdateStart, vdateEnd, 'abc', 'fi');

                // create the default activity item, on click open overlay
                // create the link activity item, on click open url
                function getType(v) {
                    switch (v) {
                        case 'event': return 'Tapahtumailmoitus';
                        case 'competition': return 'Kilpailuilmoitus';
                        case 'link': return 'Linkki-ilmoitus';
                    }
                }
                createActivityItem(folder, item, vtitle, vdate, vcontent, vimg, dateStatus,
                    getType(child['type']), vfiles, vlink);
            });
        });
    });
    const defaultActivityForm = $(activityForm).find('#default');
    const linkActivityForm = $(activityForm).find('#links');
    var currentActivityIndex = -1;
    var currentActivityForm = null;
    function setActivityForm(index) {
        defaultActivityForm.attr('active', index < 2 ? 'true' : 'false');
        linkActivityForm.attr('active', index == 2 ? 'true' : 'false');
        currentActivityIndex = index;
        currentActivityForm = index < 2 ? defaultActivityForm : linkActivityForm;
    }
    $(panel).find('#activity-select').change(function () {
        setActivityForm($(this).val());
    });
    setActivityForm(0);
    
    // set input's header_image preview
    $(activityForm).find('input#cover-image-file-input').change(function () {
        const reader = new FileReader();
        reader.onload = function (e) {
            $(activityForm).find('.cover-image img').attr('src', e.target.result);
        }
        reader.readAsDataURL($(this)[0].files[0]);
    });
    
    // attachments
    // set correct input for attachment file
    var categorySubItem = null;
    function setAttachmentForm(e, v) {
        const categorySubItem0 = $(e).find('.category-sub-item#0');
        const categorySubItem1 = $(e).find('.category-sub-item#1');
        $(categorySubItem0).css({ display: v == 0 ? 'block' : 'none' });
        $(categorySubItem1).css({ display: v == 1 ? 'block' : 'none' });
        categorySubItem = v == 0 ? categorySubItem0 : categorySubItem1;
    }
    setAttachmentForm(0);

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
        let attachments = [];
        output.type = currentActivityIndex == 0 ? "event" : currentActivityIndex == 1 ? "competition" : "link";
        output.title = title;
        const sdate = moment(startDate).format('DD.MM.YYYY');
        output.date = `${sdate}-${moment(endDate).format('DD.MM.YYYY')}`;
        const coverImage = $(currentActivityForm).find('input#cover-image-file-input')[0].files[0];
        if (coverImage) {
            output.header_image = coverImage.name;
            attachments.push(coverImage);
        }
        const processed_title = (`${title.toLowerCase()}-${sdate}`).replace(' ', '-');
        if (currentActivityForm != linkActivityForm) {
            output.content = $(currentActivityForm).find('input#content').val();
            // additional attachment files if not linkForm
            output.files = [];
            function getC(item) {
                return {
                    text: $(item).find('input#title').val(),
                    link: $(item).find('input#link').val()
                };
            }
            categorySubItem.find('.attachment-container').each(function (i, l) {
                output.files.push(getC(l));
            });
        } else {
            output.link = "https://www.ikatyros.com";
        }
        console.log(processed_title, attachments, output);
        if (output != null) return;
        fetch('./content/index.json').then(v => v.json()).then(v => {
            var isSameName = false;
            for (let i = 0; i < v['activities'].length; i++) {
                const e = v['activities'][i];
                if (e != processed_title) continue;
                isSameName = true;
                break;
            }
            if (!isSameName) {
                // const xhr = new XMLHttpRequest();
                // xhr.open("POST", './admin/admin_post.php', true);
                // xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
                // xhr.send(JSON.stringify({
                //     add_activity: output,
                //     title: processed_title
                // }));
            } else alert('Saman niminen ilmoitus on jo olemassa. Vaihda ilmoituksen nimi.');
        });
    }
    $(activityForm).find('button[type="button"]#submit').on('click', function () {
        postNewActivity();
    });

    // add new attachments
    var attachmentsArr = [];
    const attachmentContainer = $(defaultActivityForm).find('.attachment-container');
    function getAttachmentItemHtml() {
        return `
            <div class="top">
                <h1 id="index">${attachmentsArr.length}.</h1>
                <select id="attachment-type">
                    <option value="0">Linkki</option>
                    <option value="1">Tiedosto</option>
                </select>
                <div class="close">
                    <img src="./img/close.png" alt="Sulje näkymä">
                </div>
            </div>
            <div class="category-sub-item" id="0">
                <div class="webflow-style-input">
                    <input type="text" placeholder="Liitteen otsikko..." id="title" onKeyPress="return check(event,value)" onInput="checkLength(30,this)">
                    <p>30</p>
                </div>
                <div class="webflow-style-input">
                    <input type="text" placeholder="Liitteen linkki..." id="link">
                </div>
            </div>
            <div class="category-sub-item" id="1">
                <div class="pdf-container">
                    <div class="item">
                        <iframe src="./content/uploads/sivusto-manuaali.pdf" type="application/pdf" frameborder="0"></iframe>
                        <div class="close">
                            <img src="./img/close.png" alt="Poista ilmoitus">
                        </div>
                    </div>
                </div>
                <input type="file" name="Lisää tiedosto" id="files">
                <p>Tukee .pdf, .png, .jpg, .jpeg, .gif, .mp4 ja .mov -tiedostoja.</p>
            </div>
        `;
    }
    function removeAttachmentForm(e) {
        attachmentsArr.splice(attachmentsArr.indexOf(e), 1);
        $(e).remove();
        // update attachments' indexes
        if (attachmentsArr !== undefined || attachmentsArr.length > 0) {
            for (let i = 0; i < attachmentsArr.length; i++) {
                const e = attachmentsArr[i];
                $(e).find('.top h1').html(`${i + 1}.`);
            }
        }
    }
    function addAttachmentForm() {
        const o = document.createElement('div');
        attachmentsArr.push(o);
        o.className = 'att-item';
        o.innerHTML = getAttachmentItemHtml();
        $(o).find('.top select#attachment-type').change(function () {
            setAttachmentForm($(o), $(this).val());
        });
        $(o).find('.top .close').on('click', function () {
            removeAttachmentForm(o);
        });
        setAttachmentForm($(o), 0);
        $(attachmentContainer).append(o);
    }
    $(activityForm).find('button#add-attachment').on('click', function () {
        addAttachmentForm();
    });
    
    // gallery
    const galleryContent = $(galleryForm).find('.content');
    const galleryInput = $(galleryForm).find('#file-input');
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