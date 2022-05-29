import React from "react";
import { SplideSlide } from "@splidejs/react-splide";
import OuvrageCard from "Components/Card/OuvrageCard";

export default function OuvragesList(props) {
  return (
    <>
      {props.items.map((item) => {
        item.collection = props.collection;
        item.url = process.env.REACT_APP_API_URL + "ouvrage_images/";
        item.quantite = 1;
        return (
          <SplideSlide key={item._id}>
            <OuvrageCard
              item={item}
              classes="custom-card"
              show={() => {
                props.setModalShow(true);
                props.setModalProduct(item);
              }}
            />
          </SplideSlide>
        );
      })}
    </>
  );
}
OuvragesList.defaultProps = {
  items: [],
};
