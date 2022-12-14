import Particle from "./Particle.js";

class PartyPop extends Particle {

	static displayName = "Party Pops";
	static spawnChance = 0.05;
	static spawnQuantity = 50;

	constructor(x, y){
		super(x, y);
      	this.radius = 3;
      	this.hue = Math.floor(Math.random() * 360);
		this.a = 1;
      	let angle = Math.random() * Math.PI * 2;
      	let minSpeed = 4;
      	let maxSpeed = 10;
      	let velocity = Math.random() * (maxSpeed - minSpeed) + minSpeed;
      	//once you have angle and velocity, you can find deltaX and deltaY
      	this.deltaX = velocity * Math.cos(angle);
      	this.deltaY = velocity * Math.sin(angle);
    }

	update(canvas){
 		this.a -= .02;
    	this.x += this.deltaX;
      	this.y += this.deltaY;
		this.deltaY += 0.5;
    }
	render(ctx){
      	ctx.fillStyle = `hsla(${this.hue}deg, 100%, 50%, ${this.a})`;
        ctx.beginPath();
      	ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
      	ctx.fill();
    }
	isAlive(canvas){
      	//kill sparkle if it moves off canvas to the right
    	//return this.x + this.defaults.radius < canvas.width;
      	return this.a > 0;
    }
}

export default PartyPop;
