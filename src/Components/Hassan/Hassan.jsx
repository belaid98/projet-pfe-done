import React from "react";
import CenteredModal from "Components/Modal/CenteredModal";
import "./Hassan.css";

function Hassan() {
  const [modalOpen, setModalOpen] = React.useState(false);
  const openDialog = () => setModalOpen(true);
  const closeDialog = () => setModalOpen(false);
  return (
    <div>
      <CenteredModal
        isOpen={modalOpen}
        onHide={() => {
          console.log(modalOpen);
          closeDialog();
        }}
        title="Hassan, Collecteur de Monnaie"
      >
        <p>
        Abdelwaheb est issu d'une famille de dignitaires tribaux alliés aux beys de Tunis, les Charni : son grand-père paternel Abou Mohammed Abdelwaheb Ben Youssef El Charni faisait partie de la direction de la gendarmerie tribale, bach hamba en 1815, puis du protocole sous les règnes de Mahmoud Bey puis Ahmed Ier Bey ; son père Salah Ben Abdelwaheb, formé à la Zitouna et à l'école religieuse française de la médina, était caïd-gouverneur à Mahdia et accompagnait le général Husseïn comme traducteur. Son grand-père maternel d'origine turque, Ali Ben Mustapha, marié à une Française, Anaïs Ducrocq1, était l'un des proches collaborateurs du ministre Kheireddine Pacha2. Hassan Hosni Abdelwaheb est le frère cadet d'Ali Abdelwaheb, connu pour sa liaison avec Isabelle Eberhardt, 
        et le frère aîné du peintre Jilani Abdelwaheb (1890-1961).
        Après avoir étudié la médersa de la rue Sidi Almouahad à Tunis, Abdelwaheb rejoint une école primaire à Mahdia puis l’école française de la rue de Suède, à Tunis, où il obtient le certificat d'études primaires en 1899. Il poursuit ensuite ses études secondaires au lycée Sadiki, où il apprend l’arabe et la traduction, et achève ses études à l’École libre des sciences politiques à Paris. Après son retour, il travaille comme fonctionnaire à la direction de l’agriculture et du commerce, puis à la tête de la direction des forêts (1910) et de la direction des archives nationales ; ceci lui permet d’approfondir ses connaissances de l’histoire de la Tunisie à l’époque ottomane ainsi que d’archiver 
        et de répertorier les documents qui y sont relatifs3.
        </p>
      </CenteredModal>

      <section className="ease about">
        <div className="ease main">
          <img src="./assets/hassan.jpg" alt="hassan" />
          <div className="ease about-text">
            <h1>Hassan Hosny Abed Waheb</h1>
            <h5>
              Collecteur de <span>Monnaie</span>
            </h5>
            <p>
            Hassan Hosni Abdelwaheb, de son nom complet Hassan Hosni Ben Salah Ben Abdelwaheb Ben Youssef 
            Smadhi El Charni, né le 21 juin 1884 à Tunis et mort le 9 novembre 1968, 
            est un historien tunisien.
            </p>
            <button
              id="btn-hassan"
              className="ease botton botton-color"
              type="button"
              onClick={() => openDialog()}
            >
              Lire Plus
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Hassan;
