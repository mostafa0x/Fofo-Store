import { Dispatch, SetStateAction } from "react";
import TypeProducts from "../TypeProducts";

export default interface ProductsContextTypes {
  Products: TypeProducts[];

  setProducts: Dispatch<SetStateAction<string[]>>;
}
