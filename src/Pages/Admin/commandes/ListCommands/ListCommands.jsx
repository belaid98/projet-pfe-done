import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import CommandContext from "Services/CommandContext";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckIcon from "@mui/icons-material/Check";

import CenteredModal from "Components/Modal/CenteredModal";

export default function ListCommands() {
  const { isLoading, commandes, getCommandes, validateCommande } =
    React.useContext(CommandContext);

  const [modalOpen, setModalOpen] = React.useState(false);
  const [content, setContent] = React.useState(null);

  React.useEffect(() => {
    if (commandes.length === 0) {
      setTimeout(() => {
        getCommandes();
      }, 200);
    }
  }, []);

  const handleClose = () => {
    setModalOpen(false);
    setTimeout(() => {
      setContent(null);
    }, 500);
  };

  const handleOpen = (commande) => {
    setModalOpen(true);
    setContent(commande);
  };

  const validate = (id) => {
    console.log(id);
    validateCommande(id)
      .then((result) => {
        console.log(result);
        setModalOpen(false);
        setTimeout(() => {
          setContent(null);
        }, 500);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <>
      <CenteredModal
        title="Affichage commande"
        isOpen={modalOpen}
        onHide={handleClose}
        classes="info-modal"
      >
        {content ? (
          <>
            {content.adresse ? (
              <>
                <h3>Informations Utilisateur</h3>
                <Grid container spacing={2}>
                  <Grid item xs={8}>
                    <Item>{content.adresse}</Item>
                  </Grid>
                  <Grid item xs={4}>
                    <Item>{content.zip}</Item>
                  </Grid>
                  <Grid item xs={4}>
                    <Item>{content.country}</Item>
                  </Grid>
                  <Grid item xs={8}>
                    <Item>{content.city}</Item>
                  </Grid>
                </Grid>
              </>
            ) : (
              ""
            )}
            <h3>Informations Produits</h3>
            <List>
              {content.panier.pieces.map((product, index) => (
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
              {content.panier.billets.map((product, index) => (
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
              {content.panier.ouvrages.map((product, index) => (
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
            </List>
            {content.validated ? (
              ""
            ) : (
              <div className="justify-end">
                <IconButton
                  onClick={() => validate(content._id)}
                  aria-label="validation"
                >
                  <CheckIcon />
                </IconButton>
              </div>
            )}
          </>
        ) : (
          ""
        )}
      </CenteredModal>

      <h1
        style={{
          width: "100%",
          textAlign: "center",
          textTransform: "uppercase",
          margin: "2rem",
          color: "#797ef6",
        }}
      >
        Les commandes
      </h1>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nom</TableCell>
              <TableCell align="center">Prénom</TableCell>
              <TableCell align="center">email</TableCell>
              <TableCell align="center">Téléphone</TableCell>
              <TableCell align="center">Date création</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <></>
            ) : (
              commandes.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{row.nom}</TableCell>
                  <TableCell align="center">{row.prenom}</TableCell>
                  <TableCell align="center">{row.email}</TableCell>
                  <TableCell align="center">
                    {row.client.num_tel ?? "n'a aucun numéro"}
                  </TableCell>

                  <TableCell align="center">
                    {row.date_creation.substring(0, 10)}
                  </TableCell>
                  <TableCell align="center">
                    {row.validated ? (
                      <IconButton
                        aria-label="show"
                        onClick={() => {
                          handleOpen(row);
                        }}
                      >
                        <VisibilityIcon />
                      </IconButton>
                    ) : (
                      <IconButton
                        onClick={() => handleOpen(row)}
                        aria-label="validation"
                        color="success"
                      >
                        <CheckIcon />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
