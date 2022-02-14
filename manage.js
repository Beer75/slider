/**
 * Manage game.
 */
class Manager {
	constructor(color_count){
		this.game=new Game(color_count);	
		this.output=new Output(this.game.field);
		
	}

	nextLevel(){
		this.game.nextLevel();
		this.output=new Output(this.game.field);
		
	}

	currentScore(){
		return this.game.score;
	}

	currentLevel(){
		return this.game.level;
	}
	
}
