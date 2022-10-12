//interface Particle

class Particle {
	constructor(x, y){
    	this.x = x;
      	this.y = y;
    }
	update(canvas){}
	render(ctx){}
	isAlive(canvas){ return true; }

	static spawnQuantity = 1;
	static spawnChance = 1;
	static name = "Particles";
}

export default Particle;
