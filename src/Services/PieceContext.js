import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const PieceContext = React.createContext();

export function PieceProvider({ children }) {
  const [pieces, setPieces] = React.useState([]);
  const [isLoading, setLoading] = React.useState(false);

  const navigate = useNavigate();

  const pieceURL = process.env.REACT_APP_API_URL + "pieces/";

  const FormDataConfig = { "Content-Type": "multipart/form-data" };

  const addPiece = (FormData) => {
    setLoading(true);
    axios
      .post(pieceURL, FormData, FormDataConfig)
      .then((response) => {
        setLoading(false);

        if (!response.data.error) {
          setPieces((prevState) => [...prevState, response.data]);
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

  const updatePiece = async (FormData, _id) => {
    try {
      const response = await axios({
        method: "put",
        url: pieceURL + _id,
        data: FormData,
        headers: FormDataConfig,
      });
      //handle success
      if (!response.data.error) {
        getPieces();
        navigate("../pieces");
      }
    } catch (err) {
      //handle error
      console.log(err);
    }
  };

  const removePiece = async (_id) => {
    setLoading(true);
    try {
      const response = await axios({
        method: "delete",
        url: pieceURL + _id,
      });
      setLoading(false);
      //handle success
      if (!response.data.error) {
        setPieces(pieces.filter((item) => item._id !== _id));
      }
      console.log(response);
    } catch (err) {
      //handle error
      console.log(err);
    }
  };

  const getPieces = async () => {
    setLoading(true);
    try {
      const response = await axios({
        method: "get",
        url: pieceURL,
      });
      //handle success
      setLoading(false);
      if (!response.data.error) {
        setPieces(response.data);
      }
      console.log(response);
    } catch (err) {
      //handle error
      console.log(err);
    }
  };

  const getPiecesAVendre = async () => {
    setLoading(true);
    try {
      const response = await axios({
        method: "get",
        url: pieceURL,
      });
      //handle success
      setLoading(false);
      if (!response.data.error) {
        setPieces(response.data.filter((p) => p.a_vendre === true));
      }
      console.log(response);
    } catch (err) {
      //handle error
      console.log(err);
    }
  };

  const getPiece = async (_id) => {
    setLoading(true);
    return axios({
      method: "get",
      url: pieceURL + _id,
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
    <PieceContext.Provider
      value={{
        pieces,
        isLoading,
        addPiece,
        updatePiece,
        removePiece,
        getPiecesAVendre,
        getPieces,
        getPiece,
      }}
    >
      {children}
    </PieceContext.Provider>
  );
}
export default PieceContext;
