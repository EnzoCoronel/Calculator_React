import React from "react";
import { Props } from "./types";

type Calc = {
  displayedString: string;
  sign: string[];
  nums: string[];
  result: number;
};

const Pad_Btn: React.FC<Props> = ({ input, calc, setCalc }) => {
  const doBtnRole = () => {
    let newCalc = { ...calc };

    if (input === "AC") {
      setCalc({
        displayedString: "0",
        sign: [],
        nums: [],
        result: 0,
      });
      return;
    }

    if (input === "=") {
      return;
    }

    if (newCalc.displayedString.charAt(0) === "0")
      newCalc.displayedString = newCalc.displayedString.slice(0, -1); //clear first zero

    let lastInputNum = newCalc.nums[newCalc.nums.length-1];
    if (lastInputNum.length < 8)  newCalc.displayedString += input; //need improvement

    getCalculation(newCalc);
    console.log(newCalc);
    setCalc(newCalc);
  };

  const isNumber = (str: string) => {
    return !isNaN(parseFloat(str));
  };

  const getCalculation = (newCalc: Calc) => {
    let number = "";
    newCalc.nums = [];
    newCalc.result = 0;

    // newCalc.nums = newCalc.displayedString.split(/^([-+]? ?(\d+|\(\g<1>\))( ?[-+*\/] ?\g<1>)?)$/)
    //desired function

    for (let index = 0; index < newCalc.displayedString.length; index++) {
      if (isNumber(newCalc.displayedString.charAt(index)))
        number += newCalc.displayedString.charAt(index);
      else {
        newCalc.nums.push(number);
        number = "";
      }
    }

    if (number !== "") newCalc.nums.push(number);
    newCalc.nums.forEach((element) => {
      newCalc.result += parseFloat(element); //soma
    });
  };

  return (
    <button onClick={doBtnRole} className="text-2xl">
      {input.toString()}
    </button>
  );
};

export default Pad_Btn;
