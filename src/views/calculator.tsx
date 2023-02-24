import React, { useState } from "react";
import Display from "../components/Display/Display";
import PadBtn from "../components/PadBtn/PadBtn";
import { buttons } from "../BtnRolesString";

const Calculator = () => {
  const [calc, setCalc] = useState({
    displayedString: "0",
    sign: [""],
    nums: [""],
    result: 0,
  });

  return (
    <div>
      <header className="header">
        <p>Options</p>
      </header>
      <Display mainString={calc.displayedString} result={calc.result} />
      <div className="PadBtnGrid">
        {buttons.map((btnType: string) => {
          return <PadBtn input={btnType} calc={calc} setCalc={setCalc} />;
        })}
      </div>
    </div>
  );
};

export default Calculator;
