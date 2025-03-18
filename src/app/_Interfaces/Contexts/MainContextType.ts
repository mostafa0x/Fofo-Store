import { Dispatch, SetStateAction } from "react";
import TypeProducts from "../TypeProducts";

export default interface MainContextTypes {
  SearchTXT: string | null;
  TV: number;

  setSearchTXT: Dispatch<SetStateAction<string | null>>;
  setTV: Dispatch<SetStateAction<number>>;
}
