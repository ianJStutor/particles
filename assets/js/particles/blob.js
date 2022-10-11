import Particle from "./Particle.js";

class Blob extends Particle {

	static spawnChance = 0.04;

	constructor(x,y){
		super(x,y);
		const numPoints = 5;
		this.angle = Math.random() * Math.PI * 2;
		const speed = 1;
		this.vx = speed * Math.cos(this.angle);
		this.vy = speed * Math.sin(this.angle);
		const deltaAngle = Math.PI*2/numPoints;
		const minRadius = 20;
		const maxRadius = 25;
		this.points = [];
		for (let i=0; i<numPoints; i++){
			let radius = Math.random() * (maxRadius - minRadius) + minRadius;
			this.points.push(
				this.x + radius * Math.cos(i*deltaAngle+this.angle),
				this.y + radius * Math.sin(i*deltaAngle+this.angle)
			);
		}
		this.longestRadius = minRadius;
		this.r = Math.floor(Math.random() * 56) + 200;
		this.g = 143;
		this.b = 143;
		this.a = 1;
		this.strokeStyle = "rgba(255,255,255,0.25)";
		this.lineWidth = 1;
		this.tension = 0.8;
		this.numSegments = 30;
		this.closedLoop = true;
		this.wiggle = 1;
		this.wiggleChance = 0.5;
		this.life = 150;
	}
	update(canvas){
		this.x += this.vx;
		this.y += this.vy;
		for (let i=0; i<this.points.length; i++){
			if (i%2) this.points[i] += this.vy;
			else this.points[i] += this.vx;
			if (Math.random() >= this.wiggleChance) continue;
			this.points[i] += Math.random() * this.wiggle * 2 - this.wiggle;
			if (i%2){
				let radius = Math.hypot(this.x-this.points[i-1], this.y-this.points[i]);
				if (radius > this.longestRadius) this.longestRadius = radius;
			}
		}
		this.life--;
	}
	render(ctx){
		let gradient = ctx.createRadialGradient(this.x, this.y, this.longestRadius/200, this.x, this.y, this.longestRadius);
		gradient.addColorStop(0, "white");
		gradient.addColorStop(0.9, `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`);
		let splinePoints = this.cSpline(this.points, this.tension, this.numSegments, this.closedLoop);
		ctx.fillStyle = gradient;
		ctx.strokeStyle = this.strokeStyle;
		ctx.lineWidth = this.lineWidth;
		ctx.beginPath();
		ctx.moveTo(splinePoints[0], splinePoints[1]);
		for (let i=2; i<splinePoints.length; i+=2){
			ctx.lineTo(splinePoints[i], splinePoints[i+1]);
		}
		ctx.fill();
		ctx.stroke();
	}
	isAlive(canvas){
		return this.life > 0;
	}
	cSpline(n,r,t,u){
		//https://github.com/stbaer/cardinal-spline/blob/master/index.js
		var f;r="number"==typeof r?r:.5,t=t||25;var h,e,s,i,o,a,l=1,p=n.length,c=0,v=new Float32Array((p-2)*t+2+(u?2*t:0)),y=new Float32Array(4*(t+2)),g=4;for(f=n.slice(0),u?(f.unshift(n[p-1]),f.unshift(n[p-2]),f.push(n[0],n[1])):(f.unshift(n[1]),f.unshift(n[0]),f.push(n[p-2],n[p-1])),y[0]=1;l<t;l++)i=2*(s=(e=(h=l/t)*h)*h),o=3*e,y[g++]=i-o+1,y[g++]=o-i,y[g++]=s-2*e+h,y[g++]=s-e;return y[++g]=1,(a=function(n,u,f){for(var h,e,s,i,o,a,l,p,y,g,w,A,F,b,m=2;m<f;m+=2)for(e=n[m],s=n[m+1],i=n[m+2],o=n[m+3],a=(i-n[m-2])*r,l=(o-n[m-1])*r,p=(n[m+4]-e)*r,y=(n[m+5]-s)*r,h=0;h<t;h++)w=u[g=h<<2],A=u[g+1],F=u[g+2],b=u[g+3],v[c++]=w*e+A*i+F*a+b*p,v[c++]=w*s+A*o+F*l+b*y})(f,y,p),u&&((f=[]).push(n[p-4],n[p-3],n[p-2],n[p-1]),f.push(n[0],n[1],n[2],n[3]),a(f,y,4)),p=u?0:n.length-2,v[c++]=n[p],v[c]=n[p+1],v}
}

export default Blob;
