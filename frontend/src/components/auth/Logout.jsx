import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      const token = localStorage.getItem("token");
      await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      localStorage.removeItem("token");
      navigate("/login");
    };

    logout();
  }, [navigate]);

  return <p>Déconnexion en cours...</p>;
};

export default Logout;
