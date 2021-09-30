// If the current page is the 'index.html' or 'index.php'
function isIndex() {
    let loc = window.location.pathname.split('/')[2];
    return loc == '' || loc == 'index.html' || loc == 'index.php';
}

// Get the global path (gp) either from '.../project/index.html' or '.../project/folder/index.html'
function gp(isRoot = false) {
    return isIndex() || isRoot ? './' : '../';
}

function setPageScrolling(v) {
    $('html').css({ overflowX: 'clip', overflowY: v ? 'auto' : 'clip' });
}
setPageScrolling(false);

// Mathematical functions

// Clamp number between two values with the following line:
const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

function getRandomIndex(input) {
    function rand(v) { return Math.round((v - 1) * Math.random()); }
    if (typeof input === 'array') return rand(array.length);
    if (typeof input === 'number') return rand(input);
    return -1;
}

function getArrayRandom(array, lastIndex = null) {
    let i = Math.round((array.length - 1) * Math.random());
    if (lastIndex != null) {
        if (i == lastIndex) i += Math.random() > 0.5 ? 1 : -1;
        if (i > array.length - 1) i = 0;
        else if (i < 0) i = array.length - 1;
    }
    return array[i];
}

// ------------------------------------------------------------------------------------ //
// Every element that has been tagged as 'ika-responsive' gets a 'pc' or 'mobile' value
// and that can be used to make things responsive with scripts and css.
// ------------------------------------------------------------------------------------ //
// You can attach a listener to IkaResponsive to detect if 'isMobileSize' has changed.
// ------------------------------------------------------------------------------------ //
const ikaResponsive = {
    resizables: undefined,
    aInternal: undefined,
    start: function () {
        resizables = $('[ika-responsive]');
        function checkWidth() {
            if (resizables === undefined) return;
            const w = window.innerWidth < 1028;
            if (w == ikaResponsive.a) return;
            ikaResponsive.a = w;
            $(resizables).each(function (i, e) {
                $(e).attr('ika-responsive', !w ? 'pc' : 'mobile');
            });
        }
        $(window).on('load', function () {
            $(window).on('resize', function () {
                checkWidth();
            });
            checkWidth();
        });
    },
    set a(val) {
        ikaResponsive.aInternal = val;
        ikaResponsive.aListener(val);
    },
    get a() {
        return ikaResponsive.aInternal;
    },
    aListener: function (val) { },
    registerListener: function (listener) {
        ikaResponsive.aListener = listener;
    }
};
$(function() {
    ikaResponsive.start();
});

// ------------------------------------------------------------------------------------ //
// Loads html of a file and displays it on the page
// ------------------------------------------------------------------------------------ //
const head = document.getElementsByTagName("head")[0]
// the parents that the instance gets put on
var ikaInstances = null;

function instantiate(parent, html, scripts, styles) {
    if (ikaInstances == null) return;
    fetch(html).then(v => v.text()).then(v => {
        parent.innerHTML = v;
        if (scripts != null) {
            scripts.forEach(script => {
                const src = script['src'];
                const file = document.createElement('script');
                file.setAttribute("type", "text/javascript");
                file.setAttribute("src", src);
                loadScript(src, function () {
                    if (script['callback'] != null) {
                        instantiate_load(script['callback']);
                    }
                });
            });
        }
        if (styles != null) {
            styles.forEach(style => {
                const file = document.createElement("link");
                file.setAttribute("rel", "stylesheet");
                file.setAttribute("type", "text/css");
                file.setAttribute("href", style);
                head.appendChild(file);
            });
        }
    });
}

function loadJson(file, callback) {
    fetch(file).then(v => v.json()).then(data => {
        callback(data);
    });
}

function loadScript(src, callback) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.addEventListener('load', () => { callback() }, { once: true });
    script.src = src;
    head.appendChild(script);
}

$(window).ready(function () {
    ikaInstances = document.querySelectorAll('[ika-instance]');
    ikaInstances.forEach(el => {
        const d = JSON.parse(el.getAttribute('ika-instance'));
        const scripts = d['scripts'] !== undefined ? d['scripts'] : null;
        const styles = d['styles'] !== undefined ? d['styles'] : null;
        instantiate(el, d['html'], scripts, styles);
    });
});

// ------------------------------------------------------------------------------------ //
// Contains miscallenious functionality.
// ------------------------------------------------------------------------------------ //
// Valid date: 06.12.2021
function getWeekDayFromDate(date, lang = 'fi') {
    var days = null;
    switch (lang) {
        default:
        case 'fi':
            days = ['Sunnuntai', 'Maanantai', 'Tiistai', 'Keskiviikko', 'Torstai', 'Perjantai', 'Lauantai'];
            break;
        case 'en':
            days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
            break;
    }
    const datePattern = /(\d{2})\.(\d{2})\.(\d{4})/;
    return days[new Date(date.replace(datePattern, '$3-$2-$1')).getDay()];
}

/*
    Output: "Monday, 2. – 12.2.2020"
    Full date: 2.5.2021 – 20.5.2021
    Clip date: 2. – 20.5.2021
    dayParts:
    0 no start or end dates
    1 with only start date
    2 with only end date
    3 with both start and end dates
*/
function getDisplayableDate(date, withDay = true, dayParts = 1, clipped = true, lang = 'fi') {
    function removeStartZero(date) {
        var v = '';
        const split = date.split('.');
        for (let i = 0; i < split.length; i++) {
            const e = split[i];
            v += (e[0] == '0' ? e.substring(1) : e) + (i < split.length - 1 ? '.' : '');
        }
        return v;
    }
    function trimDate(date) {
        const multipleDates = date.includes('-');
        var ddate = '';
        var checkDate = removeStartZero(date);
        if (multipleDates) {
            const dateSplit = date.split('-');
            checkDate = dateSplit[0];
            const dateStart = removeStartZero(dateSplit[0]);
            const dateEnd = removeStartZero(dateSplit[1]);
            switch (dayParts) {
                case 1:
                    ddate = dateStart;
                    break;
                case 2:
                    ddate = dateEnd;
                    break;
                case 3:
                    if (clipped) {
                        const dateS1 = dateStart.split('.');
                        const dateS2 = dateEnd.split('.');
                        ddate = dateS1[0] + '.';
                        // if year or month is same, clip from first date.
                        for (let i = 1; i <= dateS1.length; i++) {
                            if (dateS1[i] != dateS2[i]) {
                                ddate += dateS1[i] + (i != 2 ? '.' : '');
                            }
                        }
                        ddate += ` – ${dateEnd}`;
                    } else {
                        ddate = `${dateStart} – ${dateEnd}`;
                    }
                    break;
            }
        }
        // The proper displayable title that gets returned.
        // Start as "Monday, " and check for start and end dates.
        return { date: ddate, checkDate: checkDate };
    }
    const trim = trimDate(date);
    const weekday = withDay ? `${getWeekDayFromDate(trim.checkDate, lang)}, ` : '';
    return weekday + trim.date;
}

/*
    Gets the date from the current time;
    if it's in current time, the future or the past.
    0 = current
    1 = future
    2 = past
*/
function getDateStatus(targetDateStart, targetDateEnd, format = 'number', lang = 'en') {
    const s1 = targetDateStart.split('.');
    const s2 = targetDateEnd.split('.');
    const d = new Date();
    function isAfterDate(day, mon, yea) {
        const a = d.getDate() - day > 0;
        const b = d.getMonth() + 1 - mon > 0;
        const c = d.getFullYear() - yea > 0;
        return !(!c && (!b || !a));
    }
    function isBeforeDate(day, mon, yea) {
        const a = d.getDate() - day <= 0;
        const b = d.getMonth() + 1 - mon <= 0;
        const c = d.getFullYear() - yea <= 0;
        return !(c && (!b || !a));
    }
    // current
    if (isAfterDate(s1[0], s1[1], s1[2]) && isBeforeDate(s2[0], s2[1], s2[2])) {
        if (format == 'number') return 0;
        else {
            switch (lang) {
                case 'en': return 'current';
                case 'fi': return 'meneillään';
            }
        }
    }
    // future
    else if (isAfterDate(s2[0], s2[1], s2[2]) && isBeforeDate(s1[0], s1[1], s1[2])) {
        if (format == 'number') return 2;
        else {
            switch (lang) {
                case 'en': return 'future';
                case 'fi': return 'tulossa';
            }
        }
    }
    // past
    if (format == 'number') return 1;
    switch (lang) {
        case 'en': return 'past';
        case 'fi': return 'mennyt';
    }
}


// Times need to be formatted as "9:26"
function getIfOpen(openTime, closeTime, currentTime = null) {
    var ct = currentTime, ctH = 0, ctM = 0;
    const ot = openTime.split(':'), wt = closeTime.split(':');
    const otH = ot[0], otM = ot[1], wtH = wt[0], wtM = wt[1];
    // if null, use local time
    if (ct == null) {
        const d = new Date();
        ctH = d.getHours();
        ctM = d.getMinutes();
    }
    if (ctH - otH >= 0) {
        if (ctM - wtM > 0) {
            if (wtH - ctH >= 0) {
                if (wtM - ctM > 0) {
                    return true;
                }
            }
        }
    }
    return false;
}


// For setting an absolutely positioned object in place its place.
// Note that 'index' starts from 0
function getPlaceInGrid(columnCount, rowCount, index) {
    // x
    const x1 = (index % columnCount) * (100 / (columnCount - 1));
    const isRight = x1 > 50;
    const x2 = x1 > 0 ? (isRight ? `${100 - x1}%` : `${x1}%`) : '0';
    const x3 = isRight ? 'right' : 'left';
    // y
    var q = 0;
    for (let i = 0; i <= index; i += columnCount) q++;
    const y1 = ((q / (rowCount / 2)) - 1) * 100;
    const isBottom = q > rowCount / 2;
    const y2 = y1 > 0 ? (isBottom ? `${100 - y1}%` : `${y1}%`) : '0';
    const y3 = isBottom ? 'bottom' : 'top';
    return {
        x: (index % columnCount) + 1,
        y: q,
        horizontal: { side: x3, val: x2 },
        vertical: { side: y3, val: y2 },
        transform: !isRight && x1 > 0 ? 'translateX(-50%)' : 'translateX(0%)'
    };
}


// ------------------------------------ 
//// COORDINATOR
// ------------------------------------ 
function smoothScroll(top = 0, delay = 800, hash = null) {
    $('html, body').animate({
        scrollTop: top
    }, delay + (window.pageYOffset * .0005), function () {
        if (hash != null) {
            window.location.hash = hash;
        }
    });
}


const scheduleJsonPath =  './content/opening.json';
var scheduleArray = [];

function createSchedule(ul, title = null) {
    function addOpenToTitle() {
        if (title == null) return;
        const day = new Date().getDay() - 1;
        const sch = scheduleArray[day];
        title.innerHTML += ` (nyt ${sch.close != null ? (getIfOpen(sch.open, sch.close) ? 'auki' : 'suljettu') : 'suljettu'})`;
    }
    if (scheduleArray.length == 0) {
        fetch(scheduleJsonPath).then(v => v.json()).then(data => {
            for (let i = 0; i < data['days'].length; i += 2) {
                const n =  data['days'][i];
                const h =  data['days'][i + 1];
                const li = document.createElement('li');
                const splN = n.split(',');
                const splH = h.split(',');
                const t1 = splN[0];
                const t2 = splN[1];
                const hohto = h.length > 0 ? ` (Hohto ${splH[0]} - ${splH[1]})` : '';
                li.innerHTML = n.length > 0 ? `${t1} - ${t2}${hohto}` : 'SULJETTU';
                $(ul).append(li);
                scheduleArray.push({ open: t1, close: t2 });
            }
        }).then(() => {
            addOpenToTitle();
        });
    } else {
        addOpenToTitle();
    }
}


$(window).on('load', function () {
    $(document).find('.varaa-btn').each(function (i, l) {
        $(l).on('click', function () {
            window.open('https://www.varaavuoro.com/mikkeli', target='#');
        });
    });
    // plays an animation on loading screen until the page has been fully loaded
    $('.page-loader').animate({
        opacity: 0
    }, 750, function () {
        $(this).css({ display: 'none' });
        setPageScrolling(true);
    });
});