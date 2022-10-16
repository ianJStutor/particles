import Particle from "./Particle.js";

class Haze extends Particle {

	constructor(x,y){
		super(x,y);
		this.color = "plum";
		var minSpeed = 1;
		var maxSpeed = 5;
		var angle = Math.random() * Math.PI * 2;
		var speed = Math.random() * (maxSpeed - minSpeed) + minSpeed;
		this.radius = Math.max(0.5, speed * 50);
		this.vx = speed * Math.cos(angle);
		this.vy = speed * Math.sin(angle);
		this.a = speed / maxSpeed / 2;
		var minLife = 80;
		var maxLife = 150;
		this.life = Math.floor(Math.random() * (maxLife-minLife) + minLife);
	}
	update(canvas){
		this.x += this.vx;
		this.y += this.vy;
		this.life--;
	}
	render(ctx){
		let gradient = ctx.createRadialGradient(this.x, this.y, 2, this.x, this.y, this.radius);
		gradient.addColorStop(0, this.color);
		gradient.addColorStop(0.95, "transparent");
		ctx.fillStyle = gradient;

		// ctx.fillStyle = this.color;
		ctx.globalAlpha = this.a;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
		ctx.fill();
		ctx.globalAlpha = 1;
	}
	isAlive(canvas){
		return this.life > 0;
	}
}

export default Haze;
