import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

export default function PaymentForm() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Détails du paiement
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          Règlement par Virement bancaire*
          <br />
          En $US à notre compte: n°10 939 791 with (Citi US 33) <br />
          CITIBANK NEW YORK <br />
          En Euro à notre compte ouvert chez <br />
          DEUTSCH BANK FRANCFORT: IBAN:DE 09 5007 0010 0957 8303 00 <br />
          NOM:Banque Centrale de Tunisie <br />
          Code Swift :DEUTDEFF (*)
          <br />
          <br />
          Veuillez nous adresser par:
          <br /> Fax n° 216-71-340562 <br />
          E-mail (musee@bct.gov.tn) une copie de l'avis de crédit
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
