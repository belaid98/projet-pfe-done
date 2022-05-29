import React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useCommandFormControl } from "./FormControl";

export default function Review() {
  const { values, total } = useCommandFormControl();
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {values.panier.pieces.map((product, index) => (
          <ListItem key={index} sx={{ py: 1, px: 0 }}>
            <ListItemText
              primary={product.quantite + " " + product.libele}
              secondary={product.description}
            />
            <Typography variant="body2">
              {product.quantite * product.prix} DT
            </Typography>
          </ListItem>
        ))}
        {values.panier.billets.map((product, index) => (
          <ListItem key={index} sx={{ py: 1, px: 0 }}>
            <ListItemText
              primary={product.quantite + " " + product.libele}
              secondary={product.description}
            />
            <Typography variant="body2">
              {product.quantite * product.prix} DT
            </Typography>
          </ListItem>
        ))}
        {values.panier.ouvrages.map((product, index) => (
          <ListItem key={index} sx={{ py: 1, px: 0 }}>
            <ListItemText
              primary={product.quantite + " " + product.libele}
              secondary={product.description}
            />
            <Typography variant="body2">
              {product.quantite * product.prix} DT
            </Typography>
          </ListItem>
        ))}

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {total} DT
          </Typography>
        </ListItem>
      </List>
    </React.Fragment>
  );
}
