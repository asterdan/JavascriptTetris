
class Shape {
    constructor(components){
        this.components = components;
    }

    rotate(){

        if(this.getLargestCoordinateX()>=20){
            return false;
        }
        if(this.checkIfBoxIsFilled()){
            return false;
        }

    }


    moveDown(){
        if(this.getLargestCoordinateX()>=20){
            return false;
        }
        if(this.checkIfBoxIsFilled()){
            return false;
        }
        this.components.forEach(function(component){           
            component.replace(component.x+1,component.y);
        });
        

        return true;
    }

    moveLeft(){
        if(this.getLargestCoordinateX()>=20){
            return false;
        }
        if(this.checkIfBoxIsFilled()){
            return false;
        }
        if(this.getMinCoordinateY()>1){
            this.components.forEach(function(component){
                component.replace(component.x,component.y-1);          
            });
        }
        
        return true;
    }

    moveRight(){
        if(this.getLargestCoordinateX()>=20){
            return false;
        }
        if(this.checkIfBoxIsFilled()){
            return false;
        }

        if(this.getMaxCoordinateY()<10){
            this.components.forEach(function(component){
                if(component.y+1<11){
                    component.replace(component.x,component.y+1);
                }
                
            });
        }
       
        return true;
    }

    getLargestCoordinateX(){
        let max = -999;
        this.components.forEach(function(component){
            if(component.x>max){
                max = component.x;
            }
        });
        return max;
    }

    getMinCoordinateX(){
        let min = 9999;
        this.components.forEach(function(component){
            if(component.x<min){
                min = component.x;
            }
        });
        return min;
    }

    getMinCoordinateY(){
        let min = 9999;
        this.components.forEach(function(component){
            if(component.y<min){
                min = component.y;
            }
        });

        return min;
    }

    getMaxCoordinateY(){
        let max = -9999;
        this.components.forEach(function(component){
            if(component.y>max){
                max = component.y;
            }
        });
        return max;
    }

    getLargestCoordinates(){

        let maxX = -999,maxY = -999;
        this.components.forEach(function(component){
            if(component.x>maxX){
                maxX = component.x;
                maxY = component.y;
            }
        });
        return [maxX,maxY];
        
    }

    checkIfBoxIsFilled(){
        for (let i=0;i<this.components.length;i++){
            if(Div.checkIfBoxIsFull(this.components[i].x+1,this.components[i].y)){
                if(Div.returnDivColor(this.components[i].x+1,this.components[i].y)!=this.color){
                    return true;
                }
                else {
                    if(!this.checkIfComponentBelongsToThisShape(this.components[i].x+1, this.components[i].y)){
                        return true;
                    }
                }
            }     
        }
        
        return false;

    }

    checkIfShapeIsAtTop(){
        let minX = this.getMinCoordinateX();

        if(minX==1){
            return true;
        }
        return false;
    }

    checkIfComponentBelongsToThisShape(x,y){
       
        for(let i=0;i<this.components.length;i++){
            if(this.components[i].x==x&&this.components[i].y==y){
                return true;
            }
        }
        return false;
    }
    
}