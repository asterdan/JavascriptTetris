

class SShapeRight extends SShape {
    constructor(components,color){
        super(components);
        this.color = color;
        let x = 1;
        let y = NumberGenerator.generateNumber();
        while(y<3){
            y = NumberGenerator.generateNumber();
        }
        let c1 = new Square('block',x,y,this.color);
        let c2 = new Square('block',x,c1.y-1,this.color);
        let c3 = new Square('block',c2.x+1,c2.y,this.color);
        let c4 = new Square('block',c3.x,c3.y-1,this.color);
        this.components = [c1,c2,c3,c4];        
    }

    

}