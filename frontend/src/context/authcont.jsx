import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { Loader } from "lucide-react";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 

  const checkAuth = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/auth/check", {
        withCredentials: true,
      });
      console.log(response.data,"response goodd")
      setUser(response.data);
    } catch {
      console.log( "response bad");

      setUser(null);
    } finally {
     setLoading(false); 
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);
  const LoadingSpinner = () => {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Loader size={200} className="spinner" />
      </div>
    );
  };
  if (loading) return LoadingSpinner(); 

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}