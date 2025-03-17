import { Dispatch, SetStateAction } from "react";

export default interface UserContextType {
  UserToken: string | null | undefined;
  isUserLoading: boolean;
  headers: {
    Authorization: string | null;
  };

  setUserToken: Dispatch<SetStateAction<string | null>>;
  setisUserLoading: Dispatch<SetStateAction<boolean>>;
  setheaders: Dispatch<SetStateAction<{ Authorization: string | null }>>;
}
