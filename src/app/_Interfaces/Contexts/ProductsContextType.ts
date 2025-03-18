import { Dispatch, SetStateAction } from "react";
import TypeProducts from "../TypeProducts";

export default interface ProductsContextTypes {
  Products: TypeProducts[];
  ProdutcsByCategory: TypeProducts[] | null;
  PageCategoryLoading: boolean;

  setProducts: Dispatch<SetStateAction<TypeProducts[]>>;
  setProdutcsByCategory: Dispatch<SetStateAction<TypeProducts[] | null>>;
  setPageCategoryLoading: Dispatch<SetStateAction<boolean>>;
}
