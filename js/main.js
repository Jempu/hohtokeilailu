const activityDirectory = './content/activities/';
function post(body, file = '') {
    const f = file == '' ? './admin/admin_post.php' : file;
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 200) {
            location.reload();
        }
    }
    xhr.open("POST", f, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
    xhr.send(JSON.stringify(body));
}
// If the current page is the 'index.html' or 'index.php'
function isIndex() {
    let loc = window.location.pathname.split('/')[2];
    return loc == '' || loc == 'index.html' || loc == 'index.php';
}
// Get the global path (gp) either from '.../project/index.html' or '.../project/folder/index.html'
function gp(isRoot = false) {
    return isIndex() || isRoot ? './' : '../';
}
function getHtmlForFile(fileWPath) {
    var o = '';
    switch (fileWPath.split('/').pop().split('.').pop()) {
        case 'pdf':
            o += `<iframe src="${fileWPath}" type="application/pdf" width="100%" frameborder="0"></iframe>`;
            break;
        case 'png':
        case 'jpg':
        case 'jpeg':
        case 'gif':
            o += `<img src="${fileWPath}" />`
            break;
        case 'mp4':
        case 'mov':
            o += `<video src="${fileWPath}" controls></video>`
            break;
    }
    return o;
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
// Every element that has been tagged as 'ika-responsive' gets a 'pc' or 'mobile' value
// and that can be used to make things responsive with scripts and css.
// You can attach a listener to IkaResponsive to detect if 'isMobileSize' has changed.
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
// Loads html of a file and displays it on the page
const head = document.getElementsByTagName('head')[0];
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
// Contains miscallenious functionality.
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
        if (d.getFullYear() - yea <= 0) {
            if (d.getMonth() + 1 - mon >= 0) {
                if (d.getMonth() + 1 - mon == 0) {
                    if (d.getDate() - day < 0) {
                        return false;
                    }
                }
            } else {
                return false;
            }
        }
        return true;
    }
    function isBeforeDate(day, mon, yea) {
        if (d.getFullYear() - yea <= 0) {
            if (mon - d.getMonth() + 1 > 0) {
                if (mon - d.getMonth() + 1 - 2 == 0) {
                    if (day - d.getDate() >= 0) {
                        return true;
                    }
                } else {
                    return true;
                }
            }
        }
        return false;
    }
    // current
    if (isAfterDate(s1[0], s1[1], s1[2]) && isBeforeDate(s2[0], s2[1], s2[2])) {
        if (format == 'number') return 0;
        switch (lang) {
            case 'en': return 'current';
            case 'fi': return 'meneillään';
        }
    }
    // future
    if (isBeforeDate(s2[0], s2[1], s2[2])) {
        if (format == 'number') return 1;
        switch (lang) {
            case 'en': return 'future';
            case 'fi': return 'tulossa';
        }
    }
    // past
    if (format == 'number') return 2;
    switch (lang) {
        case 'en': return 'past';
        case 'fi': return 'mennyt';
    }
}

// Times need to be formatted as "9.26"
function getIfOpen(openTime, closeTime, currentTime = null, timeSeparator = '.') {
    let ct = currentTime, ctH = 0, ctM = 0;
    const ot = openTime.split(timeSeparator), wt = closeTime.split(timeSeparator);
    const otH = ot[0], otM = ot[1], wtH = wt[0], wtM = wt[1];
    if (ct == null) {
        const d = new Date();
        ctH = d.getHours();
        ctM = d.getMinutes();
    }
    return (ctH - otH >= 0 && ctM - otM >= 0 && wtH - ctH > 0) 
        && (wtH - ctH == 0 ? wtH - ctH == 0 && wtM - ctM >= 0 : true);
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
async function loadActivityItemsFromJson(itemTypeRules, callback) {
    var callbackCalled = false;
    if (itemTypeRules == null || itemTypeRules.length == 0) {
        if (callback != null && callback !== undefined) callback();
        return;
    }
    function removeActivityContainerItem(e, id) {
        $(e).remove();
        post({ remove_activity:id });
    }
    fetch(`./content/index.json`).then(v => v.json()).then(data => {
        const dataActivities = data['activities'];
        if (dataActivities.length == 0) {
            if (callback != null && callback !== undefined) callback();
            return;
        }
        var loadedDataCount = 1;
        const dataCount = dataActivities.length;
        dataActivities.forEach(item => {
            const folder = `${activityDirectory}${item}/`;
            fetch(`${folder}activity.json`).then(v => v.json()).then(child => {
                // if is set to specific types
                var parent = $('body');
                var useExpiredItems = false;
                var addControls = false;
                if (itemTypeRules['all'] != null) {
                    var rules = itemTypeRules['all'];
                    parent = rules['parent'] ?? $('body');
                    useExpiredItems = rules['useExpiredItems'] ?? false;
                    addControls = rules['control'] ?? false;
                } else {
                    var rules = itemTypeRules[child['type']];
                    parent = rules['parent'] ?? $('body');
                    useExpiredItems = rules['useExpiredItems'] ?? false;
                    addControls = rules['control'] ?? false;
                }
                const date = getDisplayableDate(child['date'], true, 3);
                const dateStart = getDisplayableDate(child['date'], false, 1, false);
                const dateEnd = getDisplayableDate(child['date'], false, 2, false);
                const dateStatus = getDateStatus(dateStart, dateEnd, 'abc', 'fi');
                // create the default activity item, on click open overlay
                // create the link activity item, on click open url
                function getType(v) {
                    switch (v) {
                        case 'event': return 'Tapahtumailmoitus';
                        case 'competition': return 'Kilpailuilmoitus';
                        case 'link': return 'Linkki-ilmoitus';
                    }
                }
                const type = getType(child['type']);
                // create activity container item
                const itemDiv = document.createElement('div');
                itemDiv.className = 'activity-item';
                itemDiv.id = item;
                function getHtmlAndLinkForFile(file) {
                    return `${getHtmlForFile(file)}<br><a href="${file}" target="#">Avaa tiedosto eri ikkunaan</a>`;
                }
                function getFiles(files) {
                    var o = '';
                    files.forEach(file => {
                        o += `${getHtmlAndLinkForFile(folder+'/'+file)}<br>`;
                    });
                    return o;
                }
                function getLinks(links) {
                    var o = '';
                    links.forEach(link => {
                        o += `<a href="${link['link']}" target="#">${link['text']}</a><br>`;
                    });
                    return o;
                }
                itemDiv.innerHTML = `
                    <div class="content">
                        ${getHtmlAndLinkForFile(child['header_image'] != '' ? `${folder}${child['header_image']}` : '')}
                        <div class="bo" id="a"></div>
                        <h3>${date}</h3>
                        ${getFiles(child['files'])}
                        ${child['content'] != '' ? `<p>${child['content']}</p>` : ''}
                        ${getLinks(child['links'])}
                        <div class="bo" id="b"></div>
                    </div>`
                    + (addControls ? `
                    <div class="control">
                        <h1>${type}</h1>
                        <h1>Tapahtuma ${dateStatus}</h1>
                        <h2 id="delete">Poista Ilmoitus<h2>
                    </div>` : '');
                if (addControls) {
                    $(itemDiv).find('.control h2#delete').on('click', function () {
                        removeActivityContainerItem(itemDiv, item);
                    });
                }
                if (!useExpiredItems) {
                    if (getDateStatus(dateStart, dateEnd) != 2) {
                        (useExpiredItems
                            ? $(parent).find(`#${getDateStatus(dateStart, dateEnd, 'abc', 'en')} .content`).get(0) ?? parent
                            : parent).append(itemDiv);
                        $(parent).find('noactivities').css({ display: 'none' });
                    }
                } else {
                    (useExpiredItems
                        ? $(parent).find(`#${getDateStatus(dateStart, dateEnd, 'abc', 'en')} .content`).get(0) ?? parent
                        : parent).append(itemDiv);
                    $(parent).find('noactivities').css({ display: 'none' });
                }
                $(itemDiv).ready(function () {
                    loadedDataCount++;
                    if (loadedDataCount >= dataCount && callback != null && callback !== undefined && !callbackCalled) {
                        callbackCalled = true;
                        callback();
                    }
                })
            });
        });
    });
}
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
function createSchedule(dayList, ul, title = null) {
    function addOpenToTitle() {
        if (title == null) return;
        const day = new Date().getDay() - 1;
        const sch = scheduleArray[day];
        title.innerHTML += ` (nyt ${sch.close != null ? (getIfOpen(sch.open, sch.close) ? 'auki' : 'suljettu') : 'suljettu'})`;
    }
    if (scheduleArray.length == 0) {
        fetch(scheduleJsonPath).then(v => v.json()).then(data => {
            // reset mobile day list's innerhtml
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
                // add __ as padding to day list
                $(dayList).children().eq(Math.round(i / 2)).css({ marginBottom: h.length > 0 ? '36px' : '0px' });
                $(ul).append(li);
                scheduleArray.push({ open: t1, close: t2 });
            }
            addOpenToTitle();
        });
    } else {
        addOpenToTitle();
    }
}
function playLoadingScreenAnim() {
    $('.page-loader').animate({
        opacity: 0
    }, 750, function () {
        $(this).css({ display: 'none' });
        setPageScrolling(true);
    });
}
$(window).on('load', function () {
    $(document).find('.varaa-btn').each(function (i, l) {
        $(l).on('click', function () {
            window.open('https://www.varaavuoro.com/mikkeli', target='#');
        });
    });
    playLoadingScreenAnim();
});