

class LineShape extends Shape {
    constructor(components,color){
        super(components);
        this.color = color;
        let x = 1;
        let y = NumberGenerator.generateNumber();
        while(y<1||y>10){
            y = NumberGenerator.generateNumber();
        }

        let c1 = new Square('block',x,y,this.color);
        let c2 = new Square('block',c1.x+1,c1.y,this.color);
        let c3 = new Square('block',c2.x+1,c2.y,this.color);
        let c4 = new Square('block',c3.x+1,c3.y,this.color);

        this.components = [c1,c2,c3,c4];
    }

    rotate(){
        super.rotate();
        if(this.getMinCoordinateY()>1&&this.getMaxCoordinateY()<10){
            let centerX = Math.floor((this.components[1].x+this.components[2].x)/2);
            let centerY = Math.floor((this.components[1].y+this.components[2].y)/2);
            let newPoints = PointRotator.rotatePoint(this.components[0].x,this.components[0].y,centerX,centerY);
            this.components[0].replace(newPoints[0],newPoints[1]);
            newPoints = PointRotator.rotatePoint(this.components[1].x,this.components[1].y,centerX,centerY);
            this.components[1].replace(newPoints[0],newPoints[1]);
            newPoints = PointRotator.rotatePoint(this.components[2].x,this.components[2].y,centerX,centerY);
            this.components[2].replace(newPoints[0],newPoints[1]);
            newPoints = PointRotator.rotatePoint(this.components[3].x,this.components[3].y,centerX,centerY);
            this.components[3].replace(newPoints[0],newPoints[1]);

        }
        return true;
       
  }
}