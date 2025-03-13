export interface TypesContexts {
  UserToken?: string | null | undefined;
  isLoading?: boolean;
  setUserToken?: any;
  SearchTXT?: string | null;
  setSearchTXT?: any;
  Data?: string[];
  setData?: any;
  ItemFillters?: any;
  setItemFillters?: any;
  Category?: string[];
  setCategory?: any;
  Products?: string[];
  setProducts?: any;
  setisLoading?: any;
  TV?: number;
  setTV?: any;
  headers?: { Authorization: string | null };
  setheaders?: any;
  MyCart?: { MyCart: string[]; Total: number };
  setMyCart?: any;
  isLoadingCartIcon?: boolean;
  setisLoadingCartIcon?: any;
}
