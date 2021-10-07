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
    const carousel = $("#cloud9-carousel");
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
        $(l).find(".button").on('click', function () {
            selectBarrelCategory(i);
        });
    });

    var slideCount = sliderSlides.length;
    var slideWidth = $(".slider ul li").width();
    var slideHeight = $(".slider ul li").height();
    var slideUlWidth = slideCount * slideWidth;
    var currentSlide = -1;
    var isTransitioning = false;
    const slideVideos = monitorContainer.find('iframe');

    function setCarousel(index) {
        carouselChildren = $(carousel).children().get().reverse();
        carouselChildCount = $(carouselChildren).length;
        $(carousel).Cloud9Carousel({
            bringToFront: false,
            frontItemClass: "front",
            mirror: {
                gap: 12,     /* 12 pixel gap between item and reflection */
                height: 0.2, /* 20% of item height */
                opacity: 0.4 /* 40% opacity at the top */
            },
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
        slideVideos.each(function (i, l) {
            const player = $f(l);
            player.api(i == index ? 'play' : 'pause');
        });
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
            setCarousel(currentSlide + 1);
        }, 50);
    });

    // Parallax scroll effect for container items
    function setMonitorScollParallax() {
        var scrollTop = $(window).scrollTop();
        if (scrollTop < $(monitorContainer).height()) {
            $(monitor).find(".title").eq(0).css({ transform: `translate(-50%, ${scrollTop / -20}%)` });
            $(monitorContainer).children().each(function (i, l) {
                $(l).css({ transform: `translateY(${scrollTop / -110}%)` });
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
                slideVideos.each(function (i, l) {
                    const player = $f(l);
                    player.api(i == currentSlide ? 'play' : 'pause');
                });
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


/// Arvostelut ///
function setReviews(data) {
    let reviews = [];
    const reviewObj = $('.stats .content .reviews');
    const typewriter1 = new Typewriter($(reviewObj).find('h2').get(0), {
        cursor: '',
        loop: false,
        delay: 2
    });
    function setReview() {
        if (reviews.length == 0) return;
        typewriter1.deleteAll().typeString(`"${getArrayRandom(reviews)}"`).pauseFor(5000).callFunction(function () {
            setReview();
        }).start();
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

// function setActivities(data) {
//     function createTitlecardEventItem(item, title, date) {
//         if (titlecardEventLog == null) return;
//         if (titlecardEventLog.children.length < 3) {
//             let titleEventItem = document.createElement('div');
//             titleEventItem.className = 'item';
//             titleEventItem.innerHTML = `
//                 <h3>${title}</h3>
//                 <h4>${date}</h4>
//             `;
//             titlecardEventLog.appendChild(titleEventItem);
//         }
//     }
//     function createFooterEventItem(item, img, title, date) {
//         if (mainCategoryEvents == null) return;
//         let footerEventItem = document.createElement('div');
//         footerEventItem.className = 'item';
//         footerEventItem.innerHTML = `
//             ${img}
//             <h1>${title}</h1>
//             <h2>${date}</h2>
//         `;
//         $(footerEventItem).on('click', function () {
//             setOverlayContainer(item);
//         });
//         mainCategoryEvents.appendChild(footerEventItem);
//     }
//     function createCompetitionContainerItem(
//         item, title, date, content, headerImg, dateStatus) {
//         // container item
//         const cel = document.createElement('div');
//         cel.className = 'item';
//         cel.id = item;
//         date1 = `<h3>${date}</h3>`;
//         cel.innerHTML = `
//             ${headerImg}
//             <div class="bo" id="a"></div>
//             <h2>${title}</h2>
//             ${date1}
//             <div class="bo" id="b"></div>
//         `;
//         competitionItems[dateStatus]++;
//         $('.submarine').find(`.content#${['a', 'b', 'c'][dateStatus]}`).append(cel);
//         // On container item click open overlay window
//         $(cel).on('click', function () {
//             setOverlayContainer(item);
//         });
//         // overlay item
//         const oel = document.createElement('div');
//         oel.className = 'item';
//         oel.id = item;
//         oel.innerHTML = `
//             <div class="item">
//                 <div class="content">
//                     <div class="left">
//                         <div class="header-img"></div>
//                         <h1>${title}</h1>
//                         <h2>${date}</h2>
//                         <p>${content}</p>
//                         <a href="http://tulokset.keilailu.fi/printpdfindex.php?reportid=10&id=77942&id2=22" target="#">Tulokset</a>
//                         <a href="https://www.varaavuoro.com/mikkeli/competitions" target="#">Vuoron varaus</a>
//                     </div>
//                     <div class="right">
//                         <div class="media">
//                             <iframe src="https://www.hohtokeilailu.fi/wp-content/uploads/2021/06/kesakaadot.pdf" frameborder="0"></iframe>
//                             <iframe src="https://www.hohtokeilailu.fi/wp-content/uploads/2021/06/vph-kuljetus-kesa-kaadot.pdf" frameborder="0"></iframe>
//                         </div>
//                     </div>
//                     <div class="close">
//                         <img src="./img/close.png" alt="Sulje näkymä">
//                     </div>
//                 </div>
//             </div>
//         `;
//     }

//     //         const dateStatus = getDateStatus(vdateStart, vdateEnd);
//     //         switch (child['type']) {
//     //             case 'event':
//     //             case 'link':
//     //                 // display an event if it's only happening currently or in future
//     //                 switch (dateStatus) {
//     //                     case 0:
//     //                     case 1:
//     //                         createTitlecardEventItem(item, vtitle, vdate);
//     //                         createFooterEventItem(item, vimg, vtitle, vdate);
//     //                         break;
//     //                 }
//     //                 break;
//     //             case 'competition':
//     //                 createTitlecardEventItem(item, vtitle, vdate);
//     //                 createFooterEventItem(item, vimg, vtitle, vdate);
//     //                 createCompetitionContainerItem(item, vtitle, vdate, vcontent, vimg, dateStatus);
//     //                 break;
//     //         }
//     //     });
//     // });

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
    // Once all of the other data has been loaded, finally load the barrel.
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
    
    // add path to gallery photos
    if (galleryPath != '') {
        var arr = [];
        data['gallery'].forEach(e => {
            arr.push(galleryPath + e);
        });
        setGallery(arr, galleryImageLimit);
    } else {
        setGallery(data['gallery'], galleryImageLimit);
    }
    
    // setPricing(v['pricing']);
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