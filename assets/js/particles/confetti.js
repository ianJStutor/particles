class Confetti extends Particle {
	constructor(x, y){
		var xScatter = 10,
			yScatter = 5;
		x += Math.random() * xScatter * 2 - xScatter;
		y += Math.random() * yScatter * 2 - yScatter;
		super(x, y);
		this.color = "#" + Math.floor(Math.random() * 0xffffff);
		this.size = 10;
		this.horizSpeed = 10;
		this.vertSpeed = 2;
	}
	update(canvas){
		this.x += Math.random() * this.horizSpeed - this.horizSpeed/2;
		this.y += this.vertSpeed;
		this.vertSpeed += Math.random() - 0.25;
	}
	render(ctx){
		ctx.fillStyle = this.color;
		ctx.save();
		ctx.translate(this.x, this.y);
		ctx.scale(Math.random(), Math.random());
		ctx.fillRect(-this.size/2, -this.size/2, this.size, this.size);
		ctx.restore();
	}
	isAlive(canvas){
		return this.y + this.size < canvas.height;
	}
}
