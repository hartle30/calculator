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
                return '**ERROR!**';
            } else {
                return divide(a, b);
            };
    };
};

function updateDisplay(n) {
    if (display.textContent.length < 10) {
        display.textContent += n;
    } else {
        display.textContent = '*OVERFLOW*';
    }
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
    if (display.textContent === '*OVERFLOW*' || display.textContent === '**ERROR!**') {
        return;
    } else if (equalSign === '=') {
        resetOperationDisplay();
        firstNum = display.textContent;
        operation = operator.textContent;
        nextNum = '';
        equalSign = '';
        updateOperationDisplay();
        resetDisplay();
    } else if(operation !== '' && equalSign !== '=' && display.textContent !== '') {
        pressEquals()
        firstNum = display.textContent;
        nextNum = '';
        equalSign = '';
        operation = operator.textContent;
        updateOperationDisplay();
        resetDisplay();
    } else if (display.textContent === '') {
        operation = operator.textContent;
        updateOperationDisplay();
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
    if (display.textContent === '*OVERFLOW*' || display.textContent === '**ERROR!**') {
        return;
    } else {
    nextNum = display.textContent;
    equalSign = '=';
    updateOperationDisplay();
    display.textContent = operate(operation, firstNum, nextNum);
    firstNum = display.textContent;
    }
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
    if (display.textContent === '*OVERFLOW*' || display.textContent === '**ERROR!**') {
        clear();
    } else {
        let numString = display.textContent;
        numString = numString.slice(0, -1);
        display.textContent = numString;
    }
};

const deleteButton = document.getElementById('delete');
deleteButton.addEventListener('click', () => deleteNum());

const point = document.getElementById('point');

function insertPoint() {
    if (display.textContent.includes('.')) {
        return;
    } else {
        updateDisplay('.')
    }
};

point.addEventListener('click', () => insertPoint());
