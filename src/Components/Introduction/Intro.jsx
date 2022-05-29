import { Splide, SplideSlide } from "@splidejs/react-splide";
import React from "react";
import "@splidejs/react-splide/css";
import "./Intro.css";

function Intro() {
  
  return (
    <div id="intro" className="intro">
      <div className="intro-title">
        <h2> Monnaie de Tunisie </h2>
        <p> Bienvenue chez </p>
        <p> Le Musée de la Monnaie de Tunisie</p>
        <p> La musée numismatique qui situé en plein centre de Tunis.</p>
        <p></p>
      </div>

      <Splide
        options={{
          rewind: true,
          autoplay: true,
          pagination: false,
          interval: 5000,
        }}
        aria-label="My Favorite Images"
      >
        <SplideSlide>
          <div className="intro-img img1"></div>
        </SplideSlide>
        <SplideSlide>
          <div className="intro-img img2"></div>
        </SplideSlide>
        <SplideSlide>
          <div className="intro-img img3"></div>
        </SplideSlide>
      </Splide>
    </div>
  );
}

export default Intro;
