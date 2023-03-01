import React from "react";
import { CalcInfo } from "./types";

const Display: React.FC<CalcInfo> = ({ mainString, result, pastEquations }) => {
  if (result.toString().length > 8) {
    result = "ERR";
  }

  return (
    <div className="upperDisplay">
      <p className={`result ${result === 0 ? "hidden" : ""}`}>
        = {result.toString()}
      </p>
      <p className="equation"> {mainString.toString()}</p>
      {pastEquations}
    </div>
  );
};

export default Display;
