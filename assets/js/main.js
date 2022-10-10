import * as particles from "./particles/_loader.js";

// const blob = new particles.Blob();
// console.log(blob);

const canvases = document.querySelectorAll("canvas");

for (let c of canvases) {
    c.width = c.height = 300;
}
