$(function() {
    var nav, links;
    nav = $('.nav');
    if (nav === null) return;
        
    const serviceCategory = $('.category-holder');
    const bowlingCategory = $('.pricing');
    const eventCategory = $('.main-category.events');

    const card = $("body").find('.titlecard');
    const home = $(nav).find('.home');
    
    const linkHolders = $(nav).find('.holder');
    const linkCategories = linkHolders.find(".category");

    function setCategory(n, f) {
        const link = $(nav).find(`.${n}`);
        const div = $(nav).find(`.category.${n}`);
        $(link).on('mouseenter', function () {
            $(div).css({
                display: 'block',
                opacity: '1'
            });
        });
        $(link).on('mouseleave', function () {
            $(div).css({ opacity: '0' });
            setTimeout(() => {
                $(div).css({
                    display: 'none'
                });
            }, 300);
        })
        $(link).find('a').on('click', function () {
            f();
        });
    }

    links = $(nav).find('.links');
    $(nav).find('.home').on('click', function () {
        if (isIndex()) {
            smoothScroll(0);
        } else {
            window.location = './';
        }
    });

    if (serviceCategory != null) {
        setCategory('services', function () {
            smoothScroll(serviceCategory.offsetTop);
        });
    }
    
    if (bowlingCategory != null) {
        setCategory('bowling', function () {
            smoothScroll(bowlingCategory.offsetTop);
        });
    }
    
    if (eventCategory != null) {
        $(links).find('.events').on('click', function () {
            smoothScroll(eventCategory.offsetTop);
        });
    }

    $(nav).find('.social').on('click', function () {
        window.open('https://www.facebook.com/mikkelinkeilahallioy/', target = '#');
    });
    
    $(window).on("scroll", () => {
        if (window.scrollY > card.offsetHeight * .9) {
            $(nav).css({ height: '4rem' });
            $(home).css({ width: '4rem', height: '4rem' });
            $(linkCategories).each(function (i, l) {
                $(l).css({ top: '2.75rem' });
            });
        } else {
            $(nav).css({ height: '7.5rem' });
            $(home).css({ width: '7.5rem', height: '7.5rem' });
            $(linkCategories).each(function (i, l) {
                $(l).css({ top: '5rem' });
            });
        }
    });
});