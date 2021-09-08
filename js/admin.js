
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



$(function () {
    const panel = $('.admin-panel');
    const anchors = $(panel).find('.anchors');
    const content = $(panel).find('.content');

    // schedule
    $(content).find('#schedule input[type=number]').each(function (i, l) {
        $(l).on('input', function () {
            if (this.value.length >= 2) this.value = this.value.slice(1);
            if (this.value.length === 1) this.value = '0' + this.value;
            if (!this.value) this.value = '00';
        });
    });


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
    const galleryInput = $(gallery).find('#file-input');
    $(galleryInput).change(function () {
        const files = $(galleryInput).prop('files');
        $(files).each(function (i, l) {
            const reader = new FileReader();
            reader.onload = function (e) {
                // create the parent
                const di = document.createElement('div');
                di.className = 'item';
                di.innerHTML = `
                    <img src="./img/close.png" alt="poista kuva">
                `;
                $(gallery).append(di);
                var el = null;
                // check which type the file is
                switch (l['type'].split('/')[0]) {
                    case 'video':
                        el = document.createElement('video');
                        break;
                    case 'image':
                        el = document.createElement('img');
                        break;
                }
                if (el != null) {
                    $(el).attr('src', e.target.result);
                    $(di).append(el);
                }
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