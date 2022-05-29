import React from "react";
import Avatar from "@mui/material/Avatar";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import LoadingButton from "@mui/lab/LoadingButton";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { useFormControl } from "./FormControl";
import AuthContext from "Services/AuthContext";

const theme = createTheme();

/* const inputFieldValues = [
  {
    name: "fullName",
    label: "Full Name",
    id: "my-name",
  },
  {
    name: "email",
    label: "Email",
    id: "my-email",
  },
  {
    name: "message",
    label: "Message",
    id: "my-message",
    multiline: true,
    rows: 10,
  },
];

{inputFieldValues.map((inputFieldValue, index) => {
  return (
    <TextField
      key={index}
      onBlur={handleInputValue}
  onChange={handleInputValue}
      name={inputFieldValue.name}
      label={inputFieldValue.label}
      multiline={inputFieldValue.multiline ?? false}
      rows={inputFieldValue.rows ?? 1}
  autoComplete="none"
  {...(errors[inputFieldValue.name] && { error: true, helperText: errors[inputFieldValue.name] })}

    />
  );
})}
 */

export default function SignUp() {
  const { isLoading } = React.useContext(AuthContext);
  const {
    handleInputValue,
    handlePasswordConfirmation,
    handleFormSubmit,
    formIsValid,
    errors,
  } = useFormControl();

  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          marginTop: "100px",
          marginBottom: 6,
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
          <Avatar sx={{ m: 1, bgcolor: "#0027a7" }}>
            <PersonAddAltIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{ mt: 3 }}
            onSubmit={handleFormSubmit}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="prenom"
                  onBlur={handleInputValue}
                  onChange={handleInputValue}
                  label="Prénom"
                  autoFocus
                  fullWidth
                  autoComplete="none"
                  {...(errors["prenom"] && {
                    error: true,
                    helperText: errors["prenom"],
                  })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Nom"
                  name="nom"
                  autoComplete="none"
                  onBlur={handleInputValue}
                  onChange={handleInputValue}
                  required
                  fullWidth
                  {...(errors["nom"] && {
                    error: true,
                    helperText: errors["nom"],
                  })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="email"
                  onBlur={handleInputValue}
                  onChange={handleInputValue}
                  label="Addresse Email "
                  fullWidth
                  required
                  autoComplete="none"
                  {...(errors["email"] && {
                    error: true,
                    helperText: errors["email"],
                  })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="number"
                  fullWidth
                  label="Numéro telephone (optionnel)"
                  name="num_tel"
                  onBlur={handleInputValue}
                  onChange={handleInputValue}
                  autoComplete="none"
                  {...(errors["num_tel"] && {
                    error: true,
                    helperText: errors["num_tel"],
                  })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="mot_de_passe"
                  label="Mot de passe"
                  type="password"
                  fullWidth
                  onBlur={handleInputValue}
                  onChange={handleInputValue}
                  required
                  autoComplete="none"
                  {...(errors["mot_de_passe"] && {
                    error: true,
                    helperText: errors["mot_de_passe"],
                  })}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  name="mot_de_passe_confirm"
                  label="Confirmation mot de passe"
                  type="password"
                  fullWidth
                  onBlur={handlePasswordConfirmation}
                  onChange={handlePasswordConfirmation}
                  required
                  autoComplete="none"
                  {...(errors["mot_de_passe_confirm"] && {
                    error: true,
                    helperText: errors["mot_de_passe_confirm"],
                  })}
                />
              </Grid>
            </Grid>

            <LoadingButton
              loading={isLoading}
              variant="contained"
              type="submit"
              fullWidth
              sx={{ mt: 3, mb: 2 }}
              disabled={!formIsValid()}
            >
              S'inscrire <ArrowCircleRightOutlinedIcon />
            </LoadingButton>

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/sign-in">
                  <Typography variant="body2">
                    Already have an account? Sign in
                  </Typography>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
