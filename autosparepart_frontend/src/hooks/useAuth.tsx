import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { authenticateUser } from "@/features/auth/authSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const initializeAuth = async () => {
      if (!isAuthenticated) {
        await dispatch(authenticateUser());
        if (!isAuthenticated) {
          navigate("/login");
        }
      }
    };

    initializeAuth();
  }, [dispatch, isAuthenticated, navigate]);

  return isAuthenticated;
};

export default useAuth;