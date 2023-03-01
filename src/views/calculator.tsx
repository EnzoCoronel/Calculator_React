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

  const [pastEquations, setPastEquations] = useState([<></>]);

  return (
    <div>
      <header className="header">
        <p>Options</p>
      </header>
      <Display
        mainString={calc.displayedString}
        result={calc.result}
        pastEquations={pastEquations}
      />
      <div className="PadBtnGrid">
        {buttons.map((btnRole, index) => {
          return (
            <PadBtn
              key={index}
              input={btnRole}
              calc={calc}
              setCalc={setCalc}
              pastEquations={pastEquations}
              setPastEquations={setPastEquations}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Calculator;
