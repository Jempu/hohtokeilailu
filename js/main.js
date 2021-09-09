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
    });

});