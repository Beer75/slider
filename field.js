/**
 *  Class description game Field. Make game logic
 */
	class Field {
		colors=["navy","blue","rgb(64,128,128)","rgb(0,128,255)","rgb(128,0,64)","rgb(255,128,0)","rgb(255,128,255)","darkgreen","rgb(255,0,0)","rgb(255,64,0)"];
		fcolors=["rgb(2,2,234)","rgb(3,3,183)","rgb(48,100,100)","rgb(0,93,185)","rgb(75,0,40)","rgb(165,80,0)","rgb(170,90,170)","rgb(1,70,1)","rgb(150,0,0)","rgb(150,32,0)"];
			
		field_size=16;
   	constructor(color_count, level){
			this.color_count=color_count;
			this.actions=[];
			this.blocks = [];

			this.colored=[];
			this.deleting=[];
			this.summary_score=0;

   		// Create blocks
			for(let r=0;r<this.field_size;r++){
			   this.blocks[r]=[];
			   this.colored[r]=[];
			   
				for(let c=0;c<this.field_size;c++){				
					this.blocks[r][c]=0;
					this.colored[r][c]=0;
					
					if(r<3 && c>2 && c<13){
						let ind=Math.round(Math.random()*this.color_count);
						this.blocks[r][c]=new Block(this.colors[ind], "down", this.fcolors[ind]);
						this.blocks[r][c].row=r;
						this.blocks[r][c].col=c;
					}
					if(r>12 && c>2 && c<13){
						let ind=Math.round(Math.random()*this.color_count);
						this.blocks[r][c]=new Block(this.colors[ind], "up", this.fcolors[ind]);
						this.blocks[r][c].row=r;
						this.blocks[r][c].col=c;
					}
					if(c<3 && r>2 && r<13){
						let ind=Math.round(Math.random()*this.color_count);
						this.blocks[r][c]=new Block(this.colors[ind], "right", this.fcolors[ind]);
						this.blocks[r][c].row=r;
						this.blocks[r][c].col=c;
					}
					if(c>12 && r>2 && r<13){
						let ind=Math.round(Math.random()*this.color_count);
						this.blocks[r][c]=new Block(this.colors[ind], "left", this.fcolors[ind]);
						this.blocks[r][c].row=r;
						this.blocks[r][c].col=c;
					}
 				}
			} 
			let R, C;
			for(let i=1; i<=5+level; i++){
				// fixed block on field
				do{
					R=3+Math.round(Math.random()*10);
					C=3+Math.round(Math.random()*10);
				}while(this.blocks[R][C]!=0);
				this.blocks[R][C]=new Block(this.colors[Math.round(Math.random()*this.color_count)], "non");
				this.blocks[R][C].row=R;
				this.blocks[R][C].col=C;
			} 			

		}

		is_clear(){
			let isClear=true;
			for(let r=3;r<this.field_size-3;r++){
				for(let c=3;c<this.field_size-3;c++){
					if(this.blocks[r][c]!=0)	
						isClear=false;
				}
			}

			return isClear;
		}

		can_click(block){
			// check move for click
			let R=block.row;
			let C=block.col;
			if( !(((R==2 || R==13) && C>2 && C<13) || ((C==2 || C==13) && R>2 && R<13)) ){
				return false;
			}

			let DIR=block.direction;
			let can=false;

			let i=1;
			if(DIR=="right"){
				while(this.blocks[R][C+i]==0){
					i++;
				}
			}
			if(DIR=="left"){
				while(this.blocks[R][C-i]==0){
					i++;
				}
			}
			if(DIR=="down"){
				while(this.blocks[R+i][C]==0){
					i++;
				}
			}
			if(DIR=="up"){
				while(this.blocks[R-i][C]==0){
					i++;
				}
			}
			if(i>1 && i<11)
				can=true;

			return can;
		}

		click(block){
			let can=this.can_click(block);
			if(!can)
				return false;
			
			let R=block.row;
			let C=block.col;
			let DIR=block.direction;
	
			// Вывести блок на поле
			if(DIR=="down"){
				if(this.blocks[R+1][C]==0)
					this.blocks[R][C].row=R+1;	
					this.blocks[R+1][C]=this.blocks[R][C];
					let action=new Action(this.blocks[R+1][C], R, R+1);
					this.actions.push(action);
					this.blocks[R][C]=0;	
			}
			if(DIR=="up"){
				if(this.blocks[R-1][C]==0)
					this.blocks[R][C].row=R-1;	
					this.blocks[R-1][C]=this.blocks[R][C];
					let action=new Action(this.blocks[R-1][C], R, R-1);
					this.actions.push(action);
					this.blocks[R][C]=0;	
			}
			if(DIR=="right"){
				if(this.blocks[R][C+1]==0)
					this.blocks[R][C].col=C+1;	
					this.blocks[R][C+1]=this.blocks[R][C];
					let action=new Action(this.blocks[R][C+1], C, C+1);
					this.actions.push(action);
					this.blocks[R][C]=0;	
					
			}
			if(DIR=="left"){
				if(this.blocks[R][C-1]==0)
					this.blocks[R][C].col=C-1;	
					this.blocks[R][C-1]=this.blocks[R][C];
					let action=new Action(this.blocks[R][C-1], C, C-1);
					this.actions.push(action);
					this.blocks[R][C]=0;	

			}

			this.check_stability();
			
		}

		check_stability(){
			// ЦИКЛ
			// 	Пока есть нестабильные блоки
			//    Двигаем их
			let DIR;
			let action;
			let was_moved=1;
			while(was_moved){
			while(was_moved){
				was_moved=0;
				for(let r=0;r<this.field_size;r++){
					for(let c=0;c<this.field_size;c++){	
						// Если есть место на краю, то заполняем
						if(this.blocks[r][c]==0 && (((r==0 || r==15) && c>2 && c<13) || ((c==0 || c==15) && r>2 && r<13)) ){
							if(r==0)
								DIR="down";
							if(r==15)
								DIR="up";
							if(c==0)
								DIR="right";
							if(c==15)
								DIR="left";
							let ind=Math.round(Math.random()*this.color_count);
							this.blocks[r][c]=new Block(this.colors[ind], DIR, this.fcolors[ind]);
							this.blocks[r][c].row=r;
							this.blocks[r][c].col=c;
							action=new Action(this.blocks[r][c]);
							action.isnew=1;
							this.actions.push(action);
						}
						DIR=this.blocks[r][c].direction;

						if(DIR=="right" && this.blocks[r][c+1]==0 && c!=2){
							this.blocks[r][c+1]=this.blocks[r][c];
							this.blocks[r][c]=0;
							this.blocks[r][c+1].col=c+1;
							action=new Action(this.blocks[r][c+1], c, c+1);
							this.actions.push(action);
							was_moved=1;
						}
						if(DIR=="right" && c==12){
							action=new Action(this.blocks[r][15]);
							action.isdel=1;
							this.actions.push(action);	
							this.blocks[r][15]=0;	

							this.blocks[r][15]=this.blocks[r][14];
							this.blocks[r][15].col=15;
							action=new Action(this.blocks[r][15], 14, 15);
							action.isreverce=1;
							this.actions.push(action);
							
							this.blocks[r][14]=this.blocks[r][13];
							this.blocks[r][14].col=14;
							action=new Action(this.blocks[r][14], 13, 14);
							action.isreverce=1;
							this.actions.push(action);

							this.blocks[r][13]=this.blocks[r][12];
							this.blocks[r][13].col=13;
							this.blocks[r][13].direction="left";
							action=new Action(this.blocks[r][13], 12, 13);
							action.isreverce=1;
							this.actions.push(action);

							this.blocks[r][12]=0;

							was_moved=1;
						}
						if(DIR=="left" && this.blocks[r][c-1]==0 && c!=13){
							this.blocks[r][c-1]=this.blocks[r][c];
							this.blocks[r][c]=0;
							this.blocks[r][c-1].col=c-1;
							action=new Action(this.blocks[r][c-1], c, c-1);
							this.actions.push(action);
							was_moved=1;
						}
						if(DIR=="left" && c==3){
							action=new Action(this.blocks[r][0]);
							action.isdel=1;
							this.actions.push(action);	
							this.blocks[r][0]=0;	

							this.blocks[r][0]=this.blocks[r][1];
							this.blocks[r][0].col=0;
							action=new Action(this.blocks[r][0], 1, 0);
							action.isreverce=1;
							this.actions.push(action);
							
							this.blocks[r][1]=this.blocks[r][2];
							this.blocks[r][1].col=1;
							action=new Action(this.blocks[r][1], 2, 1);
							action.isreverce=1;
							this.actions.push(action);

							this.blocks[r][2]=this.blocks[r][3];
							this.blocks[r][2].col=2;
							this.blocks[r][2].direction="right";
							action=new Action(this.blocks[r][2], 3, 2);
							action.isreverce=1;
							this.actions.push(action);

							this.blocks[r][3]=0;
							was_moved=1;
						}
						if(DIR=="down" && this.blocks[r+1][c]==0 && r!=2){
							this.blocks[r+1][c]=this.blocks[r][c];
							this.blocks[r+1][c].row=r+1;
							this.blocks[r][c]=0;
							action=new Action(this.blocks[r+1][c], r, r+1);
							this.actions.push(action);
							was_moved=1;
							
						}
						if(DIR=="down" && r==12){
							action=new Action(this.blocks[15][c]);
							action.isdel=1;
							this.actions.push(action);	
							this.blocks[15][c]=0;	

							this.blocks[15][c]=this.blocks[14][c];
							this.blocks[15][c].row=15;
							action=new Action(this.blocks[15][c], 14, 15);
							action.isreverce=1;
							this.actions.push(action);
							
							this.blocks[14][c]=this.blocks[13][c];
							this.blocks[14][c].row=14;
							action=new Action(this.blocks[14][c], 13, 14);
							action.isreverce=1;
							this.actions.push(action);

							this.blocks[13][c]=this.blocks[12][c];
							this.blocks[13][c].row=13;
							this.blocks[13][c].direction="up";
							action=new Action(this.blocks[13][c], 12, 13);
							action.isreverce=1;
							this.actions.push(action);

							this.blocks[12][c]=0;

							was_moved=1;
							
						}
						if(DIR=="up" && this.blocks[r-1][c]==0 && r!=13){
							this.blocks[r-1][c]=this.blocks[r][c];
							this.blocks[r][c]=0;
							this.blocks[r-1][c].row=r-1;
							action=new Action(this.blocks[r-1][c], r, r-1);
							this.actions.push(action);
							was_moved=1;
						}
						if(DIR=="up" && r==3){
							action=new Action(this.blocks[0][c]);
							action.isdel=1;
							this.actions.push(action);	
							this.blocks[0][c]=0;	

							this.blocks[0][c]=this.blocks[1][c];
							this.blocks[0][c].row=0;
							action=new Action(this.blocks[0][c], 1, 0);
							action.isreverce=1;
							this.actions.push(action);
							
							this.blocks[1][c]=this.blocks[2][c];
							this.blocks[1][c].row=1;
							action=new Action(this.blocks[1][c], 2, 1);
							action.isreverce=1;
							this.actions.push(action);

							this.blocks[2][c]=this.blocks[3][c];
							this.blocks[2][c].row=2;
							this.blocks[2][c].direction="down";
							action=new Action(this.blocks[2][c], 3, 2);
							action.isreverce=1;
							this.actions.push(action);

							this.blocks[3][c]=0;

							was_moved=1;
						}
					} //for(let c=0;c<this.field_size;c++){	
				} //for(let r=0;r<this.field_size;r++){
			}

			// 	Смотрим Есть ли удаляемые
			for(let r=3;r<this.field_size-3;r++){
				for(let c=3;c<this.field_size-3;c++){
					if(this.blocks[r][c]!=0)	
						was_moved+=this.check_delete(this.blocks[r][c]);
				}
			}


			}

			
			
		}

		// Check and delete blocks
		check_delete(block){
			let R=block.row;
			let C=block.col;
			let color=block.color;
			let action;
			this.deleting.length=0;
			let was_del=0;
			for(let r=0;r<this.field_size;r++)
				for(let c=0;c<this.field_size;c++)
					this.colored[r][c]=0;
			this.find_path(R,C,color);

			// quantity blocks
			if(this.deleting.length>2){
				this.deleting.forEach(delblock => {
					action=new Action(delblock);
					action.isdel=1;
					this.summary_score++;
					this.actions.push(action);	
					//delblock.html_div=null;
					this.blocks[delblock.row][delblock.col]=0;	
				});
				was_del=1;
			}
			
			return was_del;
		}

		find_path(R,C,color){
			if(this.colored[R][C]==0 && this.blocks[R][C].color==color){
				this.colored[R][C]=1;
				this.deleting.push(this.blocks[R][C]);
				if(R>3)
					this.find_path(R-1,C,color);
				if(R<12)
					this.find_path(R+1,C,color);
				if(C>3)
					this.find_path(R,C-1,color);
				if(C<12)
					this.find_path(R,C+1,color);
			}
			else{
				return;
			}
		}
		
	}
