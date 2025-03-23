import { Dispatch, SetStateAction } from "react";

export default interface MainContextTypes {
  SearchTXT: string | null;
  TV: number;
  EditMode: number | null;

  setSearchTXT: Dispatch<SetStateAction<string | null>>;
  setTV: Dispatch<SetStateAction<number>>;
  setEditMode: Dispatch<SetStateAction<number | null>>;
}
