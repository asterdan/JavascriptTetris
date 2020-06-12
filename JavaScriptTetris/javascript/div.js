

class Div {
    constructor(className,x,y){
        this.className = className;
        this.x = x;
        this.y = y;
        this.division = document.createElement('div');
        this.division.className = this.className;
        this.div = document.getElementById(`${this.x},${this.y}`).appendChild(this.division);
    }

    remove(){
        this.div.remove();
    }

    replace(x,y){
        this.remove();
        this.x = x;
        this.y = y;
        this.div = document.getElementById(`${x},${y}`).appendChild(this.division);
    }

    checkIfEnd(){
        if(this.x==20){
            return true;
        }
        return false;
    }

    static checkIfBoxIsFull(x,y){
        let div = document.getElementById(`${x},${y}`);
       
        if(div.children.length > 0){
            return true;
        }
        return false;
    }

    static returnDivColor(x,y){
        let div = document.getElementById(`${x},${y}`).childNodes[0];
        let color = window.getComputedStyle(div).getPropertyValue('background-color');
        color = Div.toColorName(color);       
        return color;
    }

    static toColorName(rgb){
        switch(rgb){
            case 'rgb(0, 255, 255)':
                return 'cyan';
            case 'rgb(255, 255, 0)':
                return 'yellow';
            case 'rgb(0, 0, 255)':
                return 'blue';
            case 'rgb(255, 0, 0)':
                return 'red';
            case 'rgb(0, 128, 0)':
                return 'green';
            case 'rgb(128, 0, 128)':
                return 'purple';
            case 'rgb(255, 165, 0)':
                return 'orange';
        }
    }
}