import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";

export const useSession = () => {
  const context = useContext(AuthContext);
  return context;
};
