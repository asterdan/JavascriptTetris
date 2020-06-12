

class PointRotator {

    
    static rotatePoint(x,y,a,b){
        x = PointRotator.translateToOrigin(x, a);
        y = PointRotator.translateToOrigin(y, b);
        let xPrim = x*Math.cos(Math.PI/2)-y*Math.sin(Math.PI/2);
        let yPrim = x*Math.sin(Math.PI/2)+y*Math.cos(Math.PI/2);
        xPrim = PointRotator.translateToPivot(xPrim, a);
        yPrim = PointRotator.translateToPivot(yPrim, b);
        let coordinates = [Math.floor(xPrim),Math.floor(yPrim)];
        
        return coordinates;
    }

    static translateToOrigin(x,k){
        return x-k;
    }

    static translateToPivot(x,k){
        return x+k;
    }

}