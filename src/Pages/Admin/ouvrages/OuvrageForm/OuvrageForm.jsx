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
import { useOuvrageFormControl } from "./FormControl";
import ImageInput from "Components/ImageInput/ImageInput";
import InputAdornment from "@mui/material/InputAdornment";
const theme = createTheme();

export default function OuvrageForm(props) {
  const {
    handleFormSubmit,
    handleInputValue,
    handleImage,
    formIsValid,
    shownFrontImage,
    isLoading,
    values,
    errors,
    id,
  } = useOuvrageFormControl();

  const inputFieldValues = [
    {
      name: "libele",
      label: "Libele",
      value: values.libele,
      required: true,
    },
    {
      name: "description",
      label: "Description",
      value: values.description,
      required: true,
      multiline: true,
      rows: 5,
    },
    {
      name: "stock",
      label: "Stock",
      type: "number",
      value: values.stock,
      required: true,
      sm: 6,
    },
    {
      name: "prix",
      label: "Prix",
      type: "number",
      InputProps: {
        endAdornment: <InputAdornment position="end"> DT</InputAdornment>,
      },
      value: values.prix,
      required: true,
      sm: 6,
    },
  ];
  const inputImages = [
    {
      name: "front_image",
      label: "Front image",
      value: shownFrontImage,
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
            {id ? "Modifier Ouvrage" : ""}
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
                      InputProps={inputFieldValue.InputProps ?? {}}
                      required={inputFieldValue.required ?? false}
                      onBlur={handleInputValue}
                      onChange={handleInputValue}
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
                      autoFocus={inputFieldValue.autoFocus ?? false}
                    />
                  </Grid>
                );
              })}

              {inputImages.map((inputImage, index) => {
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
              })}
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
OuvrageForm.defaultProps = {
  marginTop: "50px",
};
