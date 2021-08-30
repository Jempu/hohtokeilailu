$(window).on('load', function () {

    let coor = document.querySelector('.coordinator')

    // "Scroll back to top" -button
    $(coor).children(".page-top").on('click', function (e) {
        e.preventDefault()
        smoothScroll(0, 800, this.hash)
    })
    
    // "Scroll back to bottom" -button
    $(coor).children(".page-bottom").on('click', function (e) {
        e.preventDefault()
        smoothScroll(document.querySelector('.footer').offsetTop, 1500, this.hash)
    })
})