class Game {
	level=1;
   	colors;

	constructor(color_count){	
		this.level=1;
		this.colors=color_count;
		this.field=new Field(color_count,this.level);
		this.output=new Output(this.field);
	}

	nextLevel(){
		this.level++;
		this.field=new Field(this.colors,this.level);
		this.output=new Output(this.field);

	}
}
