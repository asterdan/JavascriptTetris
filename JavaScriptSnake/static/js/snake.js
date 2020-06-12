

let gridHorizontal = [];
let gridVertical = [];

let i1,i2,i3,i4;

for (var i=0;i<1200;i+=20){
    gridHorizontal.push(i);
}

for (var i=0;i<522;i+=20){
    gridVertical.push(i);
}


let movements = ['x'];


Array.prototype.peek = function() {
    if (this.length === 0) {
      throw new Error('out of bounds');
    }
    return this[this.length - 1];
}

function pluck(array, key) {
    return array.map(o => o[key]);
}


class Node {

    constructor(parent,direction){
        let element = document.createElement('div');
        element.className = 'snake';
        if(parent==null){
            this.topPosition = gridVertical[Math.floor(Math.random()*27)+1];
            this.leftPosition = gridHorizontal[Math.floor(Math.random()*60)+1];
        }
        else {
            if(direction==null){
                this.topPosition = parent.topPosition;
                this.leftPosition = parent.leftPosition;
            }
            else if(direction=='d'){
                this.topPosition = parent.topPosition;
                this.leftPosition = parent.leftPosition-20;
            }
            else if(direction=='a'){
                this.topPosition = parent.topPosition;
                this.leftPosition = parent.leftPosition+20;
            }
            else if(direction=='w'){
                this.topPosition = parent.topPosition-20;
                this.leftPosition = parent.leftPosition;
            }
            else if(direction=='s'){
                this.topPosition = parent.topPosition+20;
                this.leftPosition = parent.leftPosition;
            }
            
        }
        
        element.style.top = this.topPosition+'px';
        element.style.left = this.leftPosition+'px';        
        this.node = document.getElementById('board').appendChild(element);
        this.tail = null;
        
    }

    followParent(parent,node){
        if(node.tail!=null){
            node.followParent(node,node.tail);
        }
        node.leftPosition = parent.leftPosition;
        node.topPosition = parent.topPosition;
        node.node.style.top = node.topPosition+'px';
        node.node.style.left = node.leftPosition+'px';
        
    }

    moveLeft(node){
        if(node.tail!=null){
            node.followParent(node,node.tail);
        }
        node.leftPosition += 20;
        node.node.style.left = node.leftPosition+'px';
        
        

    }

    moveRight(node){
        if(node.tail!=null){
            node.followParent(node,node.tail);
        }
        node.leftPosition -= 20;
        node.node.style.left = node.leftPosition+'px';
        
        
    }

    moveDown(node){
        if(node.tail!=null){
            node.followParent(node,node.tail);
        }
        node.topPosition += 20;
        node.node.style.top = node.topPosition+'px';
        

     
    }

    moveUp(node){
        if(node.tail!=null){
            node.followParent(node,node.tail);
        }
        node.topPosition -= 20;
        node.node.style.top = node.topPosition+'px';
        

        
    }

    addTail(direction){
        this.tail = new Node(this,direction);
    }
    
}

class Snake {
   
    constructor(food,points){
        this.length = 1;
        this.food = food;       
        this.head = new Node();
        this.points = 0;
    }

    addNode(direction){
        let curr = this.head;
        while(curr.tail != null){
            
            curr = curr.tail;
            
        }
        curr.addTail(direction);
    }

    eat(food,direction){
        if(this.checkIfOverlaps(food)){
           this.addNode(direction);
           this.food.node.remove();
           this.food = new Food();
           this.points += 50;
           

        }
    }

    checkIfOverlaps(food){
        let rect1 = this.head.node.getBoundingClientRect();
        let rect2 = food.node.getBoundingClientRect();
        if(rect1.top==rect2.top&&rect1.left==rect2.left){
            return true;
        }
        return false;
        
    }

    checkIfOutsideBoundary(){
        

        if((this.head.topPosition>540||this.head.topPosition<0)
        ||(this.head.leftPosition<0||this.head.leftPosition>1200)){
            return true;
        }
        return false;
    }

    checkIfOverlapsWithSelf(){
        var nodes = this.getNodes();
        
        var head = this.head;
        var flag = false;
        nodes.forEach(function(item){
            
            if(head.leftPosition == item.leftPosition && head.topPosition == item.topPosition){
                flag = true;
            }
        })
        return flag;
        
    }

    getNodes(){
        let nodes = [];
        
        let curr = this.head.tail;
        if(curr!=null){
            while(curr.tail!=null){
                nodes.push(curr);
                curr = curr.tail;
            }
        }
        
        return nodes;

    }


    moveL(){
        this.head.moveLeft(this.head);
        
        this.eat(this.food,'d');
        
        
    }

    moveR(){
        this.head.moveRight(this.head);
        
        this.eat(this.food,'a');
        
        
    }

    moveD(){
        this.head.moveDown(this.head);
        
        this.eat(this.food,'s');
        
    }

    moveU(){
        this.head.moveUp(this.head);
       
        this.eat(this.food,'w');
        
        
    }
    
}

class Food extends Node {
    constructor(){

        super();
        this.node.className = 'food';

    }
}






class UserInterface {

    

    static displayStartMessage(){
        
        let window = document.createElement('div');
        window.className = 'window';
        window.id = 'message';
        let header = document.createElement('h2');
        header.innerHTML = 'Luaj Snake';
        let message = document.createElement('p');
        message.innerHTML = 'Kliko butonat (a,s,d,w) per te luajtur!';
        let button = document.createElement('button');
        button.innerHTML = 'Luaj';
        button.addEventListener('click',UserInterface.startGame);
        window.appendChild(header);
        window.appendChild(message);
        window.appendChild(button);
        document.getElementById('board').appendChild(window);
        
    }

     static startGame(){
        let window = document.getElementById('message');
        document.getElementById('board').removeChild(window);
        let food = new Food();
        let snake = new Snake(food);
        document.addEventListener('keypress',function(){
            UserInterface.execute(event,snake);

        });
        
    }

    

    static endGame(snake){
        clearInterval(i1);
        clearInterval(i2);
        clearInterval(i3);
        clearInterval(i4);
        let window = document.createElement('div');
        window.className = 'window';
        window.id = 'message';
        let header = document.createElement('h2');
        header.innerHTML = 'Game Over';
        let message = document.createElement('p');
        message.innerHTML = '<b>Urime you fituat '+ snake.points + ' Pike! </b><br>Kliko butonin luaj per te luajtur perseri!';
        let button = document.createElement('button');
        button.innerHTML = 'Luaj';
        button.addEventListener('click',function(){
            location.reload();
        });
        window.appendChild(header);
        window.appendChild(message);
        window.appendChild(button);
        document.getElementById('board').innerHTML = '';
        document.getElementById('board').appendChild(window);
       
        
    }

    static updatePoints(points){
        let h3points = document.createElement('p');
        h3points.innerHTML = 'Piket: '+points;
        document.getElementById('points').innerHTML = '';
        document.getElementById('points').appendChild(h3points);
    }

    
    static execute(event,snake){
        
 
        if(event.key=='6'){
           if(movements.peek()!='4'){
                clearInterval(i1);
                clearInterval(i2);
                clearInterval(i3);
                clearInterval(i4);
                i1 = setInterval(function(){snake.moveL();
                if(snake.checkIfOutsideBoundary()){
                    UserInterface.endGame(snake);
                }
                else if(snake.checkIfOverlapsWithSelf()){
                    UserInterface.endGame(snake);
                }
                else{
                    UserInterface.updatePoints(snake.points);
                }
                movements.pop();
                movements.push('6');},200);
           }
                
            
                
        
        }
        else if (event.key=='4'){
            
            if(movements.peek()!='6'){
                clearInterval(i1);
                clearInterval(i2);
                clearInterval(i3);
                clearInterval(i4);
                i2 = setInterval(function(){snake.moveR();
                if(snake.checkIfOutsideBoundary()){
                    UserInterface.endGame(snake);
                }
                else if(snake.checkIfOverlapsWithSelf()){
                    UserInterface.endGame(snake);
                }
                else{
                    UserInterface.updatePoints(snake.points);
                }
                movements.pop();
                movements.push('4');},200);
            }
                
    
        }
        else if (event.key=='8'){
            if(movements.peek()!='5'){
                clearInterval(i1);
                clearInterval(i2);
                clearInterval(i3);
                clearInterval(i4);
                i3 = setInterval(function(){snake.moveU();
                if(snake.checkIfOutsideBoundary()){
                    UserInterface.endGame(snake);
                }
                else if(snake.checkIfOverlapsWithSelf()){
                    UserInterface.endGame(snake);
                }
                else{
                    UserInterface.updatePoints(snake.points);
                }   
                movements.pop();
                movements.push('8');},200);
            }
                     
            
        }
        else if (event.key == '5'){
            if(movements.peek()!='8'){
                clearInterval(i1);
                clearInterval(i2);
                clearInterval(i3);
                clearInterval(i4);
                i4 = setInterval(function(){snake.moveD();  
                if(snake.checkIfOutsideBoundary()){
                    UserInterface.endGame(snake);
                }
                else if(snake.checkIfOverlapsWithSelf()){
                    UserInterface.endGame(snake);
                }
                else{
                    UserInterface.updatePoints(snake.points);
                }  
                movements.pop();
                movements.push('5');},200);
            }
                       
        }

        

    }
}



document.getElementById('body').addEventListener('onload',UserInterface.displayStartMessage());

