import React from "react";
import { Props } from "./types";
import { Calc } from "./types";

const PadBtn: React.FC<Props> = ({
  input,
  calc,
  setCalc,
  pastEquations,
  setPastEquations,
}) => {
  const updateCalculationState = () => {
    let newCalc = { ...calc };
    let mainString = newCalc.displayedString;

    if (input === "AC") {
      setCalc({
        displayedString: "0",
        sign: [""],
        nums: [""],
        result: 0,
      });
      setPastEquations([]);
      return;
    }

    if (input === "=") {
      if (newCalc.result === 0) newCalc.result = parseFloat(mainString);
      setPastEquations(
        pastEquations.concat(
          <div key={pastEquations.length} className="history">
            <p>{mainString}</p>
            <p>= {newCalc.result}</p>
          </div>
        )
      );
      if (newCalc.result !== 0) mainString = newCalc.result.toString();
      newCalc.result = 0;
      setCalc(newCalc);
      return;
    }

    if (input === "<-") {
      mainString = mainString.slice(0, -1);
      if (mainString === "") mainString = "0";
      newCalc.displayedString = mainString;
      getCalculation(newCalc);
      setCalc(newCalc);
      return;
    }

    if (input === ",") input = ".";

    if (
      !isNumber(mainString.charAt(mainString.length - 1)) &&
      !isNumber(input)
    ) {
      mainString = mainString.slice(0, -1);
    }

    if (mainString.slice(-1) === "0" && isNumber(input))
      mainString = mainString.slice(0, -1); //clear first zero

    let isLessThan8 = newCalc.nums[newCalc.nums.length - 1].length < 8;
    if (isLessThan8) mainString += input; //need improvement

    if (input === "±") {
      //to fix: negative first input makes the equation be a subtraction
      let toInvertNumber = newCalc.nums[newCalc.nums.length - 1];
      mainString = mainString.slice(0, -1);
      if (newCalc.sign[newCalc.sign.length - 1] === "-") {
        mainString = mainString.replace(/-([^-]*)$/, "+" + "$1");
        newCalc.sign[newCalc.sign.length - 1] = "+";
      } else if (newCalc.sign[newCalc.sign.length - 1] === "+") {
        mainString = mainString.replace(/\+([^+]*)$/, "-" + "$1");
        newCalc.sign[newCalc.sign.length - 1] = "-";
      } else {
        toInvertNumber = (parseFloat(toInvertNumber) * -1).toString();
        mainString = mainString.slice(0, -toInvertNumber.length);
        mainString = mainString.concat(toInvertNumber);
      }
    }

    newCalc.displayedString = mainString;
    getCalculation(newCalc);
    console.log(newCalc);
    setCalc(newCalc);
  };

  const isNumber = (str: string) => {
    return !isNaN(parseFloat(str));
  };

  const getCalculation = (newCalc: Calc) => {
    let signsString;
    newCalc.nums = [];
    newCalc.result = 0;

    let mainString = newCalc.displayedString;

    newCalc.nums = mainString.split(/[+x÷\±-]/);
    newCalc.nums = newCalc.nums.filter((str) => str !== "");

    signsString = mainString.replace(/[0-9.]/g, "");
    newCalc.sign = signsString.split("");

    let doFirst = newCalc.sign.findIndex(
      (element) => element === "x" || element === "÷"
    );
    equation(doFirst, newCalc);

    newCalc.nums.forEach((element, index) => {
      if (newCalc.sign[index] === "%") {
        mainString = mainString.slice(0, -element.length);
        if (index === 0) element = makeItPercentage(1, element);
        else element = makeItPercentage(newCalc.result, element);
        mainString = mainString.concat(element);
      }

      newCalc.displayedString = mainString;

      newCalc.result = getResult(
        newCalc.result,
        parseFloat(element),
        newCalc.sign[index - 1]
      );
    });
  };

  const getResult = (a: number, b: number, operation: string) => {
    console.log(`a: ${a} b: ${b}`);
    switch (operation) {
      case "+":
        a += b;
        break;
      case "-":
        a -= b;
        break;
      case "x":
        a *= b;
        break;
      case "÷":
        a /= b;
        break;
      default: //undefined
        a = b;
        break;
    }
    return a;
  };

  const equation = (doFirst: number, newCalc: Calc) => {
    console.log(doFirst);
    if (doFirst !== -1 && newCalc.nums[doFirst + 1]) {
      newCalc.nums[doFirst + 1] = getResult(
        parseFloat(newCalc.nums[doFirst]),
        parseFloat(newCalc.nums[doFirst + 1]),
        newCalc.sign[doFirst]
      ).toString();

      newCalc.nums.splice(doFirst, doFirst);
      newCalc.sign.splice(doFirst, doFirst);

      doFirst = newCalc.sign.findIndex(
        (element) => element === "x" || element === "÷"
      );
      if (doFirst === -1) return;
      equation(doFirst, newCalc);
    }
  };

  const makeItPercentage = (mainValue: number, percentageStr: string) => {
    let percentageValue = parseFloat(percentageStr);
    percentageValue = (percentageValue / 100) * mainValue;
    percentageStr = percentageValue.toString();
    return percentageStr;
  };

  return (
    <button onClick={updateCalculationState} className="text-3xl">
      {input.toString()}
    </button>
  );
};

export default PadBtn;
