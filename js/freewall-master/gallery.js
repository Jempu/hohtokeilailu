function setGallery(data, imageLimit = 20) {
    const cellWidth = 320;
    const buttonMargin = 15;

    const gallery = $('.toggle-gallery');
    const content = $(gallery).find('.content');
    const freewall = $(gallery).find('#freewall');
    const overlay = $(gallery).find('.overlay');

    var html = '';
    var i = 0;
    const temp = "<div class='brick' style='width:{width}px;'><img src='{img}' width='100%'></div>";
    while (i < (imageLimit < data.length ? imageLimit : data.length)) {
        const w = 1 + 3 * Math.random() << 0;
        html += temp.replace(/\{width\}/g, w * cellWidth).replace("{img}", data[i]);
        i++;
    }

    $(freewall).html(html);
    const wall = new Freewall("#freewall");

    var open = false;
    function setHeight(val) {
        open = val;
        $(content).get(0).setAttribute('open', val);
        const buttonHeight = val ? 80 : 60;
        const freewallHeight = $(freewall).height() + buttonHeight + buttonMargin;
        document.documentElement.style.setProperty('--gallery-freewall-height', `${freewallHeight}px`);
        document.documentElement.style.setProperty('--gallery-button-height', `${buttonHeight}px`);
    }

    function setOverlay(src = null) {
        if (src != null) {
            $('html').css({ overflowY: 'clip' });
            $(gallery).get(0).setAttribute('open', 'true');
            $(overlay).find('.item img').get(0).setAttribute('src', src);
        } else {
            $('html').css({ overflowY: 'auto' });
            $(gallery).get(0).setAttribute('open', 'false');
            // setTimeout(() => {
            //     $(gallery).css({ height: 'auto' });
            // }, 1200);
        }
    }

    wall.reset({
        selector: '.brick',
        animate: true,
        cellW: cellWidth,
        cellH: 'auto',
        onResize: function () {
            wall.fitWidth();
            setHeight(true);
        },
        onComplete: function () {
            $(freewall).children().each(function (i, l) {
                $(l).on('click', function () {
                    const img = $(l).find('img');
                    setOverlay($(img).attr('src'));
                });
            });
            setHeight(false);
        }
    });

    const images = wall.container.find('.brick');
    images.find('img').load(function () {
        wall.fitWidth();
    });

    $(content).find('.button').on('click', function () {
        setHeight(!open);
    });

    $(overlay).find('.close').on('click', function () {
        setOverlay();
    });
}