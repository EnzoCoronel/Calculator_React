import React from "react";
import { Props } from "./types";
import { Calc } from "./types";

const PadBtn: React.FC<Props> = ({ input, calc, setCalc }) => {
  const updateCalculationState = () => {
    let newCalc = { ...calc };

    if (input === "AC") {
      setCalc({
        displayedString: "0",
        sign: [""],
        nums: [""],
        result: 0,
      });
      return;
    }

    if (input === "=") {
      return;
    }

    if (input === "<-") {
      newCalc.displayedString = newCalc.displayedString.slice(0, -1);
      getCalculation(newCalc);
      setCalc(newCalc);
      return;
    }

    if (newCalc.displayedString.charAt(0) === "0")
      newCalc.displayedString = newCalc.displayedString.slice(0, -1); //clear first zero

      let isLessThan8 = newCalc.nums[newCalc.nums.length - 1].length < 8;
      if (isLessThan8) newCalc.displayedString += input; //need improvement

    getCalculation(newCalc);
    console.log(newCalc);
    setCalc(newCalc);
  };

  // const isNumber = (str: string) => {
  //   return !isNaN(parseFloat(str));
  // };

  const getCalculation = (newCalc: Calc) => {
    let signsString;
    newCalc.nums = [];
    newCalc.result = 0;

    newCalc.nums = newCalc.displayedString.split(/[+x÷+-]/);
    if (newCalc.nums[newCalc.nums.length - 1] === "") newCalc.nums.pop();

    signsString = newCalc.displayedString.replace(/[0-9]/g, "");
    newCalc.sign = signsString.split("");

    newCalc.nums.forEach((element, index) => {
      newCalc.result = getResult(
        newCalc.result,
        parseFloat(element),
        newCalc.sign[index - 1]
      );
    });
  };

  const getResult = (a: number, b: number, operation: string) => {
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

  return (
    <button onClick={updateCalculationState} className="text-3xl">
      {input.toString()}
    </button>
  );
};

export default PadBtn;
