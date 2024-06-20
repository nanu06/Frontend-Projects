import { useState } from "react";
import { Link } from "react-router-dom";

const Calculator = () => {
  const [display, setDisplay] = useState("");
  const [currentValue, setCurrentValue] = useState("");
  const [previousValue, setPreviousValue] = useState("");
  const [operator, setOperator] = useState("");
  const [resultDisplayed, setResultDisplayed] = useState(false); 

  const handleNumberClick = (num) => {
    if (resultDisplayed) {
      setDisplay(num);
      setCurrentValue(num);
      setResultDisplayed(false);
    } else {
      setDisplay(display + num);
      setCurrentValue(currentValue + num);
    }
  };

  const handleOperatorClick = (op) => {
    if (operator) {
      calculate();
    } else {
      setPreviousValue(currentValue);
    }
    setOperator(op);
    setDisplay(display + op);
    setResultDisplayed(false);
  };

  const handleClear = () => {
    setDisplay("");
    setCurrentValue("");
    setPreviousValue("");
    setOperator("");
    setResultDisplayed(false);
  };

  const handleEquals = () => {
    calculate();
    setResultDisplayed(true);
  };

  const handleBackspace = () => {
    if (display.length > 0) {
      const newDisplay = display.slice(0, -1);
      setDisplay(newDisplay);
      setCurrentValue(newDisplay);
    }
  };

  const calculate = () => {
    let result;
    switch (operator) {
      case "+":
        result = parseFloat(previousValue) + parseFloat(currentValue);
        break;
      case "-":
        result = parseFloat(previousValue) - parseFloat(currentValue);
        break;
      case "*":
        result = parseFloat(previousValue) * parseFloat(currentValue);
        break;
      case "/":
        result = parseFloat(previousValue) / parseFloat(currentValue);
        break;
      default:
        return;
    }
    setDisplay(result.toString());
    setCurrentValue(result.toString());
    setPreviousValue("");
    setOperator("");
  };

  const handleKeyPress = (event) => {
    const key = event.key;
    if (/[0-9]/.test(key)) {
      handleNumberClick(key);
    } else if (["+", "-", "*", "/"].includes(key)) {
      handleOperatorClick(key);
    } else if (key === ".") {
      handleNumberClick(key);
    } else if (key === "Enter") {
      handleEquals();
    } else if (key === "Backspace") {
      handleBackspace();
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-4">Calculator</h1>
          <div className="mb-4 text-2xl font-bold text-right">{display}</div>
          <div className="grid grid-cols-4 gap-4">
            <button
              className="col-span-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg"
              onClick={() => handleClear()}
            >
              AC
            </button>
            <button
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg"
              onClick={() => handleOperatorClick("/")}
            >
              /
            </button>
            <button
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg"
              onClick={() => handleNumberClick("7")}
            >
              7
            </button>
            <button
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg"
              onClick={() => handleNumberClick("8")}
            >
              8
            </button>
            <button
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg"
              onClick={() => handleNumberClick("9")}
            >
              9
            </button>
            <button
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg"
              onClick={() => handleOperatorClick("*")}
            >
              *
            </button>
            <button
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg"
              onClick={() => handleNumberClick("4")}
            >
              4
            </button>
            <button
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg"
              onClick={() => handleNumberClick("5")}
            >
              5
            </button>
            <button
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg"
              onClick={() => handleNumberClick("6")}
            >
              6
            </button>
            <button
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg"
              onClick={() => handleOperatorClick("-")}
            >
              -
            </button>
            <button
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg"
              onClick={() => handleNumberClick("1")}
            >
              1
            </button>
            <button
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg"
              onClick={() => handleNumberClick("2")}
            >
              2
            </button>
            <button
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg"
              onClick={() => handleNumberClick("3")}
            >
              3
            </button>
            <button
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg"
              onClick={() => handleOperatorClick("+")}
            >
              +
            </button>
            <button
              className="col-span-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg"
              onClick={() => handleNumberClick("0")}
            >
              0
            </button>
            <button
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg"
              onClick={() => handleNumberClick(".")}
            >
              .
            </button>
            <button
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg"
              onClick={() => handleEquals()}
            >
              =
            </button>
            <button
              className="col-span-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg"
              onClick={() => handleBackspace()}
            >
              Backspace
            </button>
          </div>
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
    </>
  );
};

export default Calculator;
