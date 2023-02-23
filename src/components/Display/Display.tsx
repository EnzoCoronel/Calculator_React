import React from "react";
import { CalcInfo } from "./types";

const Display: React.FC<CalcInfo> = ({ mainString, result }) => {
  if (result.toString().length > 8) {
    result = "ERR";
  }

  return (
    <div className="upperDisplay">
      <p className="result">{result.toString()}</p>
      <p className="equation"> {mainString.toString()}</p>
    </div>
  );
};

export default Display;
