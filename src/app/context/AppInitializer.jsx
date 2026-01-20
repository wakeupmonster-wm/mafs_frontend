import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initializeAuth } from "@/modules/authentication/store/auth.slice";

export default function AppInitializer({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  return children;
}