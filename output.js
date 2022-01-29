	/** For output field, animation and so on */
	class Output {
		board_div;
		field;
    	block_size=40; // in px
		animations=[];

		constructor(field){	
			this.field=field;
			this.board_div=document.getElementById("ObjField");

			// foreach in field.blocks
			for(let r=0;r<field.field_size;r++){
				for(let c=0;c<field.field_size;c++){				
					if(field.blocks[r][c]!=0){
						field.blocks[r][c].html_div.style.width=(this.block_size-2)+"px";
						field.blocks[r][c].html_div.style.height=(this.block_size-2)+"px";
						field.blocks[r][c].html_div.style.left=c*this.block_size+"px";
						field.blocks[r][c].html_div.style.top=r*this.block_size+"px";
						this.board_div.appendChild(field.blocks[r][c].html_div);

					}

				}
			}

			this.board_div.addEventListener("click", function(e){
				let clicked_block=e.target.connectedBlock;
				if(clicked_block){  
					if(field.can_click(clicked_block))
						field.click(clicked_block);
					   

				}

			});

			this.board_div.addEventListener("mouseover", function(e){
				let clicked_block=e.target.connectedBlock;
				if(clicked_block){  
					if(field.can_click(clicked_block))
					 	clicked_block.html_div.style.cursor="pointer";
					
				}

			});

			this.board_div.addEventListener("mouseout", function(e){
				let clicked_block=e.target.connectedBlock;
				if(clicked_block){  
					clicked_block.html_div.style.cursor="default";
				}

			});

			window.setTimeout("g.output.DoAnimations()",100);

		}

		DoAnimations(){
			let action;
			let animation;
				
			// Преобразуем действия на поле в шаги анимации
			while(this.field.actions.length>0){
				action=this.field.actions.shift();
				if(action.isnew==0 || action.isdel==0){
					// Moving
					let block=action.block;
					let dir=block.direction;
					if(dir=="down"){
						// TOP
						let R0=action.start_val*this.block_size;	 
						let R1=action.end_val*this.block_size;	 
						while(R0<R1){
							R0+=10;
							R0=(R0>=R1)?R1:R0;
							animation=new Animation(block, "top", R0);
							this.animations.push(animation);	
						}
					}
					if(dir=="up"){
						// TOP
						let R0=action.start_val*this.block_size;	 
						let R1=action.end_val*this.block_size;	 
						while(R0>R1){
							R0-=10;
							R0=(R0<=R1)?R1:R0;
							animation=new Animation(block, "top", R0);
							this.animations.push(animation);	
						}
					}
					if(dir=="right"){
						// TOP
						let R0=action.start_val*this.block_size;	 
						let R1=action.end_val*this.block_size;	 
						while(R0<R1){
							R0+=10;
							R0=(R0>=R1)?R1:R0;
							animation=new Animation(block, "left", R0);
							this.animations.push(animation);	
						}
					}
					if(dir=="left"){
						// TOP
						let R0=action.start_val*this.block_size;	 
						let R1=action.end_val*this.block_size;	 
						while(R0>R1){
							R0-=10;
							R0=(R0<=R1)?R1:R0;
							animation=new Animation(block, "left", R0);
							this.animations.push(animation);	
						}
					}
					
				}
				if(action.isnew==1){
					let block=action.block;
					block.html_div.style.width=(this.block_size-2)+"px";
					block.html_div.style.height=(this.block_size-2)+"px";
					block.html_div.style.left=block.col*this.block_size+"px";
					block.html_div.style.top=block.row*this.block_size+"px";
					block.html_div.style.display="none";
					this.board_div.appendChild(block.html_div);
					animation=new Animation(block, "display");
					this.animations.push(animation);	
				}
			}

			// Смотрим шаги анимации и выполняем несколько или все
			let times=0;
			if(this.animations.length>0 && times<5){
				animation=this.animations.shift();
				if(animation.property=="top" || animation.property=="left"){
					if(animation.block.direction=="down" || animation.block.direction=="up")
						animation.block.html_div.style.top=animation.new_val+"px";				
					if(animation.block.direction=="right" || animation.block.direction=="left")
						animation.block.html_div.style.left=animation.new_val+"px";				
				}
				if(animation.property=="display"){
					animation.block.html_div.style.display="block";
				}
				times++;
			}

			window.setTimeout("g.output.DoAnimations()",(this.animations.length>0 ? 10 : 100));

		}
		


	}