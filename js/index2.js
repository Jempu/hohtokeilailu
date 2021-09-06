function setReviews(data) {
    var currentReview = -1;
    let reviews = [];
    const reviewObj = $('.stats .content .reviews');
    const typewriter1 = new Typewriter($(reviewObj).find('h2').get(0), {
        cursor: '',
        loop: false,
        delay: 2
    });
    const typewriter2 = new Typewriter($(reviewObj).find('h3').get(0), {
        cursor: '',
        loop: false,
        delay: 4
    });
    function setReview() {
        if (reviews.length == 0) return;
        const item = getArrayRandom(reviews);
        if (item !== undefined) {
            typewriter1.deleteAll().typeString(`"${item['text']}"`).start();
            typewriter2.deleteAll().pauseFor(600).typeString(`– ${item['reviewer']}`).start();
        }
        resetTimer();
    }
    if (reviewObj != null) {
        reviews = data;
        reviewObj.find('.refresh-btn').on('click', function () {
            setReview();
        });
    }
    setReview();

    var timer = 0;
    function resetTimer() { timer = 0; }
    function startTimer() {
        setTimeout(() => {
            if (timer > 4) setReview(); else timer++;
            startTimer();
        }, 1000);
    }
    startTimer();
}


fetch('./content/index.json').then(v => v.json()).then(data => {
    // setPricing(v['pricing']);
    setReviews(data['reviews']);
});