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
    let mainStr = newCalc.displayedString;

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

    if (input === "C") {
      setCalc({
        displayedString: "0",
        sign: [""],
        nums: [""],
        result: 0,
      });
      return;
    }

    if (input === "=") {
      if (newCalc.result === 0) newCalc.result = parseFloat(mainStr);
      setPastEquations(
        pastEquations.concat(
          <div key={pastEquations.length} className="history">
            <p>{mainStr}</p>
            <p>= {newCalc.result}</p>
          </div>
        )
      );

      if (newCalc.result !== 0) mainStr = newCalc.result.toString();
      newCalc.result = 0;
      newCalc.displayedString = mainStr;
      setCalc(newCalc);
      return;
    }

    if (input === "<-") {
      mainStr = mainStr.slice(0, -1);
      if (mainStr === "") mainStr = "0";
      newCalc.displayedString = mainStr;
      getCalculation(newCalc);
      setCalc(newCalc);
      return;
    }

    if (input === ",") input = ".";

    if (input === "xⁿ") input = "^";

    if (input === "±" && mainStr === "0") return;

    let lastDigit = mainStr.charAt(mainStr.length - 1);

    if (!isNumber(lastDigit) && !isNumber(input))
      //if (input !== "π" && input !== "√" && lastDigit !== "π" && lastDigit !== "√")
      mainStr = mainStr.slice(0, -1);

    if (mainStr.slice(-1) === "0" && isNumber(input))
      mainStr = mainStr.slice(0, -1); //clear first zero

    let numberLenght = 0;
    for (let i = 0; i < mainStr.length; i++) {
      if (isNumber(mainStr.charAt(i))) numberLenght++;
      else numberLenght = 0;
    }

    if (numberLenght < 8 || !isNumber(input)) mainStr += input;

    if (input === "±") {
      let numberToInvert = newCalc.nums[newCalc.nums.length - 1];
      mainStr = mainStr.slice(0, -1);
      if (newCalc.sign[newCalc.sign.length - 1] === "-") {
        mainStr = mainStr.replace(/-([^-]*)$/, "+" + "$1");
        newCalc.sign[newCalc.sign.length - 1] = "+";
      } else if (newCalc.sign[newCalc.sign.length - 1] === "+") {
        mainStr = mainStr.replace(/\+([^+]*)$/, "-" + "$1");
        newCalc.sign[newCalc.sign.length - 1] = "-";
      } else {
        let invertedNumber = (parseFloat(numberToInvert) * -1).toString();
        mainStr = mainStr.slice(0, -invertedNumber.length);
        mainStr = mainStr.concat(invertedNumber);
      }
      if (newCalc.nums.length <= 1) mainStr = "0" + mainStr;
    }

    newCalc.displayedString = mainStr;
    getCalculation(newCalc);
    //console.log(newCalc);
    setCalc(newCalc);
  };

  const isNumber = (str: string) => {
    return !isNaN(parseFloat(str));
  };

  const getCalculation = (newCalc: Calc) => {
    let signsString;
    newCalc.nums = [];
    newCalc.result = 0;

    let mainStr = newCalc.displayedString;

    newCalc.nums = mainStr.split(/[+x÷±^√π-]/);
    newCalc.nums = newCalc.nums.filter((str) => str !== "");

    signsString = mainStr.replace(/[0-9.]/g, "");
    newCalc.sign = signsString.split("");

    if (mainStr.charAt(0) === "-")
      newCalc.result = parseFloat("-" + newCalc.nums[0]);
    else newCalc.result = parseFloat(newCalc.nums[0]);

    let signIndex = newCalc.sign.findIndex((element) => element === "^");

    handleExponetiation(signIndex, newCalc);

    signIndex = newCalc.sign.findIndex(
      (element) => element === "x" || element === "÷"
    );

    handleMultiplicationsAndDivisions(signIndex, newCalc);

    newCalc.nums.forEach((element, index) => {
      if (newCalc.sign[index] === "%") {
        mainStr = mainStr.slice(0, -element.length);
        if (index === 0) element = trasformToPercentage(1, element);
        else element = trasformToPercentage(newCalc.result, element);
        mainStr = mainStr.concat(element);
      }
      let elementTypeNum = parseFloat(element);

      if (newCalc.sign[index] === "π") {
        if (element !== "0") element = (elementTypeNum * 3.141).toFixed(3);
        else element = (elementTypeNum + 3.141).toFixed(3);
        newCalc.sign.splice(index, 1);
        newCalc.nums[index] = element;
        if (mainStr.charAt(0) === "0") mainStr = mainStr.slice(1);
      }

      if (newCalc.sign[index] === "√") {
        //it does`t work with negative numbers inside the square root
        //also, it may bug the multi/div/exponetial order
        if (elementTypeNum !== 0) elementTypeNum = Math.sqrt(elementTypeNum);
        else elementTypeNum = Math.sqrt(elementTypeNum);
        elementTypeNum = parseFloat(
          (Math.round(elementTypeNum * 100) / 100).toFixed(3)
        );

        newCalc.sign.splice(index, 1);
        element = elementTypeNum.toString();
        newCalc.nums[index] = elementTypeNum.toString();
        if (mainStr.charAt(0) === "0") mainStr = mainStr.slice(1);
      }

      newCalc.displayedString = mainStr;

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
      case "^":
        a = a ** b;
        break;
      case "√":
      case "π":
        a = a;
        break;
      default: //should i remove this?
        a = b;
        break;
    }
    return a;
  };

  const handleExponetiation = (signIndex: number, newCalc: Calc) => {
    let equationCalc = { ...newCalc };
    if (signIndex !== -1 && equationCalc.nums[signIndex + 1]) {
      equationCalc.nums[signIndex + 1] = getResult(
        parseFloat(equationCalc.nums[signIndex]),
        parseFloat(equationCalc.nums[signIndex + 1]),
        newCalc.sign[signIndex]
      ).toString();

      equationCalc.nums.splice(signIndex, 1);
      equationCalc.sign.splice(signIndex, 1);

      signIndex = equationCalc.sign.findIndex((element) => element === "^");
      if (signIndex === -1) return;
      handleMultiplicationsAndDivisions(signIndex, equationCalc);
    }
  };

  const handleMultiplicationsAndDivisions = (
    signIndex: number,
    newCalc: Calc
  ) => {
    let equationCalc = { ...newCalc };
    if (signIndex !== -1 && equationCalc.nums[signIndex + 1]) {
      equationCalc.nums[signIndex + 1] = getResult(
        parseFloat(equationCalc.nums[signIndex]),
        parseFloat(equationCalc.nums[signIndex + 1]),
        newCalc.sign[signIndex]
      ).toString();

      equationCalc.nums.splice(signIndex, 1);
      equationCalc.sign.splice(signIndex, 1);

      signIndex = equationCalc.sign.findIndex(
        (element) => element === "x" || element === "÷"
      );
      if (signIndex === -1) return;
      handleMultiplicationsAndDivisions(signIndex, equationCalc);
    }
  };

  const trasformToPercentage = (mainValue: number, percentageStr: string) => {
    let percentageValue = parseFloat(percentageStr);
    percentageValue = (percentageValue / 100) * mainValue;
    percentageStr = percentageValue.toString();
    return percentageStr;
  };

  return (
    <button
      onClick={updateCalculationState}
      className={`button ${
        isNumber(input) ? "bg-gray-100" : input === "=" ? "bg-orange-300" : ""
      }`}
    >
      {input.toString()}
    </button>
  );
};

export default PadBtn;
