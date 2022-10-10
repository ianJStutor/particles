class Zap extends Particle {
	constructor(x, y){
		super(x, y);
		this.r = Math.floor(Math.random()*50)+205;
		this.g = 100;
		this.b = Math.floor(Math.random()*50)+205;
		this.a = 1;
		this.lineWidth = 2;
		this.angle = Math.random() * Math.PI * 2;
		this.maxDeltaAngle = 0.5;
		var minSpeed = 5;
		var maxSpeed = 25;
		this.speed = Math.random() * (maxSpeed - minSpeed) + minSpeed;
		this.nextX;
		this.nextY;
		this.life = 20;
	}
	update(canvas){
		if (this.nextX && this.nextY){
			this.x = this.nextX;
			this.y = this.nextY;
		}
		this.nextX = this.x + this.speed * Math.cos(this.angle);
		this.nextY = this.y + this.speed * Math.sin(this.angle);
		this.angle += Math.random() * this.maxDeltaAngle * 2 - this.maxDeltaAngle;
		this.life--;
	}
	render(ctx){
		if (this.nextX && this.nextY){
			ctx.strokeStyle = `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
			ctx.lineWidth = this.lineWidth;
			ctx.beginPath();
			ctx.moveTo(this.x, this.y);
			ctx.lineTo(this.nextX, this.nextY);
			ctx.stroke();
		}
	}
	isAlive(canvas){
		return this.life > 0;
	}
}
