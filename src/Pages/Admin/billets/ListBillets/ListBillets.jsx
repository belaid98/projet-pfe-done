import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import SwitchInput from "Components/SwitchInput/SwitchInput";

import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

import BilletContext from "Services/BilletContext";
import BilletForm from "../BilletForm/BilletForm";
import CenteredModal from "Components/Modal/CenteredModal";
import { useNavigate } from "react-router-dom";
import PeriodeContext from "Services/PeriodeContext";

export default function ListBillets() {
  const { isLoading, billets, getBillets, removeBillet } =
    React.useContext(BilletContext);

  const [modalOpen, setModalOpen] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (billets.length === 0) {
      getBillets();
    }
  }, []);
  const { getBilletesPeriodes } = React.useContext(PeriodeContext);

  React.useEffect(() => {
    getBilletesPeriodes();
    return () => {};
  }, []);

  return (
    <>
      <CenteredModal
        title="Ajout Billet"
        isOpen={modalOpen}
        onHide={() => setModalOpen(false)}
      >
        <BilletForm marginTop="0px" />
      </CenteredModal>

      <h1
        style={{
          width: "100%",
          textAlign: "center",
          margin: "2rem",
          color: "#797ef6",
        }}
      >
        BILLETS
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
              <TableCell align="center">A vendre</TableCell>
              <TableCell align="center">Stock</TableCell>
              <TableCell align="center">Prix</TableCell>
              <TableCell align="center">Date création</TableCell>
              <TableCell align="right">Période</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <></>
            ) : (
              billets.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.libele}
                  </TableCell>
                  <TableCell align="center">{row.description}</TableCell>
                  <TableCell align="center">
                    <SwitchInput checked={row.a_vendre} disabled={true} />
                  </TableCell>
                  <TableCell align="center">{row.stock}</TableCell>
                  <TableCell align="center">{row.prix}</TableCell>
                  <TableCell align="center">
                    {row.date_creation.substring(0, 10)}
                  </TableCell>
                  <TableCell align="right">{row.periode}</TableCell>
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
                          removeBillet(row._id);
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
