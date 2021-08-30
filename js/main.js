// If the current page is the index.html / index.php

function isIndex() {
    let loc = window.location.pathname.split('/')[2];
    return loc == '' || loc == 'index.html' || loc == 'index.php';
}

// Misc

function createSchedule(ul) {
    fetch('./content/opening.json').then(v => v.json()).then(data => {
        data['days'].forEach(day => {
            const li = document.createElement('li');
            const split = day.split(',');
            const t1 = split[0];
            const t2 = split[1];
            // const hohto = (split.length > 2 ? ` (hohtona ${split[3]}` + (split.length == 4 ? ` – ${split[4]})` : ')') : '')
            li.innerHTML = day != "" ? `${t1} – ${t2}` : 'SULJETTU';
            $(ul).append(li);
        });
    });
}

// Mathematical functions

function back(x, timeFraction) {
    return Math.pow(timeFraction, 2) * ((x + 1) * timeFraction - x);
}

function bounce(timeFraction) {
    for (let a = 0, b = 1, result; 1; a += b, b /= 2) {
        if (timeFraction >= (7 - 4 * a) / 11) {
            return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2);
        }
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