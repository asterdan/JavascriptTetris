

class LShape extends Shape {

    constructor(components){
        super(components);
    }

    
    rotate(){
        super.rotate();
        if(this.getMinCoordinateY()>1&&this.getMaxCoordinateY()<10){
            let centerX = this.components[2].x;
            let centerY = this.components[2].y;
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