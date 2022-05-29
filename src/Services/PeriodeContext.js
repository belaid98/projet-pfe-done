import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const PeriodeContext = React.createContext();

export function PeriodeProvider({ children }) {
  const [historiqueBilletes, setHistoriqueBilletes] = React.useState([]);
  const [historiqueMonnaies, setHistoriqueMonnaies] = React.useState([]);
  const [periodes, setPeriodes] = React.useState([]);
  const [isLoading, setLoading] = React.useState(false);

  const navigate = useNavigate();

  const periodeURL = process.env.REACT_APP_API_URL + "periodes/";

  
  React.useEffect(() => {
    let piecePer = periodes.filter((item) => item.piece === true);
    let billetPer = periodes.filter((item) => item.piece === false);
    setHistoriqueMonnaies(piecePer);
    setHistoriqueBilletes(billetPer);
  }, [periodes]);

  const addPeriode = (Json) => {
    setLoading(true);
    axios
      .post(periodeURL, Json)
      .then((response) => {
        setLoading(false);

        if (response && !response.data.error) {
          setPeriodes((prevState) => [...prevState, response.data]);
          if (response.data.piece === true) {
            getMonnaiesPeriodes();
          } else if (response.data.piece === false) {
            getBilletesPeriodes();
          }
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

  const updatePeriode = async (Json, _id) => {
    try {
      const response = await axios({
        method: "put",
        url: periodeURL + _id,
        data: Json,
      });
      //handle success
      if (response && !response.data.error) {
        if (response.data.piece === true) {
          getMonnaiesPeriodes();
        } else if (response.data.piece === false) {
          getBilletesPeriodes();
        }
        getPeriodes();
        navigate("../periodes");
      }
    } catch (err) {
      //handle error
      console.log(err);
    }
  };

  const removePeriode = async (_id) => {
    setLoading(true);
    try {
      const response = await axios({
        method: "delete",
        url: periodeURL + _id,
      });
      setLoading(false);
      //handle success
      if (response && !response.data.error) {
        setPeriodes(periodes.filter((item) => item._id !== _id));

        setHistoriqueMonnaies(
          historiqueMonnaies.filter((item) => item._id !== _id)
        );
        setHistoriqueBilletes(
          historiqueBilletes.filter((item) => item._id !== _id)
        );
      }
      console.log(response);
    } catch (err) {
      //handle error
      console.log(err);
    }
  };

  const getPeriode = async (_id) => {
    setLoading(true);
    return axios({
      method: "get",
      url: periodeURL + _id,
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

  const getPeriodes = async () => {
    setLoading(true);
    try {
      const response = await axios({
        method: "get",
        url: periodeURL,
      });
      //handle success
      setLoading(false);
      if (response && !response.data.error) {
        setPeriodes(response.data);
        setHistoriqueMonnaies(
          response.data.filter((item) => item.piece === true)
        );
        setHistoriqueBilletes(
          response.data.filter((item) => item.piece === false)
        );
      }
      console.log(response);
    } catch (err) {
      //handle error
      console.log(err);
    }
  };

  const getBilletesPeriodes = async () => {
    setLoading(true);
    try {
      const response = await axios({
        method: "get",
        url: periodeURL + "billet",
      });
      //handle success
      setLoading(false);
      if (!response.data.error) {
        setHistoriqueBilletes(response.data);
      }
      console.log(response);
    } catch (err) {
      //handle error
      console.log(err);
    }
  };

  const getMonnaiesPeriodes = async () => {
    setLoading(true);
    try {
      const response = await axios({
        method: "get",
        url: periodeURL + "piece",
      });
      //handle success
      setLoading(false);
      if (!response.data.error) {
        setHistoriqueMonnaies(response.data);
      }
      console.log(response);
    } catch (err) {
      //handle error
      console.log(err);
    }
  };

  const getPiecesParPeriode = async (_id) => {
    setLoading(true);
    return axios({
      method: "get",
      url: periodeURL + _id + "/pieces",
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

  const getBilletsParPeriode = async (_id) => {
    setLoading(true);
    return axios({
      method: "get",
      url: periodeURL + _id + "/billets",
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
    <PeriodeContext.Provider
      value={{
        historiqueBilletes,
        historiqueMonnaies,
        isLoading,
        periodes,
        addPeriode,
        updatePeriode,
        removePeriode,
        getPeriodes,
        getPeriode,
        getBilletesPeriodes,
        getMonnaiesPeriodes,
        getBilletsParPeriode,
        getPiecesParPeriode,
      }}
    >
      {children}
    </PeriodeContext.Provider>
  );
}
export default PeriodeContext;
