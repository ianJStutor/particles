import ParticleEngine from "./particle-engine.js";
import * as particles from "./particles/loader.js";

const canvases = document.querySelectorAll("canvas");
const particleSystem = {};

for (let c of canvases) {
    let id = c.id;
    particleSystem[id] = {
        canvas: c,
        particle: particles[id],
        engine: new ParticleEngine(c, particles[id].name)
    };
    c.width = c.height = 300;
    c.addEventListener("mousemove", addParticle);
    c.addEventListener("pointermove", addParticle);
    c.addEventListener("touchmove", addParticle);
}

function addParticle(e) {
    const canvas = e.target;
    const rect = canvas.getBoundingClientRect();
    const id = canvas.id;
    const x = (e.x ?? e.touches[0].x) - rect.x;
    const y = (e.y ?? e.touches[0].y) - rect.y;
    const {engine, particle} = particleSystem[id];
    const {spawnChance, spawnQuantity} = particle;
    if (!engine.particles.length || Math.random() < spawnChance) {
        for (let i=0; i<spawnQuantity; i++) {
            const p = new particle(x, y);
            engine.addParticle(p);
        }
        engine.startAnimation();
    }
}
