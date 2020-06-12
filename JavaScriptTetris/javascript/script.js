
let shapes = [
    ['LShapeLeft','orange'],
    ['LShapeRight','cyan'],
    ['LineShape','blue'],
    ['SShapeLeft','red'],
    ['SShapeRight','green'],
    ['CubeShape','purple'],
    ['TShape','yellow']
];

    
let player = new Player(null,null,0);

let board = new Board(player,new Array());
board.createBoard();
let flag = true;
let shape = null;
shape = null;


function newShape(){
    let index = Math.floor(Math.random()*shapes.length);
    shape = eval(`new ${shapes[index][0]}(${null},'${shapes[index][1]}')`);
    let i1 = setInterval(function(){
        if(!shape.moveDown()){
            if(shape.checkIfShapeIsAtTop()){
                clearInterval(i1);
                gameOver();
                return;

            }
            else {
                clearInterval(i1);
                board.addShapes(shape);
                board.clearLines();
                shape = newShape();
                updatePoints(player.points);

            }
            
        }
    },800);
    
    return shape;
}
   

showMessage();

function showMessage(){
    let div = document.createElement('div');
    div.className = 'message';
    let h3 = document.createElement('h3');
    h3.innerHTML = 'Loja Tetris';
    let p = document.createElement('p');
    p.innerHTML = 'Kliko luaj per te luajtur';
    let button = document.createElement('button');
    button.className = 'myButton';
    button.innerHTML = 'Luaj';
    button.addEventListener('click',function(){
        startGame();
        div.remove();
    });
    div.appendChild(h3);
    div.appendChild(p);
    div.appendChild(button);
    document.getElementById('container').appendChild(div);
    


}

function gameOver(){

    let div = document.createElement('div');
    div.className = 'message';
    let h3 = document.createElement('h3');
    h3.innerHTML = 'Game Over';
    let p = document.createElement('p');
    p.innerHTML = `Ju fituat ${player.points} pike! Kliko butonin per te luajtur serisht!`;
    let button = document.createElement('button');
    button.className = 'myButton';
    button.innerHTML = 'Luaj';
    button.addEventListener('click',function(){
        startGame();
        div.remove();
    });
    div.appendChild(h3);
    div.appendChild(p);
    div.appendChild(button);
    document.getElementById('container').appendChild(div);

}


function updatePoints(points){
    document.getElementById('points').innerHTML = `<b>Piket: ${points}</b>`;
}

function startGame(){

    board.clear();
    player = new Player(null,null,0);
    board = new Board(player,new Array());
    board.createBoard();
    flag = true;
    shape = newShape();

}






document.addEventListener('keypress',execute);


function execute(event){
    if(event.key=='5'){
        
        if(!shape.rotate()){
            if(shape.checkIfShapeIsAtTop()){
                clearInterval(i1);
                gameOver();
                return;

            }
            else {
                clearInterval(i1);
                board.addShapes(shape);
                board.clearLines();
                shape = newShape();

            }
            
        }
    }
    else if(event.key=='4'){
        
        if(!shape.moveLeft()){
            if(shape.checkIfShapeIsAtTop()){
                clearInterval(i1);
                gameOver();
                return;

            }
            else {
                clearInterval(i1);
                board.addShapes(shape);
                board.clearLines();
                shape = newShape();

            }
            
        }
    }
    else if (event.key=='6'){
        
        if(!shape.moveRight()){
            if(shape.checkIfShapeIsAtTop()){
                clearInterval(i1);
                gameOver();
                return;

            }
            else {
                clearInterval(i1);
                board.addShapes(shape);
                board.clearLines();
                shape = newShape();

            }
            
        }
    }
    else if(event.key=='2'){
        if(!shape.moveDown()){
            if(shape.checkIfShapeIsAtTop()){
                clearInterval(i1);
                gameOver();
                return;

            }
            else {
                clearInterval(i1);
                board.addShapes(shape);
                board.clearLines();
                shape = newShape();

            }
        }
       
    }
}