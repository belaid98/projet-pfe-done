import React from "react";
import { SplideSlide } from "@splidejs/react-splide";
import CustomCard from "Components/Card/CustomCard";

function Items(props) {
  return (
    <>
      {props.items.map((item) => {
        item.collection = props.collection;
        item.url = process.env.REACT_APP_API_URL + props.image_path;
        item.quantite = 1;
        return (
          <SplideSlide key={item._id}>
            <CustomCard
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
Items.defaultProps = {
  items: [],
};
export default Items;
