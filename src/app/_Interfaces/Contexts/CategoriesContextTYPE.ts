import { Dispatch, SetStateAction } from "react";
import CategoryType from "../CategoryType";

export default interface CategoriesContextType {
  Categories: CategoryType[];
  setCategories: Dispatch<SetStateAction<CategoryType[]>>;
}
