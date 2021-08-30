let catalogue = document.querySelector('.catalogue')
let itemTypes = [...catalogue.querySelectorAll('.type')]
let itemTypeItems = [...catalogue.querySelectorAll('.item')]

/// proshop item overlay

let itemOverlay = document.querySelector('.item-overlay')
let itemOverlayReturn = itemOverlay.querySelector('.return')
itemOverlay.style.display = 'none'

itemOverlayReturn.addEventListener('click', function () {
    setItemOverlay(false)
})

for (let i = 0; i < itemTypeItems.length; i++) {
    let item = itemTypeItems[i]
    item.onclick = function() {
        // console.log(i)
        setItemOverlay(true)
    }
}

function setItemOverlay(value = false) {
    if (value) {
        itemOverlay.style.display = 'block'
        itemOverlay.style.top = `${window.pageYOffset}px`
    } else {
        itemOverlay.style.display = 'none'
    }
}

/// items loading

// Convert HEX to RGB with Javascript
// https://convertingcolors.com/blog/article/convert_hex_to_rgb_with_javascript.html
String.prototype.convertToRGB = function() {
    if (this.length != 6) {
        throw "Only six-digit hex colors are allowed."
    }
    var aRgbHex = this.match(/.{1,2}/g);
    var aRgb = [
        parseInt(aRgbHex[0], 16),
        parseInt(aRgbHex[1], 16),
        parseInt(aRgbHex[2], 16)
    ]
    return aRgb;
}

let items = []

fetch('./content/proshop-items.json').then(v => v.json()).then(data => {
    // shoes, bags, balls & misc
    data.forEach(type => {

        let typeTitle = type['type']
        let typePath = type['type-path']
        let packagePath = type['package-path']

        let items = type['items']
        items.forEach(item => {
            
            let itemName = item['name']
            let itemPath = item['path']
            
            let d1 = document.createElement('h1')
            d1.innerHTML = itemName
            document.body.appendChild(d1)

            // all of the available colors of the item
            let colors = item['colors']
            colors.forEach(color => {
                // if the item's color is a linear gradient,
                // create a linear or normal color out of it
                
                let d = document.createElement('div')
                document.body.appendChild(d)
                d.style.width = "4rem"
                d.style.height = "4rem"
                d.style.backgroundRepeat = 'no-repeat'
                d.style.backgroundSize = 'contain'
                
                let colore = color['color']
                if (colore.includes('/')) {
                    let cc = colore.split('/')
                    let color1 = `rgb(${cc[0].convertToRGB()}) -3%`
                    let color2 = `rgb(${cc[1].convertToRGB()}) 90%`
                    let dd = `linear-gradient(130deg, ${color1}, ${color2})`
                    d.style.background = dd
                } else {
                    d.style.backgroundColor = `#${colore}`
                }
                if (color['index'] != null) {
                    let indexes = color['index']
                    indexes.forEach(index => {
                        // console.log(index)
                    })
                }
            })

            let imgs = item['imgs']
            imgs.forEach(img => {
                let url = window.location.toString().split("/").slice(0,-1).join("/")
                let imgPath = `${url}/${typePath}/${itemPath}/${img}`
            })

        })

    })
})

function createOverlay() {

}
