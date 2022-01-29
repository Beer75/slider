
	class Field {
		colors=["navy","darkgreen","blue","rgb(64,128,128)","rgb(0,128,255)","rgb(128,0,64)","rgb(255,128,0)","rgb(255,128,255)","rgb(255,0,0)"];
			
		field_size=16;
   	constructor(color_count, level){
			this.color_count=color_count;
			this.actions=[];
			this.blocks = [];

   		// Create blocks
			for(let r=0;r<this.field_size;r++){
			   this.blocks[r]=[];
				for(let c=0;c<this.field_size;c++){				
					this.blocks[r][c]=0;
					if(r<3 && c>2 && c<13){
						this.blocks[r][c]=new Block(this.colors[Math.round(Math.random()*this.color_count)], "down");
						this.blocks[r][c].row=r;
						this.blocks[r][c].col=c;
					}
					if(r>12 && c>2 && c<13){
						this.blocks[r][c]=new Block(this.colors[Math.round(Math.random()*this.color_count)], "up");
						this.blocks[r][c].row=r;
						this.blocks[r][c].col=c;
					}
					if(c<3 && r>2 && r<13){
						this.blocks[r][c]=new Block(this.colors[Math.round(Math.random()*this.color_count)], "right");
						this.blocks[r][c].row=r;
						this.blocks[r][c].col=c;
					}
					if(c>12 && r>2 && r<13){
						this.blocks[r][c]=new Block(this.colors[Math.round(Math.random()*this.color_count)], "left");
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
			// Сдвинуть Оставшиеся блоки к краю резерва
			// Добавить блок в конец резерва
			if(DIR=="down"){
				if(this.blocks[R+1][C]==0)
					this.blocks[R][C].row=R+1;	
					this.blocks[R+1][C]=this.blocks[R][C];
					let action=new Action(this.blocks[R+1][C], R, R+1);
					this.actions.push(action);

					this.blocks[R][C]=this.blocks[R-1][C];
					this.blocks[R][C].row=R;	
					action=new Action(this.blocks[R][C], R-1, R);
					this.actions.push(action);

					this.blocks[R-1][C]=this.blocks[R-2][C];
					this.blocks[R-1][C].row=R-1;
					action=new Action(this.blocks[R-1][C], R-2, R-1);
					this.actions.push(action);

					this.blocks[R-2][C]=new Block(this.colors[Math.round(Math.random()*this.color_count)], "down");
					this.blocks[R-2][C].row=R-2;
					this.blocks[R-2][C].col=C;
					action=new Action(this.blocks[R-2][C]);
					action.isnew=1;
					this.actions.push(action);
			}
			if(DIR=="up"){
				if(this.blocks[R-1][C]==0)
					this.blocks[R][C].row=R-1;	
					this.blocks[R-1][C]=this.blocks[R][C];
					let action=new Action(this.blocks[R-1][C], R, R-1);
					this.actions.push(action);

					this.blocks[R][C]=this.blocks[R+1][C];
					this.blocks[R][C].row=R;	
					action=new Action(this.blocks[R][C], R+1, R);
					this.actions.push(action);

					this.blocks[R+1][C]=this.blocks[R+2][C];
					this.blocks[R+1][C].row=R+1;
					action=new Action(this.blocks[R+1][C], R+2, R+1);
					this.actions.push(action);

					this.blocks[R+2][C]=new Block(this.colors[Math.round(Math.random()*this.color_count)], "up");
					this.blocks[R+2][C].row=R+2;
					this.blocks[R+2][C].col=C;
					action=new Action(this.blocks[R+2][C]);
					action.isnew=1;
					this.actions.push(action);
			}
			if(DIR=="right"){
				if(this.blocks[R][C+1]==0)
					this.blocks[R][C].col=C+1;	
					this.blocks[R][C+1]=this.blocks[R][C];
					let action=new Action(this.blocks[R][C+1], C, C+1);
					this.actions.push(action);

					this.blocks[R][C]=this.blocks[R][C-1];
					this.blocks[R][C].col=C;	
					action=new Action(this.blocks[R][C], C-1, C);
					this.actions.push(action);

					this.blocks[R][C-1]=this.blocks[R][C-2];
					this.blocks[R][C-1].col=C-1;
					action=new Action(this.blocks[R][C-1], C-2, C-1);
					this.actions.push(action);

					this.blocks[R][C-2]=new Block(this.colors[Math.round(Math.random()*this.color_count)], "right");
					this.blocks[R][C-2].col=C-2;
					this.blocks[R][C-2].row=R;
					action=new Action(this.blocks[R][C-2]);
					action.isnew=1;
					this.actions.push(action);
			}
			if(DIR=="left"){
				if(this.blocks[R][C-1]==0)
					this.blocks[R][C].col=C-1;	
					this.blocks[R][C-1]=this.blocks[R][C];
					let action=new Action(this.blocks[R][C-1], C, C-1);
					this.actions.push(action);

					this.blocks[R][C]=this.blocks[R][C+1];
					this.blocks[R][C].col=C;	
					action=new Action(this.blocks[R][C], C+1, C);
					this.actions.push(action);

					this.blocks[R][C+1]=this.blocks[R][C+2];
					this.blocks[R][C+1].col=C+1;
					action=new Action(this.blocks[R][C+1], C+2, C+1);
					this.actions.push(action);

					this.blocks[R][C+2]=new Block(this.colors[Math.round(Math.random()*this.color_count)], "left");
					this.blocks[R][C+2].row=R;
					this.blocks[R][C+2].col=C+2;
					action=new Action(this.blocks[R][C+2]);
					action.isnew=1;
					this.actions.push(action);
			}

			this.check_stability();
			
		}

		check_stability(){
			// ЦИКЛ
			// 	Пока есть нестабильные блоки
			//    Двигаем их
			let DIR;
			let was_moved=1;
			while(was_moved){
				was_moved=0;
				for(let r=3;r<this.field_size-3;r++){
					for(let c=3;c<this.field_size-3;c++){	
						DIR=this.blocks[r][c].direction;
						if(DIR=="right" && this.blocks[r][c+1]==0){
							this.blocks[r][c+1]=this.blocks[r][c];
							this.blocks[r][c]=0;
							this.blocks[r][c+1].col=c+1;
							let action=new Action(this.blocks[r][c+1], c, c+1);
							this.actions.push(action);
							was_moved=1;
						}
						if(DIR=="left" && this.blocks[r][c-1]==0){
							this.blocks[r][c-1]=this.blocks[r][c];
							this.blocks[r][c]=0;
							this.blocks[r][c-1].col=c-1;
							let action=new Action(this.blocks[r][c-1], c, c-1);
							this.actions.push(action);
							was_moved=1;
						}
						if(DIR=="down" && this.blocks[r+1][c]==0){
							this.blocks[r+1][c]=this.blocks[r][c];
							this.blocks[r][c]=0;
							this.blocks[r+1][c].row=r+1;
							let action=new Action(this.blocks[r+1][c], r, r+1);
							this.actions.push(action);
							was_moved=1;
						}
						if(DIR=="up" && this.blocks[r-1][c]==0){
							this.blocks[r-1][c]=this.blocks[r][c];
							this.blocks[r][c]=0;
							this.blocks[r-1][c].row=r-1;
							let action=new Action(this.blocks[r-1][c], r, r-1);
							this.actions.push(action);
							was_moved=1;
						}
					}
				}
			}

			// Если есть блок направленный в резервную зону
			//   Удаляем крайний блок зоны
			//   Двигаем от края два другие
			//   Впихиваем в резерв подошедший блок

			// 	Смотрим Есть ли удаляемые
			//    Да - Удаляем
			//    Нет - выход из ЦИКЛА
			// ЦИКЛ
		}

	}
