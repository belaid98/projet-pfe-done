import React from "react";
import CenteredModal from "Components/Modal/CenteredModal";
import "./Axe.css";
import "./AxeModal.css";
import Detail from "./AxeDetail/Detail";
import PeriodeContext from "Services/PeriodeContext";
import PeriodeImageList from "./PeriodeImageList";
import CardMedia from "@mui/material/CardMedia";
import { Button } from "@mui/material";

function AxeBillete(props) {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [billets, setBillets] = React.useState([]);
  const [item, setItem] = React.useState(null);
  const [periode, setperiode] = React.useState({
    _id: 0,
    date: "unknown",
    title: "title",
    details: "nothing",
  });

  const { historiqueBilletes, getBilletesPeriodes, getBilletsParPeriode } =
    React.useContext(PeriodeContext);

  React.useEffect(() => {
    getBilletesPeriodes();
    return () => {};
  }, []);

  React.useEffect(() => {
    if (periode && periode._id !== 0) {
      getBilletsParPeriode(periode._id).then((res) => {
        res.map((r) => {
          if (r.front_image) {
            let url = process.env.REACT_APP_API_URL + "billet_images/";
            r.front_image = url + r.front_image;
          }
          if (r.back_image) {
            let url = process.env.REACT_APP_API_URL + "billet_images/";
            r.back_image = url + r.back_image;
          }
        });
        setBillets(res);
        console.log("BILLETS PAR PERIODE: ", res);
      });
    }
    return () => {};
  }, [periode]);

  return (
    <div>
      <CenteredModal
        isOpen={modalOpen}
        onHide={() => {
          setModalOpen(false);
          setTimeout(() => {
            setperiode({
              _id: 0,
              date: "unknown",
              title: "title",
              details: "Lorem",
            });
            setItem(null);
          }, 1000);
        }}
        title={periode.title}
        classes="axe-modal"
      >
        <div className="flex">
          {billets.length > 0 ? (
            <PeriodeImageList items={billets} setItem={setItem} />
          ) : (
            ""
          )}
          <div
            style={{ width: "500px", minHeight: "150px", textAlign: "center" }}
          >
            {item ? (
              <div
                className="flex-column space-between"
                style={{ height: "100%" }}
              >
                <div style={{ margin: "20px" }}>
                  <div className="flip-box flip-width">
                    <div className="flip-box-inner">
                      <div className="flip-box-front">
                        {item.front_image ? (
                          <CardMedia
                            component="img"
                            height="194"
                            image={item.front_image}
                            alt={item.libele}
                          />
                        ) : (
                          <CardMedia
                            component="img"
                            height="194"
                            image={"./assets/placeholder.png"}
                            alt={"placeholder"}
                          />
                        )}
                      </div>
                      <div className="flip-box-back">
                        {item.back_image ? (
                          <CardMedia
                            component="img"
                            height="194"
                            image={item.back_image}
                            alt={item.libele}
                          />
                        ) : (
                          <CardMedia
                            component="img"
                            height="194"
                            image={"./assets/placeholder.png"}
                            alt={"placeholder"}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <p>{item.description}</p>
                <div className="justify-end">
                  <Button
                    variant="outlined"
                    color="warning"
                    onClick={() => {
                      setItem(null);
                    }}
                  >
                    Retour
                  </Button>
                </div>
              </div>
            ) : (
              <div
                style={{ height: "100%" }}
                className="flex-column space-between"
              >
                <div></div>
                <div>
                  <h5 style={{ marginBottom: "20px" }}>
                    Details sur la periode
                  </h5>
                  <h3>{periode.details}</h3>
                </div>
                <div></div>
              </div>
            )}
          </div>
        </div>
      </CenteredModal>

      <h4 className="axh2">Historique du Billete en Tunisie</h4>
      <div className="container">
        <div className="timeline">
          <ul>
            {historiqueBilletes.map((element) => (
              <li key={element._id}>
                <Detail
                  history={element}
                  show={() => {
                    setModalOpen(true);
                    setperiode(element);
                  }}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AxeBillete;
