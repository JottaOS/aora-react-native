import { Models } from "react-native-appwrite";

export interface GlobalContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  user: Models.Document | null;
  setUser: (user: Models.Document | null) => void;
  isLoading: boolean;
}
