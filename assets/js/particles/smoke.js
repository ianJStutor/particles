import Particle from "./Particle.js";

class Smoke extends Particle {

	static spawnQuantity = 10;

	constructor(x,y){
		var scatter = 15;
		x += Math.random() * scatter * 2 - scatter;
		y += Math.random() * scatter * 2 - scatter;
		super(x,y);
		var minSize = 30;
		var maxSize = 35;
		this.size = Math.random() * (maxSize-minSize) + minSize;
		var minAngle = -Math.PI/4;
		var maxAngle = -Math.PI*3/4;
		var angle = Math.random() * (maxAngle - minAngle) + minAngle;
		this.vy = this.size/9 * Math.sin(angle);
		this.vx = this.size/14 * Math.cos(angle);
		this.maxLife = 50;
		this.minLife = 10;
		this.life = Math.random() * (this.maxLife - this.minLife) + this.minLife;
	}
	update(canvas){
		this.x += this.vx;
		this.y += this.vy;
		this.life--;
	}
	render(ctx){
		let gradient = ctx.createRadialGradient(this.x, this.y, 2, this.x, this.y, this.size);
		gradient.addColorStop(0, `rgba(200, 200, 200, ${this.life/this.maxLife})`);
		gradient.addColorStop(0.95, "rgba(175, 175, 175, 0)");
		ctx.fillStyle = gradient;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
		ctx.fill();
	}
	isAlive(canvas){
		return this.life > 0;
	}
}

export default Smoke;
