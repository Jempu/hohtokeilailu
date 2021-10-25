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
    const container = $(panel).find('container');

    // all of the different forms
    const scheduleF = $(container).find('#schedule');
    const titleF = $(container).find('#titlecard-title');
    const pricingF = $(container).find('#pricing');
    const activityF = $(container).find('#activities');
    const galleryF = $(container).find('#gallery');

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
    const timeInputs = $(scheduleF).find('input[type=number]');
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
    });
    function saveSchedule() {
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
    }

    // pricing
    // - Hohtokeilaus hae kellonajat "opening.json" (16.00-22.00)
    // - Päiväkeilaus koko päivän 17 asti.
    // - Iltakeilaus alkaa 17 ja kestää niin pitkään kun halli on auki
    // - viikonloppu koko päivän (La & Su)

    fetch('./content/index.json').then(v => v.json()).then(data => {

        // add title text to the input
        $(titleF).find('input#title-main').val(data['titlecard_title']);
        $(titleF).find('input#title-sub').val(data['titlecard_subtitle']);
        // calculate size
        $(titleF).find('.webflow-style-input').each(function (i, l) {
            $(l).find('p').html($(l).find('p').html() - $(l).find('input').val().length);
        });

        // add already existing pricing data to the form.
        const p = data['pricing'];
        function f(id) {
            $(pricingF).find(`#${id} input`).attr('value', p[id]);
        }
        f('hohto');
        f('day');
        f('night');
        f('weekend');
        f('equipment');
        f('snooker');
        f('discount');

        const bs = $(pricingF).find('#birthday_small input');
        $(bs[0]).attr('value', p['birthday_small']['normal']);
        $(bs[1]).attr('value', p['birthday_small']['hohto']);

        const ss = $(pricingF).find('#birthday_big input');
        $(ss[0]).attr('value', p['birthday_big']['normal']);
        $(ss[1]).attr('value', p['birthday_big']['hohto']);
    });

    function saveTitles() {
        post({ titles:{
            title:$(titleF).find('input#title-main').val(),
            subtitle:$(titleF).find('input#title-sub').val()
        }});
    }

    function savePricing() {
        function f(id, index = 0) {
            return Number.parseInt(
                $(pricingF).find(`#${id} input`).eq(index).val());
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
    }

    // activities
    loadActivityItemsFromJson({
        "all": {
            parent: $(activityF).find('activities'),
            control: true,
            useExpiredItems: true
        }
    });

    var newActivityTargetContainerIndex = 0;
    $(activityF).find('#activity-location-select').change(function () {
        newActivityTargetContainerIndex = $(this).val();
    });
    
    // header_image
    const headerPdf = $(activityF).find('.cover-image iframe');
    const headerImg = $(activityF).find('.cover-image img');
    const headerVid = $(activityF).find('.cover-image video');
    const headerInput = $(activityF).find('input#cover-image-file-input');
    function checkHeaderFile(file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            switch (file.name.split('/').pop().split('.').pop()) {
                case 'pdf':
                    $(headerPdf).css({ display: 'block' });
                    $(headerImg).css({ display: 'none' });
                    $(headerVid).css({ display: 'none' });
                    $(headerPdf).attr('src', e.target.result);
                    break;
                case 'png':
                case 'jpg':
                case 'jpeg':
                case 'gif':
                    $(headerPdf).css({ display: 'none' });
                    $(headerImg).css({ display: 'block' });
                    $(headerVid).css({ display: 'none' });
                    $(headerImg).attr('src', e.target.result);
                    $(headerImg).attr('src', e.target.result);
                    break;
                case 'mp4':
                case 'mov':
                    $(headerPdf).css({ display: 'none' });
                    $(headerImg).css({ display: 'none' });
                    $(headerVid).css({ display: 'block' });
                    $(headerVid).attr('src', e.target.result);
                    break;
                default:
                    $(headerPdf).css({ display: 'none' });
                    $(headerImg).css({ display: 'none' });
                    $(headerVid).css({ display: 'none' });
                    break;
            }
        }
        reader.readAsDataURL(file);
    }
    $(headerInput).change(function () {
        checkHeaderFile($(this)[0].files[0]);
    });
    if ($(headerInput)[0].files[0]) checkHeaderFile($(headerInput)[0].files[0]);
    else {
        $(headerPdf).css({ display: 'none' });
        $(headerImg).css({ display: 'none' });
        $(headerVid).css({ display: 'none' });
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
        const title = $(activityF).find('input#title').val();
        function log(str, msg) {
            if (str == '') {
                console.log(msg);
                alert(msg);
                return true;
            }
            return false;
        }
        if (log(title, 'Ilmoituksissa täytyy olla otsikko.')) return;
        const startDate = $(activityF).find('input#start-date').val();
        if (log(startDate, 'Ilmoituksissa täytyy olla alkamispäivä.')) return;
        const endDate = $(activityF).find('input#end-date').val();
        if (log(endDate, 'Ilmoituksissa täytyy olla loppumispäivä.')) return;
        let output = {};
        let attachments = [];
        let random_attachments = [];
        output.type = $(activityF).find('select#activity-location-select').val() == 0 ? 'event' : 'competition';
        output.title = title;
        const sdate = moment(startDate).format('DD.MM.YYYY');
        output.date = `${sdate}-${moment(endDate).format('DD.MM.YYYY')}`;
        const coverImage = $(activityF).find('input#cover-image-file-input')[0].files[0];
        if (coverImage) {
            const rand = Math.random().toString(16).substr(2, 4);
            output.header_image = rand + "-" + coverImage.name;
            attachments.push(coverImage);
            random_attachments.push(rand + "-");
        }
        const processed_title = (`${title.toLowerCase()}-${sdate}`).replaceAll(' ', '-');
        // set content
        output.content = $(activityF).find('textarea#content').val();
        // if not linkForm, add links and additional attachment files to activity.json
        output.files = [];
        output.links = [];
        $(activityF).find('.attachment-container .att-item').each(function (i, l) {
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
        if (output == null) {
            alert('Virhe luodessa ilmoitusta (output == null). Tätä virhettä ei pitäisi tapahtua, joten ilmoita asiasta.');
            return;
        }
        fetch('./content/index.json').then(v => v.json()).then(v => {
            var isSameName = false;
            for (let i = 0; i < v['activities'].length; i++) {
                const e = v['activities'][i];
                if (e != processed_title) continue;
                isSameName = true;
                break;
            }
            if (!isSameName) {
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
                            location.reload();
                        }
                    });
                }
                alert('Loit uuden ilmoituksen onnistuneesti!');
            }
            else alert('Saman niminen ilmoitus on jo olemassa. Vaihda ilmoituksen nimi.');
        });
    }
    $(panel).find('button#save-activity').on('click', function () {
        addNewActivity();
    });

    // add new attachments
    var attachmentsArr = [];
    const attachmentContainer = $(activityF).find('.attachment-container');
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
    $(activityF).find('button#add-attachment').on('click', function () {
        addAttachmentForm();
    });
    
    // gallery
    const galleryContent = $(galleryF).find('.content');
    const galleryInput = $(galleryF).find('#file-input');
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
    $(panel).find('button#save-changes').click(function () {
        saveSchedule();
        saveTitles();
        savePricing();
        alert('Kaikki muutokset tallennettu!');
    });
});