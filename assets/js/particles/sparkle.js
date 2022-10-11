import Particle from "./Particle.js";

class Sparkle extends Particle {

	static spawnQuantity = 30;

	constructor(x, y){
		super(x, y);
		var minScatter = 2,
			maxScatter = 5,
			scatter = Math.random() * (maxScatter - minScatter) + minScatter,
			angle = Math.random() * Math.PI * 2;
		this.vx = scatter * Math.cos(angle);
		this.vy = scatter * Math.sin(angle);
		this.r = Math.floor(Math.random() * 25 + 231);
		this.g = this.r;
		this.b = 0;
		this.a = 0.25;
		this.radius = 3;
		this.renderChance = 0.4;
		this.life = 50;
	}
	update(canvas){
		this.x += this.vx;
		this.y += this.vy;
		this.life--;
	}
	render(ctx){
		if (Math.random() >= this.renderChance) return;
		ctx.fillStyle = `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
		ctx.fill();
		ctx.fillStyle = "white";
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius/2, 0, Math.PI*2);
		ctx.fill();
	}
	isAlive(canvas){
		return this.life > 0;
	}

}

export default Sparkle;
