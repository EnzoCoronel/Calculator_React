import React, { useContext } from "react";
import { Props } from "./types";

const Pad_Btn: React.FC<Props> = ({ props, setPressed }) => {
  return (
    <button onClick={() => setPressed(props)} className="text-2xl">
      {props.toString()}
    </button>
  );
};

export default Pad_Btn;
