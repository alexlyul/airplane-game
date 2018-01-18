/**
 * Contains all current pressed buttons
 * @type {Array}
 */
let DOWNBUTTONS = [];
window.onkeydown = function (e) {
    const key = e.keyCode ? e.keyCode : e.which;
    if(!DOWNBUTTONS.includes(key)) {
        DOWNBUTTONS.push(key);
    }
};

window.onkeyup = function (e) {
    DOWNBUTTONS = DOWNBUTTONS.filter((keyItem) => {
        return keyItem !== (e.keyCode ? e.keyCode : e.which);
    });
};