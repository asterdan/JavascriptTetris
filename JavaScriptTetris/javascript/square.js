
class Square extends Div{
    constructor(className,x,y,color){
        super(className,x,y);
        this.color = color;
        this.div.style.backgroundColor = this.color;
    }
}