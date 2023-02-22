import React, { useState } from "react";
import Display from "./components/Display/Display";
import Pad_Btn from "./components/Pad_Btn/Pad_Btn";

const buttons = [
  "AC",
  "+-",
  "%",
  "÷",
  "7",
  "8",
  "9",
  "x",
  "4",
  "5",
  "6",
  "-",
  "1",
  "2",
  "3",
  "+",
  "0",
  ",",
  "<-",
  "=",
];

function App() {
  const [calc, setCalc] = useState({
    displayedString: "0",
    sign: [""],
    nums: [""],
    result: 0,
  });

  return (
    <div>
      <header className="text-right mr-6">
        <p>Options</p>
      </header>
      <Display mainString={calc.displayedString} result={calc.result}/>
      <div className="grid grid-cols-4 absolute w-screen h-1/2 bottom-0 border-t-2">
        {buttons.map((btnType: string) => {
          return (
            <Pad_Btn
              input={btnType}
              calc={calc}
              setCalc={setCalc}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
