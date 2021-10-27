$(function() {
    const coor = $('.coordinator');
    
    $(window).on('load', function () {
        // "Scroll back to top" -button
        $(coor).children("#page-top").on('click', function (e) {
            e.preventDefault();
            smoothScroll(0, 800, this.hash);
        });
        // "Scroll back to bottom" -button
        $(coor).children("#page-bottom").on('click', function (e) {
            e.preventDefault();
            smoothScroll(document.querySelector('.footer').offsetTop, 1500, this.hash);
        });
    });
    
    var vis = true;
    function setVisibility(val) {
        if (vis == val) return;
        vis = val;
        $(coor).get(0).setAttribute('enabled', val ? 'true' : 'false');
    }
    $(window).on('scroll', function () {
        setVisibility(window.scrollY > window.innerHeight * 2.18 && window.scrollY < $('html').height() - 1000);
    });
    setVisibility(false);
});