import Particle from "./Particle.js";

class Bar extends Particle {

	static displayName = "Bars";

	constructor(x, y){
		super(x, 0);
        this.width = 10;
        this.x -= this.width/2;
        this.targetY = y;
        this.minHeight = 100;
        this.maxHeight = 500;
        this.height = Math.random() * (this.maxHeight - this.minHeight) + this.minHeight;
        this.minAlpha = Math.random() * 0.1;
        this.maxAlpha = 1 - Math.random() * 0.1;
        this.hue = 300;
        this.saturation = (1 - Math.random() * 0.5) * 100;
        this.lightness = 50;
        this.preTargetVY = 35;
        this.postTargetVY = 10;
    }

    update(canvas) {
        if (!this.canvasHeight) this.canvasHeight = canvas.height;
        if (this.y < this.targetY) this.y += this.preTargetVY;
        else this.y += this.postTargetVY;
    }

    render(ctx) {
        let gradient = ctx.createLinearGradient(this.x, this.y - this.height, this.x + this.width, this.y);
		gradient.addColorStop(0, `hsla(${this.hue}deg, ${this.saturation}%, ${this.lightness}%, 0)`);
		gradient.addColorStop(0.25, `hsla(${this.hue}deg, ${this.saturation}%, ${this.lightness}%, ${this.minAlpha})`);
		gradient.addColorStop(1, `hsla(${this.hue}deg, ${this.saturation}%, ${this.lightness}%, ${this.maxAlpha})`);
		ctx.fillStyle = gradient;
        ctx.fillRect(this.x, this.y - this.height, this.width, this.height);
    }

    isAlive(canvas) {
        return this.y - this.height < this.canvasHeight;
    }

}

export default Bar;
