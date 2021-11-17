import { getData } from "./data.js";
import { generateRandomNumber } from "./helpers.js";

console.log('before getData');
let arrayOfData = await getData();
console.log('after getData');

let canvas;
let ctx;
let mousedown = false;
let randomNumber = 0;

function addEventListeners() {
    //Resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    // Mouse events
    window.addEventListener('mousedown', e => {
        mousedown = true;
        randomNumber = generateRandomNumber(arrayOfData.length);
        placeImage(e, arrayOfData[randomNumber]);
    })
    window.addEventListener('mouseup', () => {
        mousedown = false;
    })
    window.addEventListener('mousemove', e => {
        if (mousedown) {
            placeImage(e, arrayOfData[randomNumber]);
        }
    })
}
function placeImage(e, image) {
    var x = e.clientX;
    var y = e.clientY;
    
    var img = document.createElement('img');
    img.src = image.src.small; // Make this dynamic
    let divider = image.height / 250;
    img.width = image.width / divider;
    img.height = image.height / divider;
    
    setTimeout(() => {
        ctx.drawImage(img, x - (img.width / 2), y - (img.height / 2), img.width, img.height);
    }, 100);
    
}
function initExplore() {
    console.log('initExplore()');
    canvas = document.getElementById("playground");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx = canvas.getContext("2d");
    
    addEventListeners()    
}

initExplore();