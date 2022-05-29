import React from "react";

const PanierContext = React.createContext();

export function PanierProvider({ children }) {
  const [total, setTotal] = React.useState(0);
  const [panier, setPanier] = React.useState({
    billets: [],
    pieces: [],
    ouvrages: [],
  });

  const addToPanier = (item) => {
    switch (item.collection) {
      case "billets":
        {
          let index = panier.billets.findIndex(
            (billet) => billet._id === item._id
          );
          if (index >= 0) {
            panier.billets[index].quantite =
              Number(item.quantite) + Number(panier.billets[index].quantite);
          } else {
            setPanier((prevState) => ({
              ...panier,
              billets: [item, ...prevState.billets],
            }));
          }
        }
        break;
      case "pieces":
        {
          let index = panier.pieces.findIndex(
            (piece) => piece._id === item._id
          );
          if (index >= 0) {
            panier.pieces[index].quantite =
              Number(item.quantite) + Number(panier.pieces[index].quantite);
          } else {
            setPanier((prevState) => ({
              ...panier,
              pieces: [item, ...prevState.pieces],
            }));
          }
        }
        break;
      case "ouvrages":
        {
          let index = panier.ouvrages.findIndex(
            (ouvrage) => ouvrage._id === item._id
          );
          if (index >= 0) {
            panier.ouvrages[index].quantite =
              Number(item.quantite) + Number(panier.ouvrages[index].quantite);
          } else {
            setPanier((prevState) => ({
              ...panier,
              ouvrages: [item, ...prevState.ouvrages],
            }));
          }
        }
        break;
      default:
        console.log("No collection");
    }
  };

  React.useEffect(() => {
    let pTotal = 0;
    panier.ouvrages.forEach((ouvrage) => {
      pTotal += Number(ouvrage.prix * ouvrage.quantite);
    });

    panier.billets.forEach((billet) => {
      pTotal += Number(billet.prix * billet.quantite);
    });

    panier.pieces.forEach((piece) => {
      pTotal += Number(piece.prix * piece.quantite);
    });
    setTotal(pTotal);
  }, [panier]);

  const updateInPanier = (collection, item) => {
    switch (collection) {
      case "billets":
        setPanier({
          ...panier,
          billets: panier.billets.map((billet) =>
            billet._id === item._id ? { ...billet, item } : { ...billet }
          ),
        });
        break;
      case "pieces":
        setPanier({
          ...panier,
          pieces: panier.pieces.map((piece) =>
            piece._id === item._id ? { ...piece, item } : { ...piece }
          ),
        });
        break;
      case "ouvrages":
        setPanier({
          ...panier,
          ouvrages: panier.ouvrages.map((ouvrage) =>
            ouvrage._id === item._id ? { ...ouvrage, item } : { ...ouvrage }
          ),
        });
        break;
      default:
        console.log("No collection");
    }
  };

  const removeFromPanier = (collection, _id) => {
    switch (collection) {
      case "billets":
        setPanier({
          ...panier,
          billets: panier.billets.filter((item) => item._id !== _id),
        });
        break;
      case "pieces":
        setPanier({
          ...panier,
          pieces: panier.pieces.filter((item) => item._id !== _id),
        });
        break;
      case "ouvrages":
        setPanier({
          ...panier,
          ouvrages: panier.ouvrages.filter((item) => item._id !== _id),
        });
        break;
      default:
        console.log("No collection");
    }
  };

  return (
    <PanierContext.Provider
      value={{
        panier,
        total,
        addToPanier,
        updateInPanier,
        removeFromPanier,
      }}
    >
      {children}
    </PanierContext.Provider>
  );
}
export default PanierContext;
