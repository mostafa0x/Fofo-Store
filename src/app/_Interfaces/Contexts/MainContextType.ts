import { Dispatch, SetStateAction } from "react";

export default interface MainContextTypes {
  SearchTXT: string | null;
  ItemFillters: string[];
  TV: number;

  setSearchTXT: Dispatch<SetStateAction<string | null>>;
  setItemFillters: Dispatch<SetStateAction<string[]>>;
  setTV: Dispatch<SetStateAction<number>>;
}
