import { Dispatch, SetStateAction } from "react";
import CategoryType from "../CategoryType";

export default interface CategoriesContextType {
  Categories: CategoryType[];
  CurrentCategory: CategoryType | undefined;

  setCategories: Dispatch<SetStateAction<CategoryType[]>>;
  setCurrentCategory: Dispatch<SetStateAction<CategoryType | undefined>>;
}
