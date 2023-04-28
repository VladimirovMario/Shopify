import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { authServiceFactory } from "../services/authService";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

  const [auth, setAuth] = useLocalStorage('auth', {});

  const authService = authServiceFactory(auth.token);
  const navigate = useNavigate();

  const onLoginSubmit = async (data) => {
    // console.log(">>> From authContext onLoginSubmit", data);
    try {
      const result = await authService.login(data);
      setAuth(result);
      navigate("/catalog");
      // console.log(">>> From authContext onLoginSubmit result", result);
      // { email: "peter@abv.bg", _id: ..., token: ... }
    } catch (error) {
      alert(error.message);
    }
  };

  const onRegisterSubmit = async (data) => {
    try {
      if (data.password !== data.repass) {
        throw new Error("Passwords don't match!");
      }
      const result = await authService.register(data);
      setAuth(result);
      navigate("/catalog");
    } catch (error) {
      alert(error.message);
    }
  };

  const onLogout = () => {
    authService.logout();
    setAuth({});
  };

  const contextValues = {
    onLoginSubmit,
    onRegisterSubmit,
    onLogout,
    userId: auth._id,
    userEmail: auth.email,
    userUsername: auth.username,
    token: auth.token,
    isAuthenticated: !!auth.token,
  };

  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  return context;
};
