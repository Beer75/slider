class Action{
    block;
    start_val;
    end_val;
    direction;
    
    constructor(block, start, end){
        this.block=block;
        this.direction=block.direction;
        this.start_val=start;
        this.end_val=end;
        this.isdel=0;
        this.isnew=0;
        this.isreverce=0;
    }

}