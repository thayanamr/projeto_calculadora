import React, { useState } from "react";
import "./style.css";

function Main() {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState(null);
  const [currentOperator, setCurrentOperator] = useState(null);
  const [lastOperation, setLastOperation] = useState("");

  const formatNumber = (number) => {
    return number.toLocaleString("pt-BR");
  };

  const handleNumberClick = (num) => {
    if (display === "0") {
      setDisplay(num);
    } else if (display.length < 9) {
      setDisplay((prevDisplay) => prevDisplay + num);
    }
  };

  const handleToggleSignClick = () => {
    const currentValue = parseFloat(display);
    const toggledValue = currentValue * -1;
    setDisplay(toggledValue.toString());
  };

  const handleOperatorClick = (operator) => {
    setPreviousValue(parseFloat(display));
    setCurrentOperator(operator);
    setDisplay("0");
  };

  const handlePercentageClick = () => {
    const currentValue = parseFloat(display);
    const percentageValue = currentValue / 100;
    setDisplay(percentageValue.toString());
  };

  const handleEqualClick = () => {
    const currentValue = parseFloat(display);
    let result = 0;

    switch (currentOperator) {
      case "+":
        result = previousValue + currentValue;
        break;
      case "-":
        result = previousValue - currentValue;
        break;
      case "*":
        result = previousValue * currentValue;
        break;
      case "/":
        result = previousValue / currentValue;
        break;
      default:
        break;
    }

    const operation = `${previousValue} ${currentOperator} ${currentValue} `;
    setLastOperation(operation);
    setDisplay(result.toString());
    setCurrentOperator(null);
    setPreviousValue(null);
  };

  const handleClearClick = () => {
    setDisplay("0");
    setLastOperation("");
    setPreviousValue(null);
    setCurrentOperator(null);
  };

  const handleDelClick = () => {
    setDisplay("0");
  };
  const handleDecimalClick = () => {
    if (!display.includes(".")) {
      setDisplay((prevDisplay) => prevDisplay + ".");
    }
  };

  return (
    <main>
      <div className="container">
        <div className="expression">{lastOperation}</div>
        <div className="results">{formatNumber(display)}</div>
        <div>
          <button onClick={handleClearClick} className="lightgrey">
            C
          </button>
          <button onClick={() => handleToggleSignClick()} className="lightgrey">
            +/-
          </button>
          <button onClick={() => handlePercentageClick()} className="lightgrey">
            %
          </button>
          <button onClick={() => handleOperatorClick("/")} className="blue">
            /
          </button>
        </div>
        <div>
          <button onClick={() => handleNumberClick("7")}>7</button>
          <button onClick={() => handleNumberClick("8")}>8</button>
          <button onClick={() => handleNumberClick("9")}>9</button>
          <button onClick={() => handleOperatorClick("*")} className="blue">
            x
          </button>
        </div>
        <div>
          <button onClick={() => handleNumberClick("4")}>4</button>
          <button onClick={() => handleNumberClick("5")}>5</button>
          <button onClick={() => handleNumberClick("6")}>6</button>
          <button onClick={() => handleOperatorClick("-")} className="blue">
            -
          </button>
        </div>
        <div>
          <button onClick={() => handleNumberClick("1")}>1</button>
          <button onClick={() => handleNumberClick("2")}>2</button>
          <button onClick={() => handleNumberClick("3")}>3</button>
          <button onClick={() => handleOperatorClick("+")} className="blue">
            +
          </button>
        </div>
        <div>
          <button onClick={() => handleDecimalClick()}>.</button>
          <button onClick={() => handleNumberClick("0")}>0</button>
          <button onClick={() => handleDelClick()}>del</button>
          <button onClick={() => handleEqualClick()} className="blue">
            =
          </button>
        </div>
      </div>
    </main>
  );
}

export default Main;
