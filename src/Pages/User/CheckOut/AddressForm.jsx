import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useCommandFormControl } from "./FormControl";

export default function AddressForm() {
  const { handleInputValue, values, errors } = useCommandFormControl();

  const inputFieldValues = [
    {
      name: "prenom",
      label: "Prénom",
      value: values.prenom,
      required: true,
      sm: 6,
    },
    {
      name: "nom",
      label: "Nom",
      value: values.nom,
      required: true,
      sm: 6,
    },
    {
      name: "email",
      label: "Addresse email ",
      value: values.email,
      required: true,
    },
    {
      name: "adresse",
      label: "Addresse",
      value: values.adresse,
      required: false,
    },
    {
      name: "city",
      label: "Ville",
      value: values.city,
      required: false,
      sm: 6,
    },
    {
      name: "state",
      label: "État/Province/Région",

      value: values.state,
      required: false,
      sm: 6,
    },
    {
      name: "zip",
      label: "Zip / Code postal",
      value: values.zip,
      required: false,
      sm: 6,
    },
    {
      name: "country",
      label: "Pays",
      value: values.country,
      required: false,
      sm: 6,
    },
  ];
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Adresse de livraison pour les pays étrangers
      </Typography>
      <Grid container spacing={3}>
        {inputFieldValues.map((inputFieldValue, index) => {
          return (
            <Grid key={index} item xs={12} sm={inputFieldValue.sm ?? false}>
              <TextField
                fullWidth
                type={inputFieldValue.type ?? "text"}
                required={inputFieldValue.required ?? false}
                autoFocus={inputFieldValue.autoFocus ?? false}
                onBlur={inputFieldValue.handleChange ?? handleInputValue}
                onChange={inputFieldValue.handleChange ?? handleInputValue}
                value={inputFieldValue.value ?? ""}
                name={inputFieldValue.name}
                label={inputFieldValue.label}
                multiline={inputFieldValue.multiline ?? false}
                rows={inputFieldValue.rows ?? 1}
                variant="standard"
                autoComplete="none"
                {...(errors[inputFieldValue.name] && {
                  error: true,
                  helperText: errors[inputFieldValue.name],
                })}
              />
            </Grid>
          );
        })}
      </Grid>
    </React.Fragment>
  );
}
