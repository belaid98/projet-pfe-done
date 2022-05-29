import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OuvrageContext = React.createContext();

export function OuvrageProvider({ children }) {
  const [ouvrages, setOuvrages] = React.useState([]);
  const [isLoading, setLoading] = React.useState(false);

  const navigate = useNavigate();

  const ouvrageURL = process.env.REACT_APP_API_URL + "ouvrages/";

  const FormDataConfig = { "Content-Type": "multipart/form-data" };

  const addOuvrage = (FormData) => {
    setLoading(true);
    axios
      .post(ouvrageURL, FormData, FormDataConfig)
      .then((response) => {
        setLoading(false);
        //handle success
        if (!response.data.error) {
          setOuvrages((prevState) => [...prevState, response.data]);
        }
        console.log(response);
      })
      .catch((err) => {
        setLoading(false);
        //handle error
        console.log("Hey", err);
      });
  };

  const updateOuvrage = async (FormData, _id) => {
    try {
      const response = await axios({
        method: "put",
        url: ouvrageURL + _id,
        data: FormData,
        headers: FormDataConfig,
      });
      ///handle success
      if (!response.data.error) {
        getOuvrages();
        navigate("../ouvrages");
      }
      console.log(response);
    } catch (err) {
      //handle error
      console.log(err);
    }
  };
  const removeOuvrage = async (_id) => {
    setLoading(true);
    try {
      const response = await axios({
        method: "delete",
        url: ouvrageURL + _id,
      });
      setLoading(false);
      //handle success
      if (!response.data.error) {
        setOuvrages(ouvrages.filter((item) => item._id !== _id));
        console.log(response);
      }
    } catch (err) {
      //handle error
      console.log(err);
    }
  };

  const getOuvrages = async () => {
    setLoading(true);
    try {
      const response = await axios({
        method: "get",
        url: ouvrageURL,
      });
      //handle success
      setLoading(false);
      if (!response.data.error) {
        setOuvrages(response.data);
      }
      console.log(response);
    } catch (err) {
      //handle error
      console.log(err);
    }
  };

  const getOuvrage = async (_id) => {
    setLoading(true);
    return axios({
      method: "get",
      url: ouvrageURL + _id,
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

  return (
    <OuvrageContext.Provider
      value={{
        isLoading,
        ouvrages,
        addOuvrage,
        updateOuvrage,
        removeOuvrage,
        getOuvrages,
        getOuvrage,
      }}
    >
      {children}
    </OuvrageContext.Provider>
  );
}

export default OuvrageContext;
