import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import LoadingButton from "@mui/lab/LoadingButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { usePeriodeFormControl } from "./FormControl";
import ImageInput from "Components/ImageInput/ImageInput";
import SwitchInput from "Components/SwitchInput/SwitchInput";
import SelectInput from "Components/SelectInput/SelectInput";
import { MenuItem } from "@mui/material";

const theme = createTheme();

export default function PeriodeForm(props) {
  const {
    handleFormSubmit,
    handleInputValue,
    handleSwitch,
    formIsValid,
    isLoading,
    values,
    errors,
    id,
  } = usePeriodeFormControl();

  const inputFieldValues = [
    {
      name: "title",
      label: "Titre",
      value: values.title,
      required: true,
    },
    {
      name: "details",
      label: "Détails",
      value: values.details,
      required: true,
      multiline: true,
      rows: 5,
    },
    {
      name: "date",
      label: "Date/Periode",
      value: values.date,
      required: true,
    },

    {
      name: "order",
      label: "Order",
      value: values.order,
      type: "number",
      required: true,
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          marginTop: props.marginTop,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            marginBottom: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            component="h1"
            variant="h4"
            sx={{ fontWeight: "bold", color: "#1E2F97" }}
          >
            {id ? "Modifier Periode" : ""}
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{ mt: 3 }}
            onSubmit={handleFormSubmit}
          >
            <Grid container spacing={2}>
              {inputFieldValues.map((inputFieldValue, index) => {
                return (
                  <Grid
                    key={index}
                    item
                    xs={12}
                    sm={inputFieldValue.sm ?? false}
                  >
                    <TextField
                      fullWidth
                      required={inputFieldValue.required ?? false}
                      onBlur={handleInputValue}
                      onChange={handleInputValue}
                      value={inputFieldValue.value ?? ""}
                      type={inputFieldValue.type ?? "text"}
                      name={inputFieldValue.name}
                      label={inputFieldValue.label}
                      multiline={inputFieldValue.multiline ?? false}
                      rows={inputFieldValue.rows ?? 1}
                      autoComplete="none"
                      {...(errors[inputFieldValue.name] && {
                        error: true,
                        helperText: errors[inputFieldValue.name],
                      })}
                      autoFocus={inputFieldValue.autoFocus ?? false}
                    />
                  </Grid>
                );
              })}

              <Grid item xs={12}>
                <SwitchInput
                  on="piece"
                  off="billet"
                  checked={values.piece}
                  handleChange={handleSwitch}
                  name="piece"
                />
              </Grid>
            </Grid>

            <LoadingButton
              loading={isLoading}
              loadingPosition="start"
              startIcon={
                id ? (
                  <EditOutlinedIcon color="warning" />
                ) : (
                  <AddCircleOutlineIcon />
                )
              }
              color={id ? "warning" : "primary"}
              variant="outlined"
              type="submit"
              fullWidth
              sx={{ mt: 3, mb: 2 }}
              disabled={!formIsValid()}
            >
              {id ? "Modifier" : "Ajouter"}
            </LoadingButton>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
PeriodeForm.defaultProps = {
  marginTop: "50px",
};
