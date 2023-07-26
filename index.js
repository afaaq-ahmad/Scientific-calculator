const exp = [];
const orderedOperators = ["tan", "sin", "cos", "sqrt", "^", "/", "*", "-", "+"];
let trigonometricOperators = orderedOperators.slice(0, 3);
let otherOperators = orderedOperators.slice(3, orderedOperators.length);

let currentPosition = -1;
let isEquate = false;

let expElement = document.getElementById("expression");
let screenElement = document.getElementById("screen");


function appendDigit(el){
    console.log(el);

    if(isEquate){
        return;
    }

    if(currentPosition == -1){
        expElement.innerHTML += el;
        exp.push(el);
    }

    else if(exp[exp.length-1-currentPosition] == 'cos' && typeof exp[exp.length-2-currentPosition] == 'string' || 
            exp[exp.length-1-currentPosition] == 'sin' && typeof exp[exp.length-2-currentPosition] == 'string' || 
            exp[exp.length-1-currentPosition] == 'tan' && typeof exp[exp.length-2-currentPosition] == 'string')
        {
            console.log("entering append digit else if");
            expElement.innerHTML = expElement.innerHTML.slice(0, expElement.innerHTML.length-3-currentPosition) + el + "*" +
            expElement.innerHTML.slice(expElement.innerHTML.length-currentPosition-3) ;
            exp.splice((exp.length)-1-currentPosition, 0, el, "*");
        }

    else if(exp[exp.length-1-currentPosition] == 'sqrt' && typeof exp[exp.length-2-currentPosition] == 'string')
        {
            console.log("entering sqrt append digit else if");
            expElement.innerHTML = expElement.innerHTML.slice(0, expElement.innerHTML.length-4-currentPosition) + el + "*" +
            expElement.innerHTML.slice(expElement?.innerHTML?.length-currentPosition-4) ;
            exp.splice((exp.length)-1-currentPosition, 0, el, "*");
        }

    else{
        console.log("else on appendDigit");
    
        expElement.innerHTML = expElement.innerHTML?.slice(0, expElement.innerHTML.length-1-currentPosition) + el +
        expElement.innerHTML.slice(expElement.innerHTML.length-currentPosition-1) ;

        exp.splice((exp.length)-1-currentPosition, 0, el);
    }
    

    console.log(exp);
    
}

function mergable(){
    if(exp.length > 1){
        for (let i = 0; i < exp.length-1; i++){
        
            if (typeof exp[i] == 'number' && typeof exp[i+1] == 'number'){
                exp[i] = exp[i]*10 + exp[i+1];
                exp.splice(i+1, 1);
                console.log(exp);
                console.log(exp[i]);
                i--;
            }
        }
    }  
}

// function unMerge(){

//     for (let i = 0; i< )
// }


function appendOperator(op){
    if(currentPosition == -1){
        if (isEquate){
            expElement.innerHTML = screenElement.innerHTML;
            screenElement.innerHTML = "";
            isEquate = false;
        }
        console.log(op);
        if(exp.length !== 0 || op === '-'){
            if(!orderedOperators.includes(exp[exp.length-1])){
                expElement.innerHTML += op;
                exp.push(op);
                console.log(typeof exp[exp?.length-1]);
                console.log(exp);
            }
        }  
    }

    else{
        if(currentPosition == 0 && exp.length == 1 && 
            typeof exp[exp.length-1-currentPosition === 'number']){
                exp.splice((exp.length)-1-currentPosition, 0, op);
                expElement.innerHTML = op + expElement.innerHTML;
        }

        else if(typeof exp[exp.length-1-currentPosition] === 'number' &&
            orderedOperators.slice(4, 8).includes(op) && typeof exp[exp.length-2-currentPosition] === 'number')
            {
                expElement.innerHTML = expElement.innerHTML.slice(0, expElement.innerHTML.length-1-currentPosition) + op +
                expElement.innerHTML.slice(expElement.innerHTML.length-currentPosition-1) ;
                exp.splice((exp.length)-1-currentPosition, 0, op);
            }
    }

    console.log(exp);
      
}

function squareRoot(op){
    console.log(op);
    if(currentPosition == -1){
        if(isEquate){
            expElement.innerHTML = screenElement.innerHTML;
            screenElement.innerHTML = "";
            isEquate = false;
        }

        if(trigonometricOperators.includes(exp[exp?.length-1])){
            // do nothing
        }
        else if(orderedOperators.includes(exp[exp.length-1]) || exp.length == 0){
            expElement.innerHTML += op;
            exp.push(op);
            console.log(typeof exp[exp?.length-1]);
            console.log(exp);
        }
        else{
            console.log("entering else");
            exp.push('*');
            exp.push(op);
            expElement.innerHTML += '*';
            expElement.innerHTML += op;
            console.log(exp);
        }
    }

    else{
        console.log("entering else");
        if(typeof exp[exp.length-currentPosition-1] === 'number'){
            if(typeof exp[exp.length-currentPosition-2] === 'number'){

                expElement.innerHTML = expElement.innerHTML.slice(0, expElement.innerHTML.length-1-currentPosition) + "*" + op +
                expElement.innerHTML.slice(expElement.innerHTML.length-currentPosition-1) ;


                exp.splice((exp.length)-1-currentPosition, 0, '*');
                exp.splice((exp.length)-1-currentPosition, 0, op);
            }
            else{
                expElement.innerHTML = expElement.innerHTML.slice(0, expElement.innerHTML.length-1-currentPosition) + op +
                expElement.innerHTML.slice(expElement.innerHTML.length-currentPosition-1) ;
                exp.splice((exp.length)-1-currentPosition, 0, op);
            }
        }  
    }

}

function trigonometricOperations(op){
    if(currentPosition == -1){

        if(isEquate){
            expElement.innerHTML = screenElement.innerHTML;
            screenElement.innerHTML = "";
            isEquate = false;
        }

        if(trigonometricOperators.includes(exp[exp.length-1])){
            //do nothing
        }

        else if(otherOperators.includes(exp[exp.length-1]) || exp.length == 0){
            expElement.innerHTML += op;
            exp.push(op);
            console.log(typeof exp[exp?.length-1]); 
            console.log(exp);
        }
        else{
            exp.push('*');
            exp.push(op);
            expElement.innerHTML += '*' + op; 
        }
    }
    else{
        console.log("entering else");
        if(typeof exp[exp.length-currentPosition-1] === 'number'){
            console.log("entering elsed if");
            if(typeof exp[exp.length-currentPosition-2] === 'number'){

                expElement.innerHTML = expElement.innerHTML.slice(0, expElement.innerHTML.length-1-currentPosition) + "*" + op +
                expElement.innerHTML.slice(expElement.innerHTML.length-currentPosition-1) ;


                exp.splice((exp.length)-1-currentPosition, 0, '*');
                exp.splice((exp.length)-1-currentPosition, 0, op);
            }
            else{
                expElement.innerHTML = expElement.innerHTML.slice(0, expElement.innerHTML.length-1-currentPosition) + op +
                expElement.innerHTML.slice(expElement.innerHTML.length-currentPosition-1) ;
                exp.splice((exp.length)-1-currentPosition, 0, op);
            }
        }  
    }
}

function getOutput(){

    isEquate = true;
    currentPosition = -1;
    mergable();
    if(orderedOperators.slice(4, 8).includes(exp[0])){
        exp.splice(0, 1);
    }
    if(exp[0] == '-'){
        exp[0] = Number.parseInt(exp[0] + exp[1]);
        exp.splice(1,1);
        console.log(exp);
    }

    if (orderedOperators.includes(exp[exp.length-1]) && exp[exp.length-1] !== 'sqrt'){
        exp.pop();
    }

    for(let i = 0; i < orderedOperators.length; i++){
        if (exp.includes(orderedOperators[i])){
            let op_index = exp.indexOf(orderedOperators[i]);
            
            switch(exp[op_index]){

                case 'cos':
                    exp.splice(op_index, 2, Math.cos(exp[op_index+1]));
                    console.log(exp);
                    break;

                case 'sin':
                    exp.splice(op_index, 2, Math.sin(exp[op_index+1]));
                    console.log(exp);
                    break;

                case 'tan':
                    exp.splice(op_index, 2, Math.tan(exp[op_index+1]));
                    console.log(exp);
                    break;


                case 'sqrt':
                    exp.splice(op_index, 2, Math.sqrt(exp[op_index+1]));
                    console.log(exp);
                    break;

                case '^':
                    exp.splice(op_index-1, 3, Math.pow(exp[op_index-1], exp[op_index+1]));
                    console.log(exp);
                    break;

                case '/':
                    exp.splice(op_index-1, 3, exp[op_index-1] / exp[op_index+1]);
                    console.log(exp);
                    break;

                case '*':
                    exp.splice(op_index-1, 3, exp[op_index-1] * exp[op_index+1]);
                    console.log(exp);
                    break;  

                case '+':
                    exp.splice(op_index-1, 3, exp[op_index-1] + exp[op_index+1]);
                    console.log(exp);
                    break;

                case '-':
                    exp.splice(op_index-1, 3, exp[op_index-1] - exp[op_index+1]);
                    console.log(exp);
                    break;
            }

            if(exp.includes(orderedOperators[i], op_index)){
                i--;
            }
        }
    }

    if(exp.length == 1){
        screenElement.innerHTML = exp[0];
    }
    else if(exp.length > 1){
        screenElement.innerHTML = "Enter a valid statement";
    }
}

function clearAll(){
    isEquate = false;
    exp.splice(0, exp.length);
    console.log(exp);
    document.getElementById('expression').innerHTML = "";
    screenElement.innerHTML = "";   
}

function clearEntry(){

    if(exp.length == 0 || isEquate){
        exp.splice(0,1);
        expElement.innerHTML = "";
        screenElement.innerHTML = "";
        isEquate = false;
    }
    else{
        let last = exp.pop();
        if(typeof last === 'number' && last > 9){
            exp.push(Math.floor(last/10));
        }

        let toChar = exp.join();
        toChar = toChar.replace(/[,]/g,'');
        expElement.innerHTML = toChar;
    }
    
    

    console.log(exp);
}

function backward(){
    if (exp.length == 0 || isEquate){
        // do nothing
    }
    else if (currentPosition < exp.length-1){
        currentPosition++;
    }
    console.log(currentPosition);

}

function forward(){
    if (exp.length == 0 || isEquate){
        // do nothing
    }
    else if (currentPosition > -1){
        currentPosition--;
    }
    console.log(currentPosition);
}