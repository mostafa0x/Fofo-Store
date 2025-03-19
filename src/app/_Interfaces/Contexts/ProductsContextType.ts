import { Dispatch, SetStateAction } from "react";
import TypeProducts from "../TypeProducts";

export default interface ProductsContextTypes {
  Products: TypeProducts[] | null;
  ProdutcsByCategory: TypeProducts[] | null;
  PageCategoryLoading: boolean;
  ProductByID: TypeProducts | null;

  setProducts: Dispatch<SetStateAction<TypeProducts[] | null>>;
  setProdutcsByCategory: Dispatch<SetStateAction<TypeProducts[] | null>>;
  setPageCategoryLoading: Dispatch<SetStateAction<boolean>>;
  setProductByID: Dispatch<SetStateAction<TypeProducts | null>>;
}
