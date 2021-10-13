const html = $('html');
const body = $('body');
const overlayContainer = $('.overlay-container');

const titlecard = $('.titlecard');
const aboutContainer = $('.about-container');
const schedule = $(aboutContainer).find('#schedule');

const indexJsonPath = './content/index.json';
const galleryPath = './content/gallery/';
const galleryImageLimit = 20;

/// Titlecard Carousel & Slides ///
$(function () {
    const monitor = $(".monitor");
    const monitorContainer = $(monitor).find(".container");
    var carousel = $("#cloud9-carousel");
    var carouselChildren = $(carousel).children();
    var carouselChildCount = 0;
    const slider = $(".slider");
    const sliderUl = $(slider).find("ul");
    var sliderSlides = $(sliderUl).children();

    function selectBarrelCategory(index) {
        barrel.setCategory(index);
        smoothScroll($('.barrel').get(0).offsetTop);
    }

    carouselChildren.each(function (i, l) {
        $(l).on('click', function () {
            selectBarrelCategory(carouselChildCount - (i + 1));
        });
    });

    sliderSlides.each(function (i, l) {
        $(l).find('.button').on('click', function () {
            selectBarrelCategory(i);
        });
    });

    var slideCount = sliderSlides.length;
    var slideWidth = $('.slider ul li').width();
    var slideHeight = $('.slider ul li').height();
    var slideUlWidth = slideCount * slideWidth;
    var currentSlide = -1;
    var isTransitioning = false;
    var slideVimeoPlayers = [];
    monitorContainer.find('.vimeo-player').each(function (i, l) {
        slideVimeoPlayers.push(new Vimeo.Player($(l)[0]));
    });

    function setCarousel(index, doClone = false) {
        
        // make resizing dynamic
        // if (doClone) {
        //     $(carousel).data('carousel').deactivate();
        //     var clone = $(carousel).clone();
        //     $(carousel).remove();
        //     carousel = clone;
        //     $(monitorContainer).find('.categories').append(clone);
        // }

        carouselChildren = $(carousel).children().get().reverse();
        carouselChildCount = $(carouselChildren).length;

        const ww = (2560 - $(window).width()) / 2560 * 50 + 50;
        console.log(ww);

        $(carousel).Cloud9Carousel({
            // yRadius: ww,
            bringToFront: false,
            frontItemClass: "front",
            onLoaded: function() {
                $(carousel).data("carousel").goTo(carouselChildCount - index);
            }
        });
    }

    function setSlider() {
        sliderSlides = $(sliderUl).find("li");
        slideCount = sliderSlides.length;
        slideWidth = $(sliderSlides).width();
        slideHeight = $(sliderSlides).height();
        slideUlWidth = slideCount * slideWidth;
        // $(slider).css({ "max-width": slideWidth });
        $(sliderUl).css({ "width": slideUlWidth, "margin-left": - slideWidth });
        $(sliderUl).find("li:last-child").prependTo($(sliderUl));
    }

    function setSlideVariable(index) {
        monitorContainer.children().each(function (i, l) {
            $(l).attr('slide', `${l.getAttribute('x') == index}`);
        });
        // auto-play the video in slide
        for (let i = 0; i < slideVimeoPlayers.length; i++) {
            const p = slideVimeoPlayers[i];
            if (i == index) p.play(); else p.pause();
        }
    }

    function rotateCarousel(right) {
        if (isTransitioning) return;
        isTransitioning = true;
        if (right) {
            if (currentSlide < slideCount - 1) currentSlide++;
            else currentSlide = 0;

            $(carousel).data("carousel").go(1);

            $(sliderUl).stop().animate({
                left: - slideWidth
            }, 800, function () {
                $(sliderUl).find("li:first-child").appendTo($(sliderUl));
                $(sliderUl).css("left", "");
                isTransitioning = false;
                setSlideVariable($(sliderUl).children().get(1).getAttribute('x'));
            });
        } else {
            if (currentSlide > 0) currentSlide--;
            else currentSlide = slideCount - 1;

            $(carousel).data("carousel").go(-1);

            $(sliderUl).stop().animate({
                left: + slideWidth
            }, 800, function () {
                $(sliderUl).find("li:last-child").prependTo($(sliderUl));
                $(sliderUl).css("left", "");
                isTransitioning = false;
                setSlideVariable($(sliderUl).children().get(1).getAttribute('x'));
            });
        }
    }

    function setRandomCategory() {
        currentSlide = getRandomIndex(slideCount);
        setSlideVariable(currentSlide);
        setCarousel(currentSlide + 1);
        let i = 0;
        function f() {
            if (i < currentSlide) {
                // category slider
                $(sliderUl).stop().animate({
                    left: - slideWidth
                }, 20, function () {
                    $(sliderUl).find("li:first-child").appendTo($(sliderUl));
                    $(sliderUl).css("left", "");
                    isTransitioning = false;
                });
                // 
                i++;
                if (i < currentSlide) {
                    setTimeout(() => {
                        f();
                    }, 100);
                }
            }
        }
        if (i < currentSlide) f();
    }

    $(window).on('resize', function () {
        setTimeout(() => {
            sliderSlides = $(sliderUl).find("li");
            slideCount = sliderSlides.length;
            slideWidth = $(sliderSlides).width();
            slideHeight = $(sliderSlides).height();
            slideUlWidth = slideCount * slideWidth;
            $(sliderUl).css({ "width": slideUlWidth, "margin-left": - slideWidth });
            setCarousel(currentSlide + 1, true);
        }, 50);
    });

    // Parallax scroll effect for container items
    function setMonitorScollParallax() {
        var scrollTop = $(window).scrollTop();
        if (scrollTop < $(monitorContainer).height()) {
            $(monitor).find(".titlecard-title").css({ transform: `translate(-50%, ${scrollTop / -20}%)` });
            $(monitorContainer).children().each(function (i, l) {
                $(l).css({ transform: `translateX(${ikaResponsive.aInternal ? -10 : 0}%, ${scrollTop / -110}%)` });
            });
        }
    }
    $(window).on('scroll', function () {
        if (window.outerWidth > 799) setMonitorScollParallax();
    });
    setMonitorScollParallax();

    $(monitorContainer).children().each(function (i, l) {
        l.setAttribute('x', i);
    });

    $(sliderUl).children().each(function (i, l) {
        l.setAttribute('x', i);
    });

    setTimeout(() => {
        setSlider();
        setRandomCategory();
        setTimeout(() => {
            $(".prev").on("click", function () { rotateCarousel(false); });
            $(".next").on("click", function () { rotateCarousel(true); });

            setTimeout(() => {
                // auto-play the video in slide
                for (let i = 0; i < slideVimeoPlayers.length; i++) {
                    const p = slideVimeoPlayers[i];
                    if (i == currentSlide) p.play(); else p.pause();
                }
            }, 1200);
        }, 200);
    }, 100);
});


/// Opening Hours ///
createSchedule(
    $(schedule).find('.days .mobile'),
    $(schedule).find('ul'),
    $(schedule).find('#title').find('h1').get(0)
);

function setPricingCardTimes() {
    fetch ('./content/opening.json').then(v => v.json()).then(week => {
        let normiWeekStartIndex = -1,
            normiWeekEndIndex = -1,
            hohtoKeilausWeekStartIndex = -1,
            hohtoKeilausWeekEndDay = -1;
        function getDayName(day) {
            switch (day) {
                case 0:
                case 1:
                    return 'Ma';
                case 2:
                case 3:
                    return 'Ti';
                case 4:
                case 5:
                    return 'Ke';
                case 6:
                case 7:
                    return 'To';
                case 8:
                case 9:
                    return 'Pe';
                case 10:
                case 11:
                    return 'La';
                case 12:
                case 13:
                    return 'Su';
            }
        }
        var found_normiWeekStart = false, found_normiWeekEnd = false,
            found_hohtoStartDay = false, found_hohtoWeekEnd = false;
        for (let i = 0; i < week.length; i += 2) {
            const normi = week[i];
            const hohto = week[i + 1];
    
            // if less than 17.00 => day time
            // if over 17.00 => night time
    
            // if ma - pe => arki 
            // if la / su => weekend
    
            if (!found_normiWeekStart) { 
                if (normi != '') {
                    normiWeekStartIndex = i;
                    found_normiWeekStart = true;
                } else {
                    normiWeekStartIndex += 2;
                }
            } else {
                if (normi != '') {
                    found_normiWeekEnd = true;
                }
            }
        }
        const normiOut = found_normiWeekStart && found_normiWeekEnd ?
            `${getDayName(normiWeekStartIndex) - getDayName(normiWeekEndIndex)}` :
            found_normiWeekStart ? getDayName(normiWeekStartIndex) : 'Suljettu';
    
        getDayName(normiWeekStartIndex);
        getDayName(normiWeekEndIndex);
    });
    // normikeilaus
    // 12.00 - 20.00
    
    // päivä kestää avaamisesta asti => klo. 17.00
    // sitten alkaa ilta
    // 17.00 => sulkemiseen asti
    
    // hohtokeilaus
    // 16.00 - 20.00
    
    // kestää alkamisesta asti => sulkemiseen asti
    
    // tarkista jokainen päivä, saat aloitus päivän
    
    // tarkista viikon viimeisin hohtokeilauksen päivä, saat lopetuspäivän
    
    // output:
    // Ti - La 16.00 - 22.00
}
// setPricingCardTimes();


/// Arvostelut ///
function setReviews(data) {
    const typewriter1 = new Typewriter($('.stats .content .reviews h2').get(0), {
        cursor: '',
        delay: 0
    });
    function setReview() {
        if (data.length == 0) return;
        typewriter1.deleteAll().typeString(`"${getArrayRandom(data)}"`).start().pauseFor(5000)
            .callFunction(function (callback, thisArg) { setReview(); });
    }
    setReview();
}

/// Activities ///

// activities in titlecard's window
const titlecardEventLog = $(titlecard).find('.events').get(0);

// activities in default activity container
const mainCategoryEvents = $('.main-category.events .container').get(0);

// activities under competition's activities' container
const compContainer = $('.submarine').children();
var competitionItems = [0, 0, 0];

loadActivityItemsFromJson({
    "event": {
        parent: mainCategoryEvents
    },
    "link": {
        parent: mainCategoryEvents
    },
    "competition": {
        parent: $('.submarine'),
        expire: true
    }
}, function () {
    barrel.start($('.barrel'));
});

// Create the responsive map
$(function() {
    const middle = $('.map .middle');
    const controls = $('.map .bottom .controls');
    function setCategory(map) {
        $(middle).find('#gmap').css({ display: map ? 'block' : 'none' });
        $(middle).find('#video').css({ display: map ? 'none' : 'block' });
    }
    $(controls).find('#gmap').on('click', function() {
        setCategory(true);
    });
    $(controls).find('#video').on('click', function () {
        setCategory(false);
    });
    setCategory(false);
});

/// Load 'index.json' ///
fetch(indexJsonPath).then(v => v.json()).then(data => {
    // titles
    $(titlecard).find('.titlecard-title .title').html(data['titlecard_title']);
    $(titlecard).find('.titlecard-title .subtitle').html(data['titlecard_subtitle']);
    // gallery
    if (galleryPath != '') {
        var arr = [];
        data['gallery'].forEach(e => {
            arr.push(galleryPath + e);
        });
        setGallery(arr, galleryImageLimit);
    } else {
        setGallery(data['gallery'], galleryImageLimit);
    }
    // pricing
    const pr = data['pricing'];
    function fr(name) { return `${pr[name]}€`; }
    function gr(name1, name2) { return `${pr[name1][name2]}€`; }
    function bdPrice(name) {
        const r = name.replace('_', '-');
        $(`.${r} h3`).html(gr(name, 'normal'));
        $(`.${r} h4`).html(gr(name, 'hohto'));
    }
    bdPrice('birthday_small');
    bdPrice('birthday_big');
    $(`.pricing .snooker .title h3`).html(fr('snooker'));
    const discount = pr['discount'];
    $('.pricing .cards .benefit#discount h1').html(`-${discount}€`);
    function cardPrice(name) {
        const a = pr[name];
        $(`.pricing .cards .item#${name} h3.normal`).html(`${a}€`);
        $(`.pricing .cards .item#${name} h3.reduced`).html(a - discount <= 0 ? '0€!' : `${a - discount}€`);
    }
    cardPrice('day');
    cardPrice('night');
    cardPrice('hohto');
    cardPrice('weekend');
    cardPrice('equipment');
    // reviews
    setReviews(data['reviews']);
});


/// Get the anchor from the url ///
function setAnchors() {
    function setBarrel(index) {
        if (barrel.selectedCategory != -1 && barrel.selectedCategory != index) return;
        barrel.setCategory(index);
    }
    function op(val) { smoothScroll($(val).offset().top); }
    const anchor = window.location.hash != '' ? window.location.hash.slice(1) : '';
    if (anchor != '') {
        switch (anchor) {
            case 'palvelut':
                op('.barrel');
                break;
            case 'aukioloajat':
                op('.about-container .content .split .item#schedule');
                break;
            case 'hohto':
                op('.barrel');
                setBarrel(0);
                break;
            case 'synttarit':
                op('.barrel');
                setBarrel(1);
                break;
            case 'sauna':
                op('.barrel');
                setBarrel(3);
                break;
            case 'baari':
                op('.barrel');
                setBarrel(2);
                break;
            case 'keilaus':
                op('.about-container');
                break;
            case 'hinnastomme':
                op('.pricing');
                break;
            case 'sijaintimme':
                op('.map');
                break;
            case 'kilpakeilaus':
                op('.barrel')
                setBarrel(4);
                break;
            case 'veteraani':
                op('.about-container .content .item#d');
                break;
            case 'tapahtumat':
                op('.main-category.events');
                break;
            case 'galleria':
                op('.toggle-gallery');
                break;
        }
    }
}


$(window).on('load', function () {
    $('img').on('dragstart', function (e) {
        e.preventDefault()
    });
    setTimeout(() => {
        setAnchors();
    }, 200);
});