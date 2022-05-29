import React from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import AuthContext from "Services/AuthContext";

const theme = createTheme();

function LoginRoundedOUtlined() {
  return (
    <div
      style={{
        border: "#158fef solid 2px",
        borderRadius: "50%",
        height: "28px",
        width: "28px",
      }}
    >
      <LoginRoundedIcon
        style={{
          padding: "2px",
        }}
      />
    </div>
  );
}

export default function SignIn() {
  const { logIn, isLoading } = React.useContext(AuthContext);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let user = {
      email: data.get("email"),
      mot_de_passe: data.get("password"),
    };
    logIn(user);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          marginTop: "130px",
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
          <Avatar sx={{ m: 1, color: "#1aa7ec", bgcolor: "whitesmoke" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ color: "#1aa7ec" }}>
            Connexion
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Addresse Email "
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mot de passe"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <LoadingButton
              loading={isLoading}
              loadingPosition="start"
              startIcon={<LoginRoundedOUtlined />}
              variant="outlined"
              type="submit"
              fullWidth
              sx={{ mt: 3, mb: 2 }}
            >
              Se connecter
            </LoadingButton>

            <Grid container>
              <Grid item xs>
                <Link to="/forgot-password">
                  <Typography variant="body2">Forgot password?</Typography>
                </Link>
              </Grid>
              <Grid item>
                <Link to="/sign-up">
                  <Typography variant="body2">
                    Don't have an account? Sign Up
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
