import { useEffect, useState } from "react";
import axios from "axios";
import { Alert } from "@mui/material";
import { AlertSnack } from "Components/AlertSnack/AlertSnack";

const ErrorInterceptor = ({ children, logOut }) => {
  const [open, setOpen] = useState(false);
  const [openErr, setOpenErr] = useState(false);
  const [response, setResponse] = useState(null);
  const [err, setErr] = useState(null);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    setOpenErr(false);
  };

  /* useEffect(() => jwtInterceptor(token), [token]); */
  useEffect(() => {
    axios.interceptors.response.use(
      (response) => {
        console.log("success:", response);

        if (response.config.method !== "get") {
          setOpen(false);
          setOpenErr(false);
          setResponse(response);
          setOpen(true);
        }
        return response;
      },
      async (error) => {
        console.log("err :", error.response);
        setOpen(false);
        setOpenErr(false);
        setErr(error.response);
        setOpenErr(true);
        if (error.response.status === 403 || error.response.status === 401) {
          // auto logout if 401 response returned from api
          logOut();
        }
      }
    );
    return function clean() {
      console.log("DONE");
    };
  }, []);

  return (
    <>
      {/* {open && response.config.method !== "get" ? (
        <AlertSnack
          open={open}
          autoHideDuration={6000}
          handleClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            {response && response.data.success
              ? response.data.success
              : response && response.data.role
              ? "Logged In"
              : "Success!!"}
          </Alert>
        </AlertSnack>
      ) : (
        ""
      )} */}
      {open && (
        <AlertSnack
          open={open}
          autoHideDuration={6000}
          handleClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            {response && response.data.success
              ? response.data.success
              : "Success!!"}
          </Alert>
        </AlertSnack>
      )}
      {openErr && (
        <AlertSnack
          open={openErr}
          autoHideDuration={6000}
          handleClose={handleClose}
        >
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            {err && err.data && err.data.error && err.data.error.message
              ? "Server Error: " + err.data.error.message
              : err && err.data.error
              ? err.data.error
              : "Erreur"}
          </Alert>
        </AlertSnack>
      )}
      {children}
    </>
  );
};

export default ErrorInterceptor;
