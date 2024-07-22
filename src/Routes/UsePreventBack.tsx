import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useNavigationGuard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handlePopState = () => {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
      
        navigate("/login", { replace: true });
      } else {
        
        window.history.pushState(null, "", window.location.href);
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [navigate]);
};
