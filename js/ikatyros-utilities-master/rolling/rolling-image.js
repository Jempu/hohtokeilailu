function createRollingImage(target, path, images) {
    const rollPath = `${path}/`;
    const imgRoll = $(target);
    // create a roll holder that holds all of the rolling images
    const rollHolder = document.createElement('div');
    rollHolder.className = 'rollingImg';
    $(imgRoll).append(rollHolder);
    // add images to the roll holder
    for (let i = 0; i < images.length; i++) {
        const rollItem = document.createElement('div');
        rollItem.className = 'rollingImgItem';
        $(rollHolder).append(rollItem);
        $(rollItem).css("background-image", `url('./${rollPath + images[i]}')` );
        $(rollItem).on('load', function() {
            $(this).get(0).setAttribute('visible', i > 0 ? 'false' : 'true');
        });
    }
    // then add scrolling image change logic
    $(window).on('scroll', function() {
        const scrollTop = $(window).scrollTop();
        const imageTop = $(imgRoll).offset().top;
        const imageHeight = $(imgRoll).height();
        const screenHeight = $(window).height();
        const val = ((imageTop - scrollTop - screenHeight) * -1 / imageHeight) - 0.25;
        if (val > 0 && val < 1) {
            const v = Math.round(val * (images.length - 1));
            $(rollHolder).children().each(function (i, l) {
                $(l).get(0).setAttribute('visible', v == i);
            });
        }
    });
}