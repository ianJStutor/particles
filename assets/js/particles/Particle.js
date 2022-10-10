//interface Particle

class Particle {
	constructor(x, y){
    	this.x = x;
      	this.y = y;
    }
	update(canvas){}
	render(ctx){}
	isAlive(canvas){ return true; }
}

export default Particle;
