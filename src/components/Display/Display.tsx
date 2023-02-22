import React from "react";
import { Props } from "./types";

const Display: React.FC<Props> = ({ props }) => {
  return (
    <div className="align-text-bottom absolute w-screen h-1/2">
      <p className="absolute bottom-8 right-8 text-5xl"> {props.toString()}</p>
    </div>
  );
};

export default Display;
