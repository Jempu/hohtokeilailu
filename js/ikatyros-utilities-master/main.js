
// If the current page is the 'index.html' or 'index.php'
function isIndex() {
    let loc = window.location.pathname.split('/')[2];
    return loc == '' || loc == 'index.html' || loc == 'index.php';
}

// Get the global path (gp) either from '.../project/index.html' or '.../project/folder/index.html'
function gp(isRoot = false) {
    return isIndex() || isRoot ? './' : '../';
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
