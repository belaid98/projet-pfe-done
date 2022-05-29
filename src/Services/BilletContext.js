import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const BilletContext = React.createContext();

export function BilletProvider({ children }) {
  const [billets, setBillets] = React.useState([]);
  const [isLoading, setLoading] = React.useState(false);

  const navigate = useNavigate();

  const billetURL = process.env.REACT_APP_API_URL + "billets/";
  const FormDataConfig = { "Content-Type": "multipart/form-data" };

  const addBillet = (FormData) => {
    setLoading(true);
    axios
      .post(billetURL, FormData, FormDataConfig)
      .then((response) => {
        setLoading(false);
        if (!response.data.error) {
          setBillets((prevState) => [...prevState, response.data]);
          return response;
        }
        //handle success
        console.log(response);
      })
      .catch((err) => {
        setLoading(false);
        //handle error
        console.log("Hey", err);
      });
  };
  const updateBillet = async (FormData, _id) => {
    try {
      const response = await axios({
        method: "put",
        url: billetURL + _id,
        data: FormData,
        headers: FormDataConfig,
      });
      //handle success
      if (!response.data.error) {
        getBillets();
        navigate("../billets");
        return response;
      }
    } catch (err) {
      //handle error
      console.log(err);
    }
  };
  const removeBillet = async (_id) => {
    setLoading(true);
    try {
      const response = await axios({
        method: "delete",
        url: billetURL + _id,
      });
      setLoading(false);
      //handle success
      if (response.data.success) {
        console.log("DELETED :  ", response);
        setBillets(billets.filter((item) => item._id !== _id));
        return response;
      }
    } catch (err) {
      //handle error
      console.log(err);
    }
  };

  const getBillet = async (_id) => {
    setLoading(true);
    return axios({
      method: "get",
      url: billetURL + _id,
    })
      .then((response) => {
        setLoading(false);
        //handle success
        if (!response.data.error) {
          return response.data;
        }
      })
      .catch((err) => {
        //handle error
        console.log(err);
      });
  };

  const getBillets = async () => {
    setLoading(true);
    try {
      const response = await axios({
        method: "get",
        url: billetURL,
      });
      //handle success
      setLoading(false);
      if (!response.data.error) {
        setBillets(response.data);
        return response;
      }
      console.log(response);
    } catch (err) {
      //handle error
      console.log(err);
    }
  };

  const getBilletsAVendre = async () => {
    setLoading(true);
    try {
      const response = await axios({
        method: "get",
        url: billetURL,
      });
      //handle success
      setLoading(false);
      if (!response.data.error) {
        setBillets(response.data.filter((p) => p.a_vendre === true));
        return response;
      }
      console.log(response);
    } catch (err) {
      //handle error
      console.log(err);
    }
  };

  return (
    <BilletContext.Provider
      value={{
        billets,
        isLoading,
        addBillet,
        updateBillet,
        removeBillet,
        getBilletsAVendre,
        getBillets,
        getBillet,
      }}
    >
      {children}
    </BilletContext.Provider>
  );
}
export default BilletContext;
