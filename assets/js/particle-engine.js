class ParticleEngine {
	constructor(canvas, name){
      	this.canvas = canvas;
		this.name = name;
      	this.ctx = canvas.getContext("2d");
    	this.particles = [];
      	this.isAnimating = false;
		this.setFps(120);
    }
	setFps(fps){
		this.fps = fps;
		this.interval = 1000 / fps;
		this.time = null;
	}
  	addParticle(p){
    	this.particles.push(p);
    }
  	startAnimation(){
		if (this.isAnimating) return;
    	this.isAnimating = true;
      	requestAnimationFrame((t) => this.animate(t));
    }
  	stopAnimation(){
    	this.isAnimating = false;
    }
  	animate(t){
		if (!this.time) this.time = t;
		if (t - this.time < this.interval){
			return requestAnimationFrame((t) => this.animate(t));
		}
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      	//draw & update each particle from oldest to newest
    	for (let p of this.particles){
        	p.render(this.ctx);
          	p.update(this.canvas);
        }
      	//filter out dead particles from newest to oldest
      	for (let i=this.particles.length-1; i>=0; i--){
        	let p = this.particles[i];
          	if (!p.isAlive(this.canvas)){
            	this.particles.splice(i, 1); //remove 1 particle at index i
            }
        }
		//draw name on canvas
		if (this.particles.length) {
			this.ctx.font = "24px sans-serif";
			this.ctx.fillStyle = "white";
			this.ctx.fillText(this.name, 10, this.ctx.canvas.height - 10);
		}
      	//are there any more particles?
      	if (!this.particles.length){
			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        	this.isAnimating = false;
        }
      	//repeat animation loop
      	if (this.isAnimating){
			this.time = t;
        	requestAnimationFrame((t) => this.animate(t));
        }
		else this.time = null;
    }
}

export default ParticleEngine;
