$(function () {
    const nav = $('.nav');
    if (nav == null) return;
    const burger = $(nav).find('.burger');
    const mobileSideBar = $(nav).find('.mobile-side-bar');
    
    // links
    linkUrls = {
        onlineScoring: "http://onlinescore.qubicaamf.com/?idcenter=7054",
        facebookProfile: "https://www.facebook.com/mikkelinkeilahallioy",
        reserve: "https://www.varaavuoro.com/mikkeli",
        veterans: "https://www.hohtokeilailu.fi/veteraanit/"
    };
    const links = $(nav).find('.link');
    function op(val) {
        window.open(val.charAt(0) == '.' ? val : val, val = '#');
    }
    function opg(val = null, other = '') {
        if (isIndex()) {
            smoothScroll(val != null ? $(val).offset().top : 0);
            if (other != '') {
                op(`#${other}`);
            }
        } else {
            const a = other != '' ? `#${other}` : (val != null ? `#${val}` : './');
            op(`${gp(true)}${a}`);
        }
    }
    $(nav).find('.column').each(function (i, l) {
        const holder = $(this).find(`.holder`);
        $(l).on('mouseenter', function () {
            $(holder).get(0).setAttribute('active', 'true');
        });
        $(l).on('mouseleave', function () {
            $(holder).get(0).setAttribute('active', 'false');
        });
    });
    $(links).each(function (i, l) {
        const val = l.id;
        if (val === undefined || val == '') return;
        $(l).on('click', function () {
            switch (val) {
                case 'home':
                    opg();
                    break;
                case 'proshop':
                    op('./proshop.html');
                    break;
                // first column
                case 'services':
                    opg('.category-holder', 'palvelut');
                    break;
                case 'opening':
                    opg('', 'aukioloajat');
                    break;
                case 'hohto':
                    opg('', 'hohto');
                    break;
                case 'synttarit':
                    opg('', 'syntarit');
                    break;
                case 'sauna':
                    opg('', 'sauna');
                    break;
                case 'baari':
                    opg('', 'baari');
                    break;
                // second column
                case 'bowling':
                    opg('.pricing', 'keilaus');
                    break;
                case 'pricing':
                    opg('', 'hinnastomme');
                    break;
                case 'location':
                    opg('', 'sijaintimme');
                    break;
                case 'competitive':
                    opg('', 'kilpakeilaus');
                    break;
                case 'veteran':
                    op(linkUrls.veterans);
                    break;
                case 'scoring':
                    op(linkUrls.onlineScoring);
                    break;
                // other
                case 'activities':
                    opg('.main-category.events', 'tapahtumat');
                    break;
                case 'gallery':
                    opg('.gallery', 'galleria');
                    break;
                // hover buttons
                case 'facebook':
                    op(linkUrls.facebookProfile);
                    break;
                case 'reserve':
                    op(linkUrls.reserve);
                    break;
            }
        });
    });
    
    // burger and side-bar
    let sideBarActive = true;
    function setSideBar(val) {
        sideBarActive = !val;
        $(mobileSideBar).get(0).setAttribute('enabled', sideBarActive);
    }
    setSideBar(sideBarActive);

    // burger.js
    var isBurgerOpen = false, canBurgerOpen = true;
    function toggleBurgerIcon() {
        if (!canBurgerOpen) return;
        canBurgerOpen = false;
        isBurgerOpen = !isBurgerOpen;
        if (isBurgerOpen) {
            burgerIconOpenAnimation();
        } else {
            burgerIconCloseAnimation();
        }
        setTimeout(() => { canBurgerOpen = true; }, isBurgerOpen ? 2300 : 1800);
    }
    function setAAnim(anim, parameters = '1s ease-in-out forwards', index = -1) {
        const a = `burgerIconAnim${anim} ${parameters}`;
        if (index == -1) {
            $(burger).get(0).style.animation = a;
            return;
        }
        $(burger).get(0).children[index].style.animation = a;
    }
    function burgerIconOpenAnimation() {
        // start by rotating the middle piece 90deg
        setAAnim('1', '.6s ease-in-out forwards', 1);
        // then, rotate whole icon 90deg
        setTimeout(() => {
            setAAnim('2', '1s forwards');
        }, 400);
        // then, add sparkling effect to 'H' for 1.5s
        setTimeout(() => {
            setAAnim('3', '2s forwards');
        }, 1500);
        // move side pieces to middle
        setTimeout(() => {
            setAAnim('5L', '.7s ease-in-out forwards', 0);
            setAAnim('5R', '.7s ease-in-out forwards', 2);
        }, 1200);
        // then, rotate whole icon -45deg
        setTimeout(() => {
            setAAnim('4', '.5s ease-in-out forwards');
        }, 1700);
    }
    function burgerIconCloseAnimation() {
        // start by moving side pieces from middle back to their place
        setAAnim('6L', '.3s ease-in-out forwards', 0);
        setAAnim('6R', '.3s ease-in-out forwards', 2);
        // then, rotate all 45deg anti-clockwise
        setTimeout(() => {
            setAAnim('9', '.4s ease-in-out forwards');
            // then, rotate all 135deg anti-clockwise
            setTimeout(() => {
                setAAnim('7', '.8s ease-in-out forwards');
            }, 400);
            // 
            setTimeout(() => {
                setAAnim('8', '.4s ease-in-out forwards', 1);
            }, 800);
        }, 300);
    }
    
    $(burger).on('click', function () {
        setSideBar(sideBarActive);
        toggleBurgerIcon();
    });

    // window resizing
    function checkMinimize() {
        $(nav).get(0).setAttribute('minimized', window.scrollY > window.innerHeight * 0.85);
    }
    $(window).on("scroll", () => { checkMinimize(); });
    checkMinimize();
});