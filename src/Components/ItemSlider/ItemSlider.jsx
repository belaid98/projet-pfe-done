import React from "react";
import { Splide } from "@splidejs/react-splide";

function ItemSlider(props) {
  const [prodNumber, setProdNumber] = React.useState(props.more);
  const responsiveResize = () => {
    if (
      window.innerWidth < props.largeWidth &&
      window.innerWidth >= props.mediumWidth
    ) {
      setProdNumber(props.medium);
    } else if (window.innerWidth >= props.largeWidth) {
      setProdNumber(props.more);
    } else {
      setProdNumber(props.less);
    }
  };
  //Re-render once the component loads
  //Re-render every time resize happens
  React.useEffect(() => {
    responsiveResize();
    window.addEventListener("resize", responsiveResize);

    return function cleanup() {
      window.removeEventListener("resize", responsiveResize);
    };
  }, []);
  return (
    <Splide
      options={{
        perPage: prodNumber,
        pagination: false,
        drag: "free",
        gap: "25px",
        autoplay: true,
        interval: props.interval,
        rewind: true,
      }}
      className="hover-effect"
    >
      {props.children}
    </Splide>
  );
}
ItemSlider.defaultProps = {
  largeWidth: 760,
  mediumWidth: 760,
  medium: 3,
  more: 3,
  less: 2,
  interval: 5000,
  items: [],
};
export default ItemSlider;
