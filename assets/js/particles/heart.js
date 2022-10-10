class Heart extends Particle {
	constructor(x,y){
		var xScatter = 10;
		x += Math.random() * xScatter * 2 - xScatter;
		super(x,y);
		var minSize = 10;
		var maxSize = 25;
		this.size = Math.random() * (maxSize-minSize) + minSize;
		var minAngle = -Math.PI/4;
		var maxAngle = -Math.PI*3/4;
		var angle = Math.random() * (maxAngle - minAngle) + minAngle;
		this.vy = this.size/3 * Math.sin(angle);
		this.vx = this.size/6 * Math.cos(angle);
		this.life = 25;
	}
	update(canvas){
		this.x += this.vx;
		this.y += this.vy;
		this.life--;
	}
	render(ctx){
		let x = this.x;
		let y = this.y;
		let s = this.size;
		ctx.fillStyle = "red";
		ctx.strokeStyle = "white";
		ctx.beginPath();
		ctx.moveTo(x,y+s*0.3);
		ctx.bezierCurveTo(x, y, x-s*0.5, y, x-s*0.5, y+s*0.3);
		ctx.bezierCurveTo(x-s*0.5, y+s*0.65, x, y+s*0.65, x, y+s);
		ctx.bezierCurveTo(x, y+s*0.65, x+s*0.5, y+s*0.65, x+s*0.5, y+s*0.3);
		ctx.bezierCurveTo(x+s*0.5, y, x, y, x, y+s*0.3);
		ctx.closePath();
		ctx.fill();
		ctx.stroke();
	}
	isAlive(canvas){
		return this.life > 0;
	}
}
