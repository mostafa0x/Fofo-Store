import { Dispatch, SetStateAction } from "react";
import TypeProducts from "../TypeProducts";

export default interface MainContextTypes {
  SearchTXT: string | null;
  ItemFillters: TypeProducts[];
  TV: number;

  setSearchTXT: Dispatch<SetStateAction<string | null>>;
  setItemFillters: Dispatch<SetStateAction<TypeProducts[]>>;
  setTV: Dispatch<SetStateAction<number>>;
}
