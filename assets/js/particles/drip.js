import Particle from "./Particle.js";

class Drip extends Particle {

	static displayName = "Drips";
	static spawnChance = 0.1;

	constructor(x, y){
    	super(x, y);
      	this.originX = x;
      	this.originY = y;
      	this.freeFall = false;
      	this.dripVy = 8;
      	this.freeFallVy = 10;
		this.freeFallAccY = 1.03;
      	this.dripAccY = 0.95 + Math.random()/25;
      	this.dripMinVy = 1.5;
      	this.radius = 5;
      	this.life = 150;
		this.color = "crimson";
		this.specularColor = "pink";
    }
  	update(canvas){
    	if (this.freeFall){
        	this.y += this.freeFallVy;
			this.freeFallVy *= this.freeFallAccY;
        }
      	else {
        	if (this.dripVy < this.dripMinVy){
            	this.freeFall = true;
            }
          	else {
            	this.y += this.dripVy;
              	this.dripVy *= this.dripAccY;
            }
        }
    }
  	render(ctx){
    	ctx.fillStyle = this.color;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
		ctx.fill();
		if (!this.freeFall){
			let controlY = this.y-((this.y-this.originY)/3);
			ctx.beginPath();
			ctx.moveTo(this.x-this.radius, this.y);
			ctx.quadraticCurveTo(this.x, controlY, this.originX, this.originY);
			ctx.quadraticCurveTo(this.x, controlY, this.x+this.radius, this.y);
			ctx.closePath();
			ctx.fill();
		}
		ctx.fillStyle = this.specularColor;
		ctx.beginPath();
		ctx.arc(this.x+this.radius/2, this.y-this.radius/5, this.radius/5, 0, Math.PI*2);
		ctx.fill();
    }
  	isAlive(canvas){
    	return --this.life >= 0;
    }

}

export default Drip;
