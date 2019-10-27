import React, {useState} from 'react';
import {evalInfixExpression} from './evaluator';
import './Calculator.css';

const buttons = [['1','4','7'],
                 ['2','5','8','0'],
                 ['3','6','9'],
                 ['(', ')', '=', 'C'],
                 ['+','-','*','/']]


export default function Calculator() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const buttonRows = buttons.map((buttonSet) => {
        const buttons = buttonSet.map((val) => {
            return (<button key={val} onClick={() => {
                if (val === 'C') {
                    setInput('.');
                    setOutput('');
                } else if (val === '=') {
                    setOutput(evalInfixExpression(input));
                } else {
                    setInput(`${input}${val}`);
                }
            }}>{val}</button>);
        });
        return (<section className='button-row'>{buttons}</section>)
    });
    return (
        <section className='calculator'>
            <section className="calc-input-output">
                <div>{input}</div>
                <div>{output}</div>
            </section>
            <section className='buttons'>
                {buttonRows}
            </section>
        </section>
    );
}