// ------------------------------------------------------------------------------------ //
// Requires Jquery.
// ------------------------------------------------------------------------------------ //

const html = $("html");
const compContainer = $('.submarine').children();
const overlayContainer = $('.activity-container');

// titlecard events
const titlecard = $('.titlecard').get(0);
const titlecardEventLog = $(titlecard).find('.events').get(0);
// footer events
const mainCategoryEvents = document.querySelector('.main-category.events');
// comp list events

var competitionItems = [0,0,0];
function setActivitiesData(callback) {
    function setOverlayContainer(state, index = -1) {
        if (state) {
            overlayContainer.css({ display: 'block', transform: 'translateX(-50%) scale(100%)' });
            html.css({ overflowX: 'clip', overflowY: 'clip' });
              // .children = index;
            // for (let i = 0; i < 0; i++) {
            //     index == ;
            // }
            overlayContainer.animate({ now: 108 }, {
                duration: '400',
                step: function (now, fx) {
                    $(this).css('transform', `translateX(-50%) scale(${now}%)`);
                }
            });
        } else {
            overlayContainer.animate({ now: 0 }, {
                duration: '400',
                step: function (now, fx) {
                    $(this).css('transform', `translateX(-50%) scale(${now}%)`);
                },
                complete: function () {
                    overlayContainer.css({ display: 'none' });
                    html.css({ overflowX: 'clip', overflowY: 'scroll' });
                }
            });
        }
    }
    setOverlayContainer(false);
    const directory = './content/activities/';
    
    function createTitlecardEventItem(title, date) {
        if (titlecardEventLog == null) return;
        if (titlecardEventLog.children.length < 3) {
            let titleEventItem = document.createElement('div');
            titleEventItem.className = 'item';
            titleEventItem.innerHTML = `
                <h3>${title}</h3>
                <h4>${date}</h4>
            `;
            titlecardEventLog.appendChild(titleEventItem);
        }
    }
    function createFooterEventItem(img, title, date) {
        if (mainCategoryEvents == null) return;
        let footerEventItem = document.createElement('div');
        footerEventItem.className = 'item';
        footerEventItem.innerHTML = `
            ${img}
            <h1>${title}</h1>
            <h2>${date}</h2>
        `;
        footerEventItem.addEventListener('click', function () {
            console.log('opened an event overlay for ' + item['title']);
        });
        mainCategoryEvents.appendChild(footerEventItem);
    }
    function createCompetitionContainerItem(id, title, date, content, headerImg, dateStatus) {
        // container item
        const cel = document.createElement('div');
        cel.className = 'item';
        cel.id = id;
        date1 = `<h3>${date}</h3>`;
        cel.innerHTML = `
            ${headerImg}
            <div class="bo" id="a"></div>
            <h2>${title}</h2>
            ${date1}
            <div class="bo" id="b"></div>
        `;
        competitionItems[dateStatus]++;
        $('.submarine').find(`.content#${['a','b','c'][dateStatus]}`).append(cel);
        // On container item click open overlay window
        $(cel).on('click', function() {
            setOverlayContainer(true);
        });
        // overlay item
        const oel = document.createElement('div');
        oel.className = 'item';
        oel.id = id;
        oel.innerHTML = `
            <div>
                <button>x</button>
                <h1>${title}</h1>
                <h2>${date}</h2>
                <p>${content}</p>
                <ul>
                    <li>
                        <a href="http://tulokset.keilailu.fi/printpdfindex.php?reportid=10&id=77942&id2=22" target="#">Tulokset</a>
                    </li>
                    <li>
                        <a href="https://www.varaavuoro.com/mikkeli/competitions" target="#">Vuoron varaus</a>
                    </li>
                </ul>
            </div>
            <ul>
                <li>
                    <iframe src="https://www.hohtokeilailu.fi/wp-content/uploads/2021/06/kesakaadot.pdf" type="application/pdf"></iframe>
                    <h2>Kilpailuilmoitus</h2>
                </li>
                <li>
                    <iframe src="https://www.hohtokeilailu.fi/wp-content/uploads/2021/06/vph-kuljetus-kesa-kaadot.pdf" type="application/pdf"></iframe>
                    <h2>Olosuhde</h2>
                </li>
            </ul>
        `;
        overlayContainer.append(oel);
        // On overlay item click close overlay window
        $(oel).find('button').on('click', function () {
            setOverlayContainer(false);
        });
    }
    loadJson(`./content/activities.json`, function(data) {
        // date pattern
        data.forEach(item => {
            const folder = `${directory}${item}/`;
            loadJson(`${folder}/activity.json`, function(child) {
                // date
                const vdate = getDisplayableDate(child['date'], true, 3);
                const vdateStart = getDisplayableDate(child['date'], false, 1, false);
                const vdateEnd = getDisplayableDate(child['date'], false, 2, false);
    
                // title
                let vtitle = child['title'];
                let vimg = child['header-image'] != ''
                    ? `<img src="${folder}${child['header-image']}" alt="Tapahtumakuva">`
                    : '';

                // console.log(`${folder}${child['header-image']}`);
                
                let vfiles = child['files'];
                let vlink = child['links'];
    
                const vcontent = child['content'] != '' ? child['content'] : 'Tapahtumalla ei ole kuvausta.';
    
                const dateStatus = getDateStatus(vdateStart, vdateEnd);
                switch (child['type']) {
                    case 'event':
                    case 'link':
                        // display an event if it's only happening currently or in future
                        switch (dateStatus) {
                            case 0:
                            case 1:
                                createTitlecardEventItem(vtitle, vdate);
                                createFooterEventItem(vimg, vtitle, vdate);
                                break;
                        }
                        break;
                    case 'competition':
                        createTitlecardEventItem(vtitle, vdate);
                        createFooterEventItem(vimg, vtitle, vdate);
                        createCompetitionContainerItem(item, vtitle, vdate, vcontent, vimg, dateStatus);
                        break;
                }
            });
        });
        // once the data has been loaded, start barrel.
        responsiveBarrel.start(document.querySelector('.barrel'));
    });
    setTimeout(() => {
        callback();
    }, 500);
}

setActivitiesData(function() {
    $('.submarine').children().each(function(i,l) {
        $(l).css({ display: $(l).find('.content').children()['length'] != 0 ? 'block' : 'none' });
    });
});