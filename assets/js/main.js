import ParticleEngine from "./particle-engine.js";
import * as particles from "./particles/_loader.js";

// const blob = new particles.Blob();
// console.log(blob);

const canvases = document.querySelectorAll("canvas");

const particleSystem = {};

for (let c of canvases) {
    let id = c.id;
    particleSystem[id] = {
        canvas: c,
        particle: particles[id],
        engine: new ParticleEngine(c)
    };
    c.width = c.height = 300;
    c.addEventListener("mousemove", addParticle);
    c.addEventListener("pointermove", addParticle);
    c.addEventListener("touchmove", addParticle);
}

function addParticle(e) {
    const canvas = e.target;
    const id = canvas.id;
    const x = (e.x ?? e.touches[0].x) - canvas.offsetLeft;
    const y = (e.y ?? e.touches[0].y) - canvas.offsetTop;
    const system = particleSystem[id];
    const p = new system.particle(x, y);
    const engine = system.engine;
    engine.addParticle(p);
    engine.startAnimation();
}
