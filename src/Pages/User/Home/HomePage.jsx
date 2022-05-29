import React from "react";

import Intro from "Components/Introduction/Intro";
import Hassan from "Components/Hassan/Hassan";
import { Slide } from "@mui/material";
import { PeriodeProvider } from "Services/PeriodeContext";
//import LoadingContained from "Components/Loading/LoadingContained";
import Collections from "Components/Collections/Collections";
import AxeBillete from "Components/Axes/AxeBillete";
import AxeMonaie from "Components/Axes/AxeMonaie";

function HomePage() {
  return (
    <Slide in direction="up" mountOnEnter unmountOnExit>
      <div id="home" className="padding-top">
        <section id="A_propos_nous">
          <Intro />
          <Hassan />
        </section>
        <PeriodeProvider>
          <section id="Monnaies">
            <AxeMonaie />
            <AxeBillete />
          </section>
        </PeriodeProvider>
        <section id="Collections">
          <Collections />
        </section>
        <section id="Contact"></section>
      </div>
    </Slide>
  );
}

export default HomePage;
