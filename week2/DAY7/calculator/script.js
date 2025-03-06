let display = document.getElementById('display');
let currentExpression = '';

function appendDigit(digit) {
    currentExpression += digit;
    updateOutput();
}

function appendSymbol(symbol) {
    if (currentExpression.length > 0 && !isNaN(currentExpression.slice(-1))) {
        currentExpression += symbol;
        updateOutput();
    }
}

function deleteDigit() {
    currentExpression = currentExpression.slice(0, -1);
    updateOutput();
}

function ClearOutput() {
    currentExpression = '';
    updateOutput();
}

function calculate() {
    try {
        let result = eval(currentExpression);
        currentExpression = result.toString();
        updateOutput();
    } catch (error) {
        currentExpression = 'Error';
        updateOutput();
        setTimeout(() => ClearOutput(), 1500);
    }
}

function updateOutput() {
    display.value = currentExpression;
}