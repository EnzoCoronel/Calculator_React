import React, { useState } from "react";
import Display from "./components/Display/Display";
import Pad_Btn from "./components/Pad_Btn/Pad_Btn";

const buttons = [
  "AC",
  "()",
  "%",
  "÷",
  "7",
  "8",
  "9",
  "X",
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
  "x",
  "=",
];

function App() {
  const [pressed, setPressed] = useState("");

  return (
    <div>
      <header className="text-right mr-6">
        <p>Options</p>
      </header>
      <Display props={pressed} />
      <div className="grid grid-cols-4 absolute w-screen h-1/2 bottom-0 border-t-2">
        {buttons.map((element: string) => {
          return <Pad_Btn props={element} setPressed={setPressed} />;
        })}
      </div>
    </div>
  );
}

export default App;
