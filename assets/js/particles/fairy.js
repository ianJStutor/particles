import Particle from "./Particle.js";

class Fairy extends Particle {

	static displayName = "Fairies";

	constructor(x, y){
		super(x, y);
		this.life = 100;
		this.angle = Math.random();
		this.deltaAngle = (Math.random() - 0.5) / 5;
		this.radius = Math.floor(Math.random() * 10) + 10;
		this.lineDash = [Math.random()/4, Math.random()+1];
	}
	update(canvas){
		this.angle += this.deltaAngle;
		this.x += 5 * Math.cos(this.angle);
		this.y += 2 * Math.sin(this.angle);
		this.radius = Math.max(1, this.radius + Math.sin(this.angle)/5);
	}
	render(ctx){
		ctx.save();
		ctx.translate(this.x, this.y);
		ctx.rotate(this.angle);
		ctx.fillStyle = "rgba(102,51,153,0.25)";
		ctx.strokeStyle = "rgba(255,255,0,0.05)";
		ctx.lineWidth = 15;
		ctx.beginPath();
		ctx.arc(0, 0, this.radius/4, 0, Math.PI*2);
		ctx.fill();
		ctx.stroke();
		if (Math.random() < 0.5){
			ctx.strokeStyle = `rgba(255,255,255,${Math.random()})`;
			ctx.lineWidth = this.radius;
			ctx.setLineDash(this.lineDash);
			ctx.beginPath();
			ctx.arc(0, 0, 1, 0, Math.PI*2);
			ctx.stroke();
			ctx.setLineDash([]);
		}
		else {
			ctx.fillStyle = "rgba(255,255,100,0.25)";
			ctx.beginPath();
			ctx.arc(0, 0, this.radius/5, 0, Math.PI*2);
			ctx.fill();
		}
		ctx.restore();
	}
	isAlive(canvas){
		return --this.life >= 0;
	}
}

export default Fairy;
