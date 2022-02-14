/**
 * Manage game.
 */
class Game {
	level=1;
   	colors;
	_score=0;

	constructor(color_count){	
		this.level=1;
		this.score=0;
		this.colors=color_count;
		this.field=new Field(color_count,this.level);
		
	}

	nextLevel(){
		this.score+=this.field.summary_score;
		this.score+=100;
		this.level++;
		this.field=new Field(this.colors,this.level);
		
	}

	get score(){
		this._score+=this.field.summary_score;
		this.field.summary_score=0;
		return this._score;
	}

	set score(s){
		this._score=s;
	}

}
