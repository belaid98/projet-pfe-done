import axios from "axios";
import { jwtInterceptor } from "Interceptors/JWTInterceptor";
import React from "react";
import Cookies from "js-cookie";
import { useLocation, useNavigate } from "react-router-dom";

const AdminAuthContext = React.createContext();

export function AdminAuthProvider({ children }) {
  const [user, setUser] = React.useState(null);
  const [token, setToken] = React.useState(null);
  const [isLoading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const logIn = (adminData) => {
    setLoading(true);
    let loginURL =
      process.env.REACT_APP_API_URL +
      process.env.REACT_APP_admin_route +
      "/loginAdmin";

    axios
      .post(loginURL, adminData)
      .then((res) => {
        setLoading(false);
        if (res) {
          //handle success
          if (!res.data.error) {
            let t = res.data.token;
            navigate("/admin", { replace: true });
            localStorage.setItem("token", t);
            Cookies.set("token", t);
            setToken(t);
            console.log("res: ", res);
          }
        }
      })
      .catch((err) => {
        //handle error
        console.log(token);
        //console.log(err.response.data.error);
      });
  };
  const getUser = () => {
    let DT = decodedToken();
    console.log(DT);
    if (DT.role === "administrateur") {
      setLoading(true);
      axios({
        method: "get",
        url: process.env.REACT_APP_API_URL + "admins/" + DT.id,
      })
        .then((res) => {
          //handle success
          setLoading(false);
          if (!res.data.error) {
            setUser(res);
          }
        })
        .catch((err) => {
          //handle error
          setLoading(false);
          console.log(err);
        });
    } else {
      navigate("/");
    }
  };

  const decodedToken = () => {
    if (token) {
      var base64Url = token.split(".")[1];
      var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      var jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );

      return JSON.parse(jsonPayload);
    } else {
      return { error: "no token to decode" };
    }
  };

  const logOut = () => {
    Cookies.remove("token");
    setToken(null);
    setUser(null);
    navigate("/admin/sign-in");
  };

  // Add intercepors when the site opens
  // Guard for Admin
  React.useEffect(() => {
    let t = Cookies.get("token");
    setToken(t);

    /* setTimeout(() => {
      console.log("Timed");
      if (!t) {
        navigate("/");
      } else if (location.pathname === "/admin/sign-in") {
        console.log("Sign In");
      }
    }, 10); */

    return () => {
      axios.interceptors.request.eject(jwtInterceptor);
    };
  }, []);

  // Add interceptors that change added token
  React.useEffect(() => {
    jwtInterceptor();
  }, [jwtInterceptor]);

  // Get logged admin every time the token changes
  React.useEffect(() => {
    if (token) {
      getUser();
    }
    console.log(token);
    return () => {};
  }, [token]);

  return (
    <AdminAuthContext.Provider
      value={{
        token,
        user,
        isLoading,
        decodedToken,
        logIn,
        logOut,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}
export default AdminAuthContext;
