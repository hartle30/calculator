let firstNum = ''
let operation = ''
let nextNum = ''
let equalSign = ''
const operationDisplay = document.getElementById('subDisplay');
const display = document.getElementById('display');

function updateOperationDisplay() {
    operationDisplay.textContent = `${firstNum} ${operation} ${nextNum} ${equalSign}`;
};


function add(a, b) {
    return a + b;
};

function subtract(a, b) {
    return a - b;
};

function multiply(a, b) {
    return a * b;
};

function divide(a, b) {
    return a / b;
};

function operate(operation, a, b) {
    a = Number(firstNum);
    b = Number(nextNum);
    switch (operation) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '\u00D7':
            return multiply(a, b);
        case '\u00F7':
            if (b === 0) {
                return 'ERROR';
            } else {
                return divide(a, b);
            };
    };
};

function updateDisplay(n) {
    display.textContent += n;
};

function resetDisplay() {
    display.textContent = '';
};

function resetOperationDisplay() {
    operationDisplay.textContent = '';
};

const nums = Array.from(document.querySelectorAll('.num'));

nums.forEach(num => 
    num.addEventListener('click', () => updateDisplay(num.textContent))
    );

const operators = Array.from(document.querySelectorAll('.operator'));

function pressOperator(operator) {
    if (equalSign === '=') {
        resetOperationDisplay();
        firstNum = display.textContent;
        operation = operator.textContent;
        nextNum = '';
        equalSign = '';
        updateOperationDisplay();
        resetDisplay();
    } else {
        operation = operator.textContent;
        firstNum = display.textContent;
        updateOperationDisplay();
        resetDisplay();
    }
}

operators.forEach(operator =>
    operator.addEventListener('click', () => pressOperator(operator)
    ));

const equals = document.getElementById('equals');

function pressEquals() {
    nextNum = display.textContent;
    equalSign = '=';
    updateOperationDisplay();
    display.textContent = operate(operation, firstNum, nextNum);
    firstNum = display.textContent;
};

equals.addEventListener('click', () =>
    pressEquals()
);  

function clear () {
    resetOperationDisplay();
    resetDisplay();
    firstNum = '';
    operation = '';
    nextNum = '';
    equalSign = '';
};

const clearButton = document.getElementById('clear');
clearButton.addEventListener('click',() => clear());

function deleteNum() {
    let numString = display.textContent;
    numString = numString.slice(0, -1);
    display.textContent = numString;
};

const deleteButton = document.getElementById('delete');
deleteButton.addEventListener('click', () => deleteNum());