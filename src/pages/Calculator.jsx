import  { useState } from 'react';
import { Link } from 'react-router-dom';

const Calculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleClick = (value) => {
    switch (value) {
      case '=':
        calculate();
        break;
      case 'C':
        clear();
        break;
      case '⌫':
        backspace();
        break;
      default:
        setInput(input + value);
        break;
    }
  };

  const calculate = () => {
    try {
      const evalResult = evaluateExpression(input);
      setResult(evalResult.toString());
    } catch (error) {
      setResult('Error');
    }
  };

  const evaluateExpression = (expr) => {
    const operators = {
      '+': (a, b) => a + b,
      '-': (a, b) => a - b,
      '*': (a, b) => a * b,
      '/': (a, b) => a / b,
    };

    const parseExpression = (expression) => {
      const numbers = expression.split(/[-+*/]/).map(Number);
      const ops = expression.split(/[0-9]+/).filter(op => op);

      let result = numbers[0];
      for (let i = 0; i < ops.length; i++) {
        const operator = ops[i];
        const number = numbers[i + 1];
        if (operator in operators) {
          result = operators[operator](result, number);
        }
      }
      return result;
    };

    return parseExpression(expr);
  };

  const clear = () => {
    setInput('');
    setResult('');
  };

  const backspace = () => {
    setInput(input.slice(0, -1));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-80">
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
          Calculator
        </h1>
        <div className="mb-6">
          <input
            type="text"
            className="border-gray-300 border rounded p-2 w-full text-right text-xl bg-gray-100 focus:outline-none"
            placeholder="0"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <input
            type="text"
            className="border-gray-300 border rounded p-2 w-full text-right text-xl mt-4 bg-gray-100 focus:outline-none"
            placeholder="Result"
            value={result}
            readOnly
          />
        </div>
        <div className="grid grid-cols-4 gap-4">
          {["7", "8", "9", "/"].map((value) => (
            <button
              key={value}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-4 rounded transition duration-300"
              onClick={() => handleClick(value)}
            >
              {value}
            </button>
          ))}
          {["4", "5", "6", "*"].map((value) => (
            <button
              key={value}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-4 rounded transition duration-300"
              onClick={() => handleClick(value)}
            >
              {value}
            </button>
          ))}
          {["1", "2", "3", "-"].map((value) => (
            <button
              key={value}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-4 rounded transition duration-300"
              onClick={() => handleClick(value)}
            >
              {value}
            </button>
          ))}
          {["0", ".", "C", "+"].map((value) => (
            <button
              key={value}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-4 rounded transition duration-300"
              onClick={() => handleClick(value)}
            >
              {value}
            </button>
          ))}
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 col-span-2 rounded transition duration-300"
            onClick={() => handleClick("⌫")}
          >
            ⌫
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 col-span-2 rounded transition duration-300"
            onClick={() => handleClick("=")}
          >
            =
          </button>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 w-full bg-white p-4 border-t text-center">
        <Link
          to="/"
          className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Calculator;
