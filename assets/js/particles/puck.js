import Particle from "./Particle.js";

class Puck extends Particle {

	constructor(x, y){
		super(x, y);
		const maxSpeed = 10;
		this.radius = 10;
		this.r = 0;//Math.floor(Math.random()*256);
		this.g = 0;//Math.floor(Math.random()*256);
		this.b = Math.floor(Math.random()*256);
		this.a = 0.75;
		this.vx = Math.random() * maxSpeed * 2 - maxSpeed;
		this.vy = Math.random() * maxSpeed * 2 - maxSpeed;
		this.life = 100;
	}
	update(canvas){
		this.x += this.vx;
		this.y += this.vy;
		if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
		if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
		this.life--;
	}
	render(ctx){
		ctx.fillStyle = `rgba(0, 0, 0, 0.25)`;
		ctx.beginPath();
		ctx.arc(this.x + this.radius/3, this.y + this.radius/3, this.radius, 0, Math.PI*2);
		ctx.fill();
		ctx.fillStyle = `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
        ctx.beginPath();
      	ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
      	ctx.fill();
	}
	isAlive(canvas){
		return this.life > 0;
	}

}

export default Puck;
