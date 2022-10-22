import Particle from "./Particle.js";

class Bubble extends Particle {

	static displayName = "Bubbles";
	static spawnChance = 0.5;

	constructor(x,y){
		var xScatter = 10;
		x += Math.random() * xScatter * 2 - xScatter;
		super(x,y);
		var minSize = 10;
		var maxSize = 25;
		this.size = Math.random() * (maxSize-minSize) + minSize;
		var minAngle = -Math.PI/4;
		var maxAngle = -Math.PI*3/4;
		var angle = Math.random() * (maxAngle - minAngle) + minAngle;
		this.vy = this.size/3 * Math.sin(angle);
		this.vx = this.size/6 * Math.cos(angle);
		this.life = 100;
	}
	update(canvas){
		this.x += this.vx;
		this.y += this.vy;
		this.life--;
	}
	render(ctx){
		const {x, y, size} = this;
		ctx.strokeStyle = "#aaa";
		ctx.beginPath();
		ctx.arc(x, y, size, Math.PI/6, Math.PI*7/6);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(x, y, size*4/5, -Math.PI/3, -Math.PI/6);
		ctx.stroke();
		ctx.strokeStyle = "#666";
		ctx.beginPath();
		ctx.arc(x, y, size, Math.PI*7/6, Math.PI/6);
		ctx.stroke();
	}
	isAlive(canvas){
		return this.life > 0;
	}
}

export default Bubble;
