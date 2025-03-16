import TypeProducts from "./TypeProducts";
export interface TypesContexts {
  UserToken?: string | null | undefined;
  isUserLoading?: boolean;
  setisUserLoading?: any;
  setUserToken?: any;
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
  headers?: { Authorization: string | null };
  setheaders?: any;
  MyCart?: { MyCart?: string[]; Totalprice?: number };
  setMyCart?: any;
  isLoadingCartIcon?: boolean;
  setisLoadingCartIcon?: any;
  On?: number;
  setOn?: any;
}
