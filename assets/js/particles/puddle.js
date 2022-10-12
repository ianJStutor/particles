import Particle from "./Particle.js";

class Puddle extends Particle {

	static name = "Puddles";
	static spawnChance = 0.03;

	constructor(x, y){
		super(x, y);
		this.r = 200;
		this.g = 200;
		this.b = 200;
		this.a = 1;
		this.deltaA = -0.05; //100 frames duration
		this.radius = 5;
		this.radiusMultiplier = 1.25;
		this.lineWidth = 3;
	}
	update(canvas){
		this.a += this.deltaA;
		this.radius *= this.radiusMultiplier;
	}
	render(ctx){
		ctx.strokeStyle = `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
		ctx.lineWidth = this.lineWidth;
		ctx.beginPath();
		ctx.ellipse(this.x, this.y, this.radius, this.radius/4, 0, 0, Math.PI*2);
		ctx.stroke();
	}
	isAlive(canvas){
		return this.a > 0;
	}
}

export default Puddle;
