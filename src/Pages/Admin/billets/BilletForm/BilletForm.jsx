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
import { useBilletFormControl } from "./FormControl";
import ImageInput from "Components/ImageInput/ImageInput";
import SwitchInput from "Components/SwitchInput/SwitchInput";
import SelectInput from "Components/SelectInput/SelectInput";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";

const theme = createTheme();

export default function BilletForm(props) {
  const {
    handleFormSubmit,
    handleInputValue,
    handleSwitch,
    handleImage,
    formIsValid,
    shownFrontImage,
    shownBackImage,
    isLoading,
    historiqueBilletes,
    values,
    errors,
    id,
  } = useBilletFormControl();

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
  ];
  const inputImages = [
    {
      name: "front_image",
      label: "Front image",
      value: shownFrontImage,
      photoId: "front_photo",
    },
    {
      name: "back_image",
      label: "Back image",
      value: shownBackImage,
      photoId: "back_photo",
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
            {id ? "Modifier Billet" : ""}
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

              <Grid item xs={12}>
                <SwitchInput
                  label="A vendre"
                  checked={values.a_vendre}
                  handleChange={handleSwitch}
                  name="a_vendre"
                />
              </Grid>

              {values.a_vendre && (
                <>
                  <Grid item xs={12}>
                    <TextField
                      type="number"
                      fullWidth
                      required={Boolean(values.a_vendre)}
                      onBlur={handleInputValue}
                      onChange={handleInputValue}
                      value={values.stock}
                      name="stock"
                      label="Stock"
                      autoComplete="none"
                      {...(errors["stock"] && {
                        error: true,
                        helperText: errors["stock"],
                      })}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      type="number"
                      fullWidth
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end"> DT</InputAdornment>
                        ),
                      }}
                      required={Boolean(values.a_vendre)}
                      onBlur={handleInputValue}
                      onChange={handleInputValue}
                      value={values.prix}
                      name="prix"
                      label="Prix"
                      autoComplete="none"
                      {...(errors["prix"] && {
                        error: true,
                        helperText: errors["prix"],
                      })}
                    />
                  </Grid>
                </>
              )}

              <Grid item xs={12}>
                <SelectInput
                  handleChange={handleInputValue}
                  value={values.periode}
                  label="Periode"
                  name="periode"
                  errors={errors}
                >
                  {historiqueBilletes.map((listItem, index) => {
                    return (
                      <MenuItem key={index} value={listItem._id}>
                        {listItem.title}
                      </MenuItem>
                    );
                  })}
                </SelectInput>
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
BilletForm.defaultProps = {
  marginTop: "50px",
};
