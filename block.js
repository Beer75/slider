/**
 *  Class description of block on field
 */
	class Block {
		color;
		fcolor;
		_direction;
		html_div;
		_col;
		_row;
		constructor(col, dir, fcol){
			
			this.color=col;
			this.fcolor=fcol;
			this.direction=dir;
			// Create DIV and link to html_div
			this.html_div=document.createElement("div");
			this.html_div.classList.add("block");
			this.html_div.style.background=this.color;
			this.html_div.style.color=this.fcolor;
			this.html_div.connectedBlock=this;

		}
		
		get direction(){
			return this._direction;
		}
		
		set direction(d){
			this._direction=d;
		}
		
		disconectFromDOM(){
			this.html_div.connectedBlock=null;
		}

		set row(r){
			this._row=r;
		}
		get row(){
			return this._row;
		}
		set col(c){
			this._col=c;
		}
		get col(){
			return this._col;
		}

	}
