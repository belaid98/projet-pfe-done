import React from "react";
import "./Boutique.css";
import Slide from "@mui/material/Slide";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import ItemSlider from "Components/ItemSlider/ItemSlider";
import CustomCard from "Components/Card/CustomCard";
import CenteredModal from "Components/Modal/CenteredModal";
import Items from "Components/ItemSlider/Items";
import OuvragesList from "Components/ItemSlider/OuvragesList";
import TextField from "@mui/material/TextField";
import PanierContext from "Services/PanierContext";
import OuvrageContext, { OuvrageProvider } from "Services/OuvrageContext";
import PieceContext, { PieceProvider } from "Services/PieceContext";
import BilletContext, { BilletProvider } from "Services/BilletContext";
import AuthContext from "Services/AuthContext";
import { useNavigate } from "react-router-dom";

function BoutiqueOuvrages(props) {
  const { ouvrages, getOuvrages } = React.useContext(OuvrageContext);
  React.useEffect(() => {
    if (ouvrages.length === 0) {
      getOuvrages();
    }
    return () => {};
  }, []);
  const { setModalProduct, setModalShow } = props;
  return (
    <>
      <OuvragesList
        items={ouvrages}
        collection="ouvrages"
        setModalProduct={setModalProduct}
        setModalShow={() => {
          setModalShow(true);
        }}
      />
    </>
  );
}
function BoutiquePieces(props) {
  const { pieces, getPiecesAVendre } = React.useContext(PieceContext);
  React.useEffect(() => {
    if (pieces.length === 0) {
      getPiecesAVendre();
    }
    return () => {};
  }, []);
  const { setModalProduct, setModalShow } = props;
  return (
    <>
      <div className="pieces">
        {pieces.map((item) => {
          item.collection = "pieces";
          item.url = process.env.REACT_APP_API_URL + "piece_images/";
          item.quantite = 1;
          return (
            <CustomCard
              key={item._id}
              item={item}
              classes="custom-card piece-card hover-effect"
              show={() => {
                setModalShow(true);
                setModalProduct(item);
              }}
            />
          );
        })}
      </div>
    </>
  );
}
function BoutiqueBillets(props) {
  const { billets, getBilletsAVendre } = React.useContext(BilletContext);
  React.useEffect(() => {
    if (billets.length === 0) {
      getBilletsAVendre();
    }
    return () => {};
  }, []);
  const { setModalProduct, setModalShow } = props;
  return (
    <>
      <Items
        items={billets}
        collection="billets"
        image_path="billet_images/"
        setModalProduct={setModalProduct}
        setModalShow={() => {
          setModalShow(true);
        }}
      />
    </>
  );
}
export default function BoutiquePage() {
  const { addToPanier, panier } = React.useContext(PanierContext);
  const { user, setGoBack } = React.useContext(AuthContext);
  const navigate = useNavigate();
  const [modalShow, setModalShow] = React.useState(false);
  const [modify, setModify] = React.useState(false);
  const [modalProduct, setModalProduct] = React.useState({
    _id: 0,
    date: "unknown",
    libele: "libele",
    front_image: "",
    description: "Lorem",
  });

  const redirect = () => {
    navigate("/sign-in");
    setGoBack(true);
  };
  const handleChange = (e) => {
    setModalProduct({ ...modalProduct, quantite: e.target.value });
  };
  const addPanier = () => {
    addToPanier(modalProduct);
    setModalShow(false);
    setModify(false);
  };
  React.useEffect(() => {
    if (modalProduct && modalProduct._id !== 0) {
      switch (modalProduct.collection) {
        case "billets":
          {
            let index = panier.billets.findIndex(
              (billet) => billet._id === modalProduct._id
            );
            if (index >= 0) {
              setModify(true);
            }
          }
          break;
        case "pieces":
          {
            let index = panier.pieces.findIndex(
              (piece) => piece._id === modalProduct._id
            );
            if (index >= 0) {
              setModify(true);
            }
          }
          break;
        case "ouvrages":
          {
            let index = panier.ouvrages.findIndex(
              (ouvrage) => ouvrage._id === modalProduct._id
            );
            if (index >= 0) {
              setModify(true);
            }
          }
          break;
        default:
          console.log("No collection");
      }
    }
    return () => {};
  }, [modalProduct]);

  return (
    <>
      <CenteredModal
        isOpen={modalShow}
        onHide={() => {
          setModalShow(false);
          setTimeout(() => {
            setModalProduct({});
            setModify(false);
          }, 1000);
        }}
        title="Ajout au Panier"
        classes="ajout-panier"
      >
        <div className="flex-column">
          <img
            src={
              modalProduct.front_image
                ? modalProduct.url + modalProduct.front_image
                : "./assets/placeholder.png"
            }
            className="ajout-panier-img"
            alt=""
          />
          <p>{modalProduct.description}</p>
        </div>
        {user ? (
          <div className="justify-between">
            {!modify ? (
              <>
                <TextField
                  type="number"
                  label="Quantité"
                  variant="standard"
                  value={modalProduct.quantite ?? 1}
                  inputProps={{
                    min: 1,
                    max: modalProduct.stock,
                  }}
                  onChange={handleChange}
                />
                <strong style={{ margin: "auto" }}>
                  {modalProduct.quantite
                    ? modalProduct.prix * modalProduct.quantite
                    : modalProduct.prix}{" "}
                  DT
                </strong>
                <Button
                  startIcon={<AddIcon />}
                  aria-label="add"
                  color="primary"
                  style={{ margin: "10px" }}
                  onClick={addPanier}
                  size="medium"
                >
                  Ajout
                </Button>
              </>
            ) : (
              <div style={{ margin: "20px auto", color: "red" }}>
                Changer la quantité dans le panier
              </div>
            )}
          </div>
        ) : (
          <Button
            startIcon={<LoginRoundedIcon />}
            aria-label="add"
            color="primary"
            style={{ margin: "10px" }}
            onClick={redirect}
            size="medium"
          >
            Connectez-vous
          </Button>
        )}
      </CenteredModal>
      <Slide in direction="down" timeout={600} mountOnEnter unmountOnExit>
        <div id="boutique" className="padding-top">
          <h1 className="h1">E-Boutique</h1>
          <div className="prod-slide clear">
            <h2 className="h2">Ouvrages</h2>
            <ItemSlider>
              <OuvrageProvider>
                <BoutiqueOuvrages
                  setModalProduct={setModalProduct}
                  setModalShow={setModalShow}
                />
              </OuvrageProvider>
            </ItemSlider>
          </div>

          <div className="prod-slide clear">
            <h2 className="h2">Billets</h2>
            <ItemSlider interval={3000}>
              <BilletProvider>
                <BoutiqueBillets
                  setModalProduct={setModalProduct}
                  setModalShow={setModalShow}
                />
              </BilletProvider>
            </ItemSlider>
          </div>

          <div className="pieces-container">
            <h2 className="h2">Pieces</h2>
            <PieceProvider>
              <BoutiquePieces
                setModalProduct={setModalProduct}
                setModalShow={setModalShow}
              />
            </PieceProvider>
          </div>
        </div>
      </Slide>
    </>
  );
}
