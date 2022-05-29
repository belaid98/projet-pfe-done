import axios from "axios";
import { jwtInterceptor } from "Interceptors/JWTInterceptor";
import React from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const AuthContext = React.createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = React.useState(null);
  const [token, setToken] = React.useState(null);
  const [goBack, setGoBack] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);

  const navigate = useNavigate();

  let loginURL = process.env.REACT_APP_API_URL + "loginUser";
  let signUpURL = process.env.REACT_APP_API_URL + "users";

  const logIn = (userData) => {
    setLoading(true);
    axios
      .post(loginURL, userData)
      .then((res) => {
        //handle success
        setLoading(false);

        if (res && !res.data.error) {
          let t = res.data.token;
          localStorage.setItem("token", t);
          Cookies.set("token", t);
          setToken(t);
          console.log("res: ", res);
          if (goBack) {
            navigate(-1);
            setGoBack(false);
          } else {
            navigate("/");
          }
        }
      })
      .catch((err) => {
        //handle error
        setLoading(false);
        console.log(err);
        //console.log(err.response.data.error);
      });
  };

  const signUp = (userData) => {
    setLoading(true);

    axios
      .post(signUpURL, userData)
      .then((res) => {
        setLoading(false);

        if (!res.data.error) {
          //handle success
          let t = res.data.token;

          localStorage.setItem("token", t);
          Cookies.set("token", t);
          setToken(t);
          console.log("res: ", res);
          if (goBack) {
            navigate(-1);
            setGoBack(false);
          } else {
            navigate("/");
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
    if (DT.role === "user") {
      axios({
        method: "get",
        url: process.env.REACT_APP_API_URL + "users/" + DT.id,
      })
        .then((response) => {
          //handle success
          if (!response.data.error) {
            setUser(response.data);
          }
        })
        .catch((err) => {
          //handle error
          console.log(err);
        });
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
    console.log("Logged OUT");
  };

  // Add intercepors when the site opens
  React.useEffect(() => {
    let t = Cookies.get("token");
    setToken(t);
    return () => {
      axios.interceptors.request.eject(jwtInterceptor);
    };
  }, []);

  // Get logged User every time the token changes
  React.useEffect(() => {
    if (token) {
      getUser();
    }
    return () => {};
  }, [token]);

  // Add interceptors that change added token
  React.useEffect(() => {
    jwtInterceptor();
  }, [jwtInterceptor]);

  return (
    <AuthContext.Provider
      value={{
        token,
        decodedToken,
        user,
        signUp,
        logIn,
        logOut,
        isLoading,
        goBack,
        setGoBack,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export default AuthContext;
