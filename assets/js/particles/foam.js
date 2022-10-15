import Particle from "./Particle.js";

class Foam extends Particle {

	static spawnQuantity = 10;

	constructor(x,y){
		var scatter = 20;
		x += Math.random() * scatter * 2 - scatter;
		y += Math.random() * scatter * 2 - scatter;
		super(x,y);
		var minSize = 10;
		var maxSize = 25;
		this.size = Math.random() * (maxSize-minSize) + minSize;
		this.maxLife = 100;
		this.minLife = 50;
		this.life = Math.random() * (this.maxLife - this.minLife) + this.minLife;
	}
	update(canvas){
		this.life--;
	}
	render(ctx){
		let gradient = ctx.createRadialGradient(this.x, this.y, 2, this.x, this.y, this.size);
		gradient.addColorStop(0, "white");
		gradient.addColorStop(0.25, "lightblue");
		gradient.addColorStop(0.95, "transparent");
		ctx.globalCompositeOperation = "lighten";
		ctx.fillStyle = gradient;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
		ctx.fill();
		ctx.globalCompositeOperation = "source-over";
	}
	isAlive(canvas){
		return this.life > 0;
	}
}

export default Foam;
