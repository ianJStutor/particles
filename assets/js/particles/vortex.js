import Particle from "./Particle.js";

class Vortex extends Particle {

	constructor(x, y){
		super(x, y);
		this.r = 1;
        this.color = "white";
        this.minDist = 5;
        this.deltaDist = 0.5;
        this.minDeltaAngle = 0;
        this.maxDeltaAngle = Math.PI*2;
	}
	update(canvas){
		if (this.centerX === undefined && this.centerY === undefined && this.angle === undefined) {
            this.centerX = canvas.width * 0.5;
            this.centerY = canvas.height * 0.5;
            this.angle = Math.atan2(this.y - this.centerY, this.x - this.centerX);
        }
        const deltaX = this.x - this.centerX,
              deltaY = this.y - this.centerY;
        this.dist = Math.hypot(deltaX, deltaY);
        const deltaAngle = (1/this.dist) * (this.maxDeltaAngle-this.minDeltaAngle) + this.minDeltaAngle;
        this.angle += deltaAngle;
        this.dist -= this.deltaDist;
        this.x = this.centerX + Math.cos(this.angle) * this.dist;
        this.y = this.centerY + Math.sin(this.angle) * this.dist;
	}
	render(ctx){
		ctx.fillStyle = this.color;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.r, 0, Math.PI*2);
		ctx.fill();
	}
	isAlive(canvas){
		return this.dist > this.minDist;
	}

}

export default Vortex;
