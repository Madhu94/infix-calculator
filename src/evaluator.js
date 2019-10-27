
class Buffer {
    constructor() {
        this._buffer = [];
    }

    add(letter) {
        this._buffer.push(letter);
    }

    flush() {
        const val = this._buffer.join('');
        this._buffer = [];
        return val;
    }
}

const operatorsMetaData = {
    '+': {precedence: 1, op: (a, b) => a + b},
    '-': {precedence: 1, op: (a, b) => a - b},
    '*': {precedence: 2, op: (a, b) => a * b},
    '/': {precedence: 2, op: (a, b) => a / b},
    '(': {precedence: 0}
};

class Evaluator {
    constructor() {
        this._operands = [];
        this._operators = [];
        this._buffer = new Buffer();
    }

    flushBuffer() {
        const operand = this._buffer.flush();
        if (operand !== '') {
            this._operands.push(parseInt(operand));
        }
    }

    evalNext() {
        if (this._operands.length === 1 && this._operators.length === 0) {
            return this.operands[0];
        }
        if (this._operators.length === 0 || this._operands.length < 2) {
            throw new Error('Invalid state reached, please check expression');
        }
        const operand2 = this._operands.pop();
        const operand1 = this._operands.pop();
        let operator = this._operators.pop();
        while (operator === ')') {
            operator = this._operators.pop();
        }
        this._operands.push(operatorsMetaData[operator].op(operand1, operand2));
    }

    evaluate(expr) {
        for (const letter of expr) {
            if (letter === '(') {
                this.flushBuffer();
                this._operators.push(letter);
            } else if (Object.keys(operatorsMetaData).includes(letter)) {
                this.flushBuffer();
                // if no operators
                if (this._operators.length === 0) {
                    this._operators.push(letter);
                } else {
                    const {precedence} = operatorsMetaData[letter];
                    if (operatorsMetaData[this._operators[this.operators.length - 1]] < precedence) {
                        this._operators.push(letter);
                    } else {
                        this.evalNext();
                    }
                }
            } else if (letter === ')') {
                this.flushBuffer();
                this.evalNext();
            } else {
                this._buffer.add(letter);
            }
        }
        // evaluate the rest
        this.flushBuffer();
        for (const operator of this._operators) {
            this.evalNext(); // use _.times here for clarity
        }
        return this._operands[0];
    }
}

let evaluator = null;

function getEvaluator() {
    if (!evaluator) {
        evaluator = new Evaluator();
    }
    return evaluator;
}

export function evalInfixExpression(expr) {
    return getEvaluator().evaluate(expr);
}