import TypeProducts from "./TypeProducts";
export interface TypesContexts {
  SearchTXT?: string | null;
  setSearchTXT?: any;
  ItemFillters?: any;
  setItemFillters?: any;
  Category?: string[];
  setCategory?: any;
  Products?: TypeProducts[];
  setProducts?: any;
  setisLoading?: any;
  TV?: number;
  setTV?: any;
  MyCart?: { MyCart?: TypeProducts[]; Totalprice?: number };
  setMyCart?: any;
  isLoadingCartIcon?: boolean;
  setisLoadingCartIcon?: any;
  On?: number;
  setOn?: any;
  AddProductToCart?: any;
  RemoveProductFormCart: any;
  DeleteProductFromCart: any;
  DeleteAllCart?: any;
}
