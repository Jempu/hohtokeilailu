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
            data['days'].forEach(day => {
                const li = document.createElement('li');
                const split = day.split(',');
                const t1 = split[0];
                const t2 = split[1];
                // const hohto = (split.length > 2 ? ` (hohtona ${split[3]}` + (split.length == 4 ? ` – ${split[4]})` : ')') : '')
                li.innerHTML = day != "" ? `${t1} – ${t2}` : 'SULJETTU';
                $(ul).append(li);
                scheduleArray.push({ open: t1, close: t2 });
            });
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