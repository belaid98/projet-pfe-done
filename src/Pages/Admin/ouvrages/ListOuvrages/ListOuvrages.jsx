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

import OuvrageContext from "Services/OuvrageContext";
import OuvrageForm from "../OuvrageForm/OuvrageForm";
import CenteredModal from "Components/Modal/CenteredModal";
import { useNavigate } from "react-router-dom";

export default function ListOuvrages() {
  const { isLoading, ouvrages, getOuvrages, removeOuvrage } =
    React.useContext(OuvrageContext);

  const [modalOpen, setModalOpen] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (ouvrages.length === 0) {
      getOuvrages();
    }
  }, []);

  return (
    <>
      <CenteredModal
        title="Ajout Ouvrage"
        isOpen={modalOpen}
        onHide={() => setModalOpen(false)}
      >
        <OuvrageForm marginTop="0px" />
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
        OuvrageS
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
              <TableCell>Libele</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Stock</TableCell>
              <TableCell align="center">Prix</TableCell>
              <TableCell align="center">Date création</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <></>
            ) : (
              ouvrages.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.libele}
                  </TableCell>
                  <TableCell align="center">{row.description}</TableCell>
                  <TableCell align="center">{row.stock}</TableCell>
                  <TableCell align="center">{row.prix}</TableCell>
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
                          removeOuvrage(row._id);
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
