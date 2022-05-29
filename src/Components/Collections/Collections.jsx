import React from "react";
import "./Collections.css";
import CenteredModal from "Components/Modal/CenteredModal";

function Collections() {
  const [modalOpen, setModalOpen] = React.useState(false);
  const openDialog = () => setModalOpen(true);
  const closeDialog = () => setModalOpen(false);
  const [collections, setCollections] = React.useState([]);
  let pieces_images = ["./assets/col1.jpg", "./assets/col2.jpg", "./assets/col3.jpg", "./assets/col4.jpg"];
  let billet_images =["./assets/billet1.jpg","./assets/billet2.jpg","./assets/billet3.jpg","./assets/billet4.jpg"];
  let ouvrage_images =["./assets/ouvrage1.png","./assets/ouvrage2.png","./assets/ouvrage3.png"];
  let medailles_images =["./assets/medaille1.jpg","./assets/medaille2.jpg","./assets/medaille3.jpg","./assets/medaille4.jpg",]

    

  const handleClose=() => {
    console.log(modalOpen);
    closeDialog();
    setTimeout(() => { 
    setCollections([]);
    }, 500);
  }

  return (
    <div>
      <CenteredModal
        isOpen={modalOpen}
        onHide={handleClose}
        title="Galerie"
      >
        <p>
          <div>
            {collections.map((col) => (
              <img class="img_collection" src={col} alt="placeholder" />
            ))}
          </div>
        </p>
      </CenteredModal>


      <h1 className="axh2">Collections</h1>
      <div className="flex-container">
        <div className="flex-item-left">
          <h2>Les Pièces</h2>
          <br />
          <p>
            La boutique du Musée de
            La Monnaie de la BCT vous invite
            à découvrir une large panoplie d’articles et de produits destinés aussi bien aux experts numismates, aux collectionneurs de pièces commémoratives, qu’aux passionnés de lectures qui veulent approfondir leur connaissance en histoire de la monnaie et de l’économie tunisiennes dans une dimension méditerranéenne. Sans oublier ceux qui veulent rapporter un petit souvenir de leur visite ou offrir un cadeau à leurs proches.
          </p>
          <br />
          <br />

          <div className="justify-end">
            <button
              id="btn-collection"
              className="ease botton botton-color"
              type="button"
              onClick={() => {
                openDialog()
                setCollections(pieces_images)
                
              }}
            >
              Galerie
            </button>

          </div>
        </div>
        <div className="flex-item-right">
          <div className="ring">
            <img className="img_col2" src="./assets/piece.png" alt="" />
          </div>
        </div>
      </div>


      <div className="flex-container">

        <div className="flex-item-left">
          <h2>Les billets</h2>
          <br />
          <p>
            La boutique du Musée de
            La Monnaie de la BCT vous invite
            à découvrir une large panoplie d’articles et de produits destinés aussi bien aux experts numismates, aux collectionneurs de billet commémoratives, qu’aux passionnés de lectures qui veulent approfondir leur connaissance en histoire de la monnaie et de l’économie tunisiennes dans une dimension méditerranéenne. Sans oublier ceux qui veulent rapporter un petit souvenir de leur visite ou offrir un cadeau à leurs proches.

          </p>
          <br />
          <div className="justify-end">
            <button
              id="btn-collection"
              className="ease botton botton-color"
              type="button"
              onClick={() => {
                openDialog()
                setCollections(billet_images)
                
              }}
            >
             Galerie
            </button>
          </div>
        </div>
        <div className="flex-item-right">
          <div className="ring">
            <img className="img_col2" src="./assets/billete.jpg" alt="" />
          </div>
        </div>
      </div>

      <br />
      <br />

      <div className="flex-container">
        <div className="flex-item-left">
          <h2>Les ouvrages</h2>
          <br />
          <p>
            les 3 livres soit 40 € un seul livre
            Depuis sa création en Lydie, au VIIe siècle av. J.-C., la monnaie en tant que outil et moyen d’échange fait partie de l'histoire de l'humanité. L’ouvrage « Numismatique et Histoire de la Monnaie en Tunisie (Collections Monétaires de la Banque Centrale de la Tunisie) » offre un choix exceptionnel des espèces ayant circulé en Tunisie durant plus de vingt-six siècle depuis la frappe du premier monnayage par Carthage vers 400 av. J.-C. jusqu’à l’émission des monnaies et des billets de l’époque contemporaine. Ce catalogue ou plutôt beau livre didactique

          </p>
          <br />
          <br />
          <div className="justify-end">
            <button
              id="btn-collection"
              className="ease botton botton-color"
              type="button"
              onClick={() => {
                openDialog()
                setCollections(ouvrage_images)
                
              }}
            >
              Galerie
            </button>
          </div>
        </div>
        <div className="flex-item-right">
          <div className="ring">
            <img className="img_col2" src="./assets/ouvrages.PNG" alt="" />
          </div>
        </div>
      </div>

      <br />
      <br />

      <div className="flex-container">
        <div className="flex-item-left">
          <h2>Les médailles et les pièces commémoratives</h2>
          <br />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
            dolore exercitationem, a molestias fuga corrupti.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias,
            ipsam.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias,
            ipsam.
          </p>
          <br />
          <br />
          <div className="justify-end">
            <button
              id="btn-collection"
              className="ease botton botton-color"
              type="button"
              onClick={() => {
                openDialog()
                setCollections(medailles_images)
                
              }}
            >
              Galerie
            </button>

          </div>
        </div>
        <div className="flex-item-right">
          <div className="ring">
            <img className="img_col2" src="./assets/midaille.jpg" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Collections;
