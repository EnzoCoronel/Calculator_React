import React from "react";
import { Props } from "./types";

const Display: React.FC<Props> = ({ mainString, result }) => {
  if (result.toString().length > 8) {
    result = "ERR";
  }

  return (
    <div className="align-text-bottom absolute w-screen h-1/2">
      <p className="absolute bottom-24 right-8 text-3xl">{result.toString()}</p>
      <p className="absolute bottom-8 right-8 text-5xl"> {mainString.toString()}</p>
    </div>
  );
};

export default Display;
