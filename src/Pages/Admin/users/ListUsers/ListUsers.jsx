import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";

import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

import UserContext from "Services/UserContext";
import UserForm from "../UserForm/UserForm";
import CenteredModal from "Components/Modal/CenteredModal";
import { useNavigate } from "react-router-dom";

export default function ListUsers() {
  const { isLoading, users, getUsers, removeUser } =
    React.useContext(UserContext);

  const [modalOpen, setModalOpen] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (users.length === 0) {
      setTimeout(() => {
        getUsers();
      }, 200);
    }
  }, []);

  return (
    <>
      <CenteredModal
        title="Ajout utilisateur"
        isOpen={modalOpen}
        onHide={() => setModalOpen(false)}
      >
        <UserForm marginTop="0px" />
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
        utilisateurs
      </h1>
      <Button
        startIcon={<AddIcon />}
        onClick={() => setModalOpen(true)}
        aria-label="add"
        color="primary"
        style={{ margin: "10px" }}
        size="medium"
      >
        Ajout
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nom</TableCell>
              <TableCell align="center">Prénom</TableCell>
              <TableCell align="center">email</TableCell>
              <TableCell align="center">Etat</TableCell>
              <TableCell align="center">Télphone</TableCell>
              <TableCell align="center">Date création</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <></>
            ) : (
              users.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{row.nom}</TableCell>
                  <TableCell align="center">{row.prenom}</TableCell>
                  <TableCell align="center">{row.email}</TableCell>
                  <TableCell align="center">
                    {row.active ? "Activé" : "Disactivé"}
                  </TableCell>
                  <TableCell align="center">
                    {row.num_tel ?? "aucun numéro de téléphone"}
                  </TableCell>
                  <TableCell align="center">
                    {row.date_creation.substring(0, 10)}
                  </TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={1} alignItems="center">
                      <IconButton
                        onClick={() => navigate(row._id)}
                        aria-label="edit"
                        color="warning"
                      >
                        <EditOutlinedIcon />
                      </IconButton>

                      <IconButton
                        aria-label="delete"
                        onClick={() => {
                          removeUser(row._id);
                        }}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Stack>
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
