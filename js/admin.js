const html = $('html');
const body = $('body');

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

// called by .php
function galleryAddOldPreviews(data) {
    const parent = $(body).find('#gallery .content');
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
    post({ gallery_remove_media: src.split('/').pop() }, './admin/gallery_post.php');
}

$(function () {
    const panel = body;
    const content = $(panel).find('container');

    // all of the different forms
    const scheduleForm = $(content).find('#schedule');
    const titleForm = $(content).find('#titlecard-title');
    const pricingForm = $(content).find('#pricing');
    const actCreator = $(content).find('#activities');
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
            var weekdays = [];
            for (let i = 0; i < arr.length; i += 4)
                weekdays.push(arr[i].length != 0 ? `${arr[i]}.${arr[i + 1]},${arr[i + 2]}.${arr[i + 3]}` : '');
            post({ days:weekdays });
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
        post({ titles:{
            title:$(titleForm).find('input#title-main').val(),
            subtitle:$(titleForm).find('input#title-sub').val()
        }});
    });

    $(pricingForm).find('button[type="button"]').on('click', function () {
        function f(id, index = 0) {
            return Number.parseInt(
                $(pricingForm).find(`#${id} input`).eq(index).val());
        }
        post({ pricing:{
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
        }});
    });

    loadActivityItemsFromJson({
        "all": {
            parent: $(panel).find('.content .activities .activity-view'),
            control: true
        }
    });

    const defaultSection = $(actCreator).find('#default');
    const linkActivityForm = $(actCreator).find('#links');
    var currentActivityIndex = -1;
    var currentSectionType = null;
    function setActivityForm(index) {
        defaultSection.attr('active', index < 2 ? 'true' : 'false');
        linkActivityForm.attr('active', index == 2 ? 'true' : 'false');
        currentActivityIndex = index;
        currentSectionType = index < 2 ? defaultSection : linkActivityForm;
    }
    $(actCreator).find('#act-select').change(function () {
        setActivityForm($(this).val());
    });
    setActivityForm(0);
    
    // set input's header_image preview
    const coverImgInput = $(actCreator).find('input#cover-image-file-input');
    $(coverImgInput).change(function () {
        const reader = new FileReader();
        reader.onload = function (e) {
            $(actCreator).find('.cover-image img').attr('src', e.target.result);
        }
        reader.readAsDataURL($(this)[0].files[0]);
    });
    // if header_image file input already set
    if ($(coverImgInput)[0].files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            $(actCreator).find('.cover-image img').attr('src', e.target.result);
        }
        reader.readAsDataURL($(coverImgInput)[0].files[0]);
    }
    
    // attachments
    // set correct input for attachment file
    var attachmentSection = null;
    function setAttachmentForm(e, v) {
        const categorySubItem0 = $(e).find('.category-sub-item#0');
        const categorySubItem1 = $(e).find('.category-sub-item#1');
        $(categorySubItem0).css({ display: v == 0 ? 'block' : 'none' });
        $(categorySubItem1).css({ display: v == 1 ? 'block' : 'none' });
        attachmentSection = v == 0 ? categorySubItem0 : categorySubItem1;
    }
    setAttachmentForm(0);

    // create a new activity to the database
    function addNewActivity() {
        const title = $(actCreator).find('input#title').val();
        function log(str, msg) {
            if (str == '') {
                console.log(msg);
                alert(msg);
                return true;
            }
            return false;
        }
        if (log(title, 'Ilmoituksissa täytyy olla otsikko.')) return;
        const startDate = $(actCreator).find('input#start-date').val();
        if (log(startDate, 'Ilmoituksissa täytyy olla alkamispäivä.')) return;
        const endDate = $(actCreator).find('input#end-date').val();
        if (log(endDate, 'Ilmoituksissa täytyy olla loppumispäivä.')) return;
        let output = {};
        let attachments = [];
        let random_attachments = [];
        output.type = currentActivityIndex == 0 ? "event" : currentActivityIndex == 1 ? "competition" : "link";
        output.title = title;
        const sdate = moment(startDate).format('DD.MM.YYYY');
        output.date = `${sdate}-${moment(endDate).format('DD.MM.YYYY')}`;
        const coverImage = $(actCreator).find('input#cover-image-file-input')[0].files[0];
        if (coverImage) {
            const rand = Math.random().toString(16).substr(2, 4);
            output.header_image = rand + "-" + coverImage.name;
            attachments.push(coverImage);
            random_attachments.push(rand + "-");
        }
        const processed_title = (`${title.toLowerCase()}-${sdate}`).replaceAll(' ', '-');
        if (currentSectionType == defaultSection) {
            output.content = $(defaultSection).find('textarea#content').val();
            // if not linkForm, add links and additional attachment files to activity.json
            output.files = [];
            output.links = [];
            defaultSection.find('.attachment-container .att-item').each(function (i, l) {
                // check the attachment's type from select
                switch ($(l).find('select').val()) {
                    case '0':
                        var wlink = $(l).find('input#link').val();
                        // if given link doesn't have http in-front
                        if (!wlink.includes('http://') && !wlink.includes('https://')) {
                            wlink = 'http://' + wlink;
                        }
                        output.links.push({
                            text: $(l).find('input#title').val(),
                            link: wlink
                        });
                        break;
                    case '1':
                        const inp = $(l).find('input[type=file]')[0];
                        const file = inp.files.length ? inp.files[0] : "";
                        // add 4 letters long random string in-front of name
                        const rand = Math.random().toString(16).substr(2, 4);
                        if (file != '') {
                            output.files.push(rand + "-" + file.name);
                            attachments.push(file);
                            random_attachments.push(rand + "-");
                        }
                        break;
                }
            });
        } else {
            output.link = "https://www.ikatyros.com";
        }
        console.log(processed_title, attachments, output);
        // if (attachments.length > 0) output.attachments = attachments;
        if (output == null) return;
        fetch('./content/index.json').then(v => v.json()).then(v => {
            var isSameName = false;
            for (let i = 0; i < v['activities'].length; i++) {
                const e = v['activities'][i];
                if (e != processed_title) continue;
                isSameName = true;
                break;
            }
            if (!isSameName) {
                // activity.json post request
                post({
                    add_activity:output,
                    title:processed_title
                });
                // additional file upload post request
                if (attachments.length > 0) {
                    var attachment_form = new FormData();
                    attachment_form.append('activity_folder', processed_title);
                    for (let i = 0; i < attachments.length; i++) {
                        attachment_form.append(`file_${i}`, attachments[i]);
                        attachment_form.append(`randomized_${i}`, random_attachments[i]);
                    }
                    $.ajax({
                        url: './admin/admin_post.php',
                        dataType: 'text',
                        cache: false,
                        contentType: false,
                        processData: false,
                        data: attachment_form,
                        type: 'POST',
                        success: function(php) {
                            // location.reload();
                        }
                    });
                }
            }
            else alert('Saman niminen ilmoitus on jo olemassa. Vaihda ilmoituksen nimi.');
        });
    }
    $(actCreator).find('button[type="button"]#submit').on('click', function () {
        addNewActivity();
    });

    // add new attachments
    var attachmentsArr = [];
    const attachmentContainer = $(defaultSection).find('.attachment-container');
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
                <p>Tukee .pdf, .png, .jpg, .jpeg, .gif, .mp4 ja .mov -muotoja.</p>
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
    $(actCreator).find('button#add-attachment').on('click', function () {
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

    // when a change has been made, pressing the global
    // save button saves all of the form's changes
    function saveAllChanges() {
        alert('Kaikki muutokset tallennettu!');
    }
});