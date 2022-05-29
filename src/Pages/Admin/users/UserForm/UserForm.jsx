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
import { useFormControl } from "./FormControl";
import ImageInput from "Components/ImageInput/ImageInput";
import SwitchInput from "Components/SwitchInput/SwitchInput";

const theme = createTheme();

export default function UserForm(props) {
  const {
    handleFormSubmit,
    handleInputValue,
    handleSwitch,
    handleImage,
    handlePasswordConfirmation,
    formIsValid,
    shownImage,
    isLoading,
    values,
    errors,
    id,
  } = useFormControl();

  const inputFieldValues = [
    {
      name: "prenom",
      label: "Prénom",
      value: values.prenom,
      required: true,
      autoFocus: true,
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
      label: "Addresse Email ",
      value: values.email,
      required: true,
    },
    {
      name: "num_tel",
      label: "Numéro telephone (optionnel)",
      type: "number",
      value: values.num_tel,
      required: true,
    },
    {
      name: "mot_de_passe",
      label: "Mot de passe",
      type: "password",
      value: values.mot_de_passe,
      required: true,
      sm: 6,
    },
    {
      name: "mot_de_passe_confirm",
      label: "Confirmation mot de passe",
      type: "password",
      value: values.mot_de_passe_confirm,
      handleChange: handlePasswordConfirmation,
      required: true,
      sm: 6,
    },
  ];

  const inputImages = [
    {
      name: "photo",
      label: "Photo de profile",
      value: shownImage,
      photoId: "front_photo",
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
            {id ? "Modifier utilisateur" : ""}
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
                      type={inputFieldValue.type ?? "text"}
                      required={inputFieldValue.required ?? false}
                      autoFocus={inputFieldValue.autoFocus ?? false}
                      onBlur={inputFieldValue.handleChange ?? handleInputValue}
                      onChange={
                        inputFieldValue.handleChange ?? handleInputValue
                      }
                      value={inputFieldValue.value ?? ""}
                      name={inputFieldValue.name}
                      label={inputFieldValue.label}
                      multiline={inputFieldValue.multiline ?? false}
                      rows={inputFieldValue.rows ?? 1}
                      autoComplete="none"
                      {...(errors[inputFieldValue.name] && {
                        error: true,
                        helperText: errors[inputFieldValue.name],
                      })}
                    />
                  </Grid>
                );
              })}

              {id
                ? inputImages.map((inputImage, index) => {
                    return (
                      <Grid key={index} item xs={12}>
                        <ImageInput
                          name={inputImage.name}
                          value={inputImage.value}
                          label={inputImage.label}
                          classes="file-upload"
                          handleChange={handleImage}
                        />
                      </Grid>
                    );
                  })
                : ""}

              <Grid item xs={12}>
                <SwitchInput
                  label="Active"
                  checked={values.active}
                  handleChange={handleSwitch}
                  name="active"
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
UserForm.defaultProps = {
  marginTop: "50px",
};
