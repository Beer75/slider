class Game {
	level=1;
   	
	constructor(color_count){	
		this.level=1;
		this.field=new Field(color_count,this.level);
		this.output=new Output(this.field);
	}
}
