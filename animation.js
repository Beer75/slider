/**
 * Class for animation queue. Get from Action queue and use in Output class
 */
class Animation{
    block;
    property;
    new_val;
    constructor(block, prop, val){
        this.block=block;
        this.property=prop;
        this.new_val=val;
    }
}