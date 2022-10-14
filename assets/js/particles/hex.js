import Particle from "./Particle.js";

class Hex extends Particle {

	static displayName = "Hexes";
	static spawnChance = 0.25;

	constructor(x, y){
		super(x, y);
		this.hue = 51;
		this.sat = 100;
		this.lit = 100;
		this.deltaLit = -1;
		this.tailLength = 20;
		this.tail = [];
		this.lineWidth = 2;
		this.angle = Math.floor(Math.random() * 6) * (Math.PI/3);
		this.hexLength = 30;
		this.lastTurn = {x, y};
		this.speed = 10;
	}
	update(canvas){
		this.tail.unshift({x: this.x, y: this.y});
		this.tail = this.tail.slice(0, this.tailLength);
		this.lit += this.deltaLit;
		this.x += this.speed * Math.cos(this.angle);
		this.y += this.speed * Math.sin(this.angle);
		const dist = Math.hypot(this.x - this.lastTurn.x, this.y - this.lastTurn.y);
		if (dist >= this.hexLength) {
			this.lastTurn = {x: this.x, y: this.y};
			const rand = Math.random() < 0.5 ? 1 : -1;
			this.angle += rand * (Math.PI/3);
		}
	}
	render(ctx){
		for (let i=0; i<this.tail.length-1; i++) {
			let p = this.tail[i];
			let p1 = this.tail[i+1];
			ctx.strokeStyle = `hsl(${this.hue}deg, 100%, ${Math.max(0, this.lit-i)}%)`;
			ctx.lineWidth = this.lineWidth;
			ctx.beginPath();
			ctx.moveTo(p.x, p.y);
			ctx.lineTo(p1.x, p1.y);
			ctx.stroke();
		}
	}
	isAlive(canvas){
		return this.lit > 0;
	}

}

export default Hex;
