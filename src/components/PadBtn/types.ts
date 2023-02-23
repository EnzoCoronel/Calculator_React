export type Calc = {
  displayedString: string;
  sign: string[];
  nums: string[];
  result: number;
};

export interface Props {
  input: string;
  calc: Calc;

  setCalc: React.Dispatch<
    React.SetStateAction<Calc>
  >;
}