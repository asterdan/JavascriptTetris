


class Converter {
    constructor(){
        this.output = [];
        this.stack = [];
    }

    convertToPostfix(input){
        let queue = input.split(/([^a-zA-Z0-9]|[^0-9])/);
        queue = queue.filter(function(item){
            return item != "";
        });

        for (var i=0;i<queue.length;i++){
            let item = queue[i];

            switch(item){
                case "(":
                    this.stack.push(item);
                    break;
                case ")":
                    this.isCloseParenthesis();
                    break;
                case "+":
                case "-":
                    this.pushOperand(item,1);
                    break;
                case "*":
                case "/":
                    this.pushOperand(item,2);
                    break;
                default:
                    this.output.push(item);
                    break;



            }
        }

        while(this.stack.length != 0){
            let item = this.stack.pop();
            this.output.push(item);
        }

        return this.output;
    }

    pushOperand(thisOperand,precendence){

        while(this.stack.length != 0){
            let operatorTop = this.stack.pop();

            if (operatorTop=="("){
                this.stack.push(operatorTop);
                break;
            }
            else {
                let precendence2;

                if (operatorTop=="+" || operatorTop=="-"){
                    precendence2 = 1;
                }
                else {
                    precendence2 = 2;
                }

                if (precendence2<precendence){
                    this.stack.push(operatorTop);
                    break;
                }
                else {
                    this.output.push(operatorTop);
                }
            }
        }
        this.stack.push(thisOperand);
    }

    isCloseParenthesis(){
        while(this.stack.length != 0){
            let item = this.stack.pop();
            if (item=="("){
                break;
            }
            else {
                this.output.push(item);
            }
        }
    }
}


class Evaluator {
    constructor(){
        this.stack = [];
    }

    evaluate(input){
        for (var i=0;i<input.length;i++){
            let item = input[i];
            let regex = new RegExp(/[^a-zA-Z0-9]/);
            if (regex.test(item)==false){
                this.stack.push(parseInt(item));
            }
            else {
                let result = 0;
                let number1 = parseInt(this.stack.pop());
                let number2 = parseInt(this.stack.pop());

                switch(item){
                    case "+":
                        result = number1 + number2;
                        break;
                    case "-":
                        result = number1 - number2;
                        break;
                    case "*":
                        result = number1 * number2;
                        break;
                    case "/":
                        result = number1 / number2;
                        break;
                }

                this.stack.push(parseInt(result));
            }
        }

        let output = this.stack.pop();
        return output;
    }
}
 
class Calculator {

    static calculate(input){
        let converter = new Converter();
        let postfix = converter.convertToPostfix(input);
        console.log(postfix);
        let evaluator = new Evaluator();
        let result = evaluator.evaluate(postfix);
        return result;
    }
}



var numbers = document.querySelectorAll('.numbers div');
var operators = document.querySelectorAll('.operators div');
var elements = [];

for (var i=0;i<numbers.length;i++){
    numbers[i].addEventListener('click',function(e){
        var string = e.target.innerHTML;
        if(string=='C'){
            input.innerHTML = '';
            
            
        }
        else if (string=='='){

            if(input.innerHTML.length ==0){
                throw new Error('Nothing to calculate');
            }
            else {
                let expression = input.innerHTML;
                input.innerHTML = Calculator.calculate(expression);
            }
        }
        else {
            input.innerHTML += string;
        }
        
    })
}


for (var i=0;i<operators.length;i++){
    operators[i].addEventListener('click',function(e){
        var string = e.target.innerHTML;
        input.innerHTML += string;
        
    })
}

