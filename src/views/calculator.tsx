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
      <Display
        mainString={calc.displayedString}
        result={calc.result}
        pastEquations={pastEquations}
      />
      <ul className="PadBtnGrid">
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
      </ul>
    </div>
  );
};

export default Calculator;
