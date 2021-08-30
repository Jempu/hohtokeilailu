function instantiate_load() {
    let footer = document.querySelector('.footer')
    footer.addEventListener('click', function() {
        window.open('https://www.ikatyros.com', target='#')
    })
    if (isIndex()) {
        console.log('Yhteistyökumppanit')

    } else {
        console.log('Tavarantoimittajana toimii')

    }
}

function focusOnMap() {
    if (isIndex()) {
        smoothScroll(document.querySelector('.map').offsetTop - 200)
    } else {
        window.open('./', '#')
    }
}