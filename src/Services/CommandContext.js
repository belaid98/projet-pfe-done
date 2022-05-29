import axios from "axios";
import React from "react";

const CommandContext = React.createContext();

export function CommandProvider({ children }) {
  const [commandes, setCommandes] = React.useState([]);
  const [isLoading, setLoading] = React.useState(false);

  const commandeURL = process.env.REACT_APP_API_URL + "commands/";

  const addCommande = (Json) => {
    setLoading(true);
    axios
      .post(commandeURL, Json)
      .then((response) => {
        setLoading(false);

        if (response && !response.data.error) {
          setCommandes((prevState) => [...prevState, response.data]);
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

  const validateCommande = async (_id) => {
    try {
      const response = await axios({
        method: "patch",
        url: commandeURL + _id,
      });
      //handle success
      if (response && !response.data.error) {
        getCommandes();
      }
    } catch (err) {
      //handle error
      console.log(err);
    }
  };

  const getCommandes = async () => {
    setLoading(true);
    try {
      const response = await axios({
        method: "get",
        url: commandeURL,
      });
      //handle success
      setLoading(false);
      if (response && !response.data.error) {
        setCommandes(response.data);
      }
      console.log(response);
    } catch (err) {
      //handle error
      console.log(err);
    }
  };

  return (
    <CommandContext.Provider
      value={{
        isLoading,
        commandes,
        addCommande,
        validateCommande,
        getCommandes,
      }}
    >
      {children}
    </CommandContext.Provider>
  );
}
export default CommandContext;
