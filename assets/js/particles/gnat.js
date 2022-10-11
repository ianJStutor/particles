import Particle from "./Particle.js";

class Gnat extends Particle {
	constructor(x,y){
		super(x,y);
		this.r = 150;
		this.g = 150;
		this.b = 150;
		this.a = 1;
		this.radius = 2;
		this.maxAngleJitter = 0.3;
		this.xAngle = Math.random() * Math.PI*2;
		this.yAngle = Math.random() * Math.PI*2;
		var minDeltaAngle = 0.1;
		var maxDeltaAngle = 0.8;
		this.deltaAngle = Math.random() * (maxDeltaAngle - minDeltaAngle) + minDeltaAngle;
		if (Math.random() < 0.5) this.deltaAngle *= -1;
		var minSpeed = 5;
		var maxSpeed = 8;
		this.speed = Math.random() * (maxSpeed - minSpeed) + minSpeed;
		var minLife = 80;
		var maxLife = 150;
		this.life = Math.floor(Math.random() * (maxLife-minLife) + minLife);
	}
	update(canvas){
		this.x += this.speed * Math.cos(this.xAngle);
		this.y += this.speed * Math.sin(this.yAngle);
		this.xAngle += this.deltaAngle + Math.random() * this.maxAngleJitter * 2 - this.maxAngleJitter;
		this.yAngle += this.deltaAngle + Math.random() * this.maxAngleJitter * 2 - this.maxAngleJitter;
		this.life--;
	}
	render(ctx){
		ctx.fillStyle = `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
		ctx.fill();
	}
	isAlive(canvas){
		return this.life > 0;
	}
}

export default Gnat;
