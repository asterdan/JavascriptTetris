

class Board {
    constructor(player){
        this.player = player;
        this.blocks = [];
    }

    createBoard(){

        let container = document.getElementById('grid-container');
        for (let i=1;i<21;i++){
            for (let j=1;j<11;j++){
                let div = document.createElement('div');
                div.id = `${i},${j}`;
                document.getElementById('grid-container').appendChild(div);
            }
        }


    }

    addShapes(shape){
        this.blocks.push(shape);
    }

    pushDownShapes(x){
        this.blocks.forEach(function(block){
            block.components.forEach(function(component){
                
                if(component.x<x){
                    component.replace(component.x+1,component.y);
                }
                
            });
        })
    }

    clearLines(){
        for (let i=20;i>0;i--){
            let flag = true;
            for(let j=1;j<11;j++){
                let div = document.getElementById(`${i},${j}`);
                if(!(div.innerHTML.trim().length>0)){
                    flag = false;
                }
            }

            if(flag==true){
                for(let j=1;j<11;j++){
                    let div = document.getElementById(`${i},${j}`);
                    div.innerHTML = '';
                }
                this.pushDownShapes(i);
                this.player.points += 100;
            }
        }
    }

    clear(){
        document.getElementById('grid-container').innerHTML = '';
    }

    testFill(){

        for (let i=20;i>17;i--){
            let flag = true;
            for(let j=1;j<11;j++){
                let div = document.getElementById(`${i},${j}`);
                let block = document.createElement('div');
                block.className = 'block';
                block.style.background = 'red';
                div.appendChild(block);
            }
        }
    }

    

    
}