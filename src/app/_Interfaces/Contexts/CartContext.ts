import { Dispatch, SetStateAction } from "react";
import TypeProducts from "../TypeProducts";

export default interface CartContextTypes {
  MyCart: { MyCart: TypeProducts[]; Totalprice: number };
  isLoadingCartIcon: boolean;

  setMyCart: Dispatch<
    SetStateAction<{ MyCart: TypeProducts[]; Totalprice: number }>
  >;
  setisLoadingCartIcon: Dispatch<SetStateAction<boolean>>;
  AddProductToCart: Dispatch<SetStateAction<any>>;
  RemoveProductFormCart: Dispatch<SetStateAction<any>>;
  DeleteProductFromCart: Dispatch<SetStateAction<any>>;
  DeleteAllCart: Dispatch<SetStateAction<any>>;
}
