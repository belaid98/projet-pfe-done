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

import PeriodeContext from "Services/PeriodeContext";
import PeriodeForm from "../PeriodeForm/PeriodeForm";
import CenteredModal from "Components/Modal/CenteredModal";
import { useNavigate } from "react-router-dom";

export default function ListPeriodes() {
  const { isLoading, periodes, getPeriodes, removePeriode } =
    React.useContext(PeriodeContext);

  const [modalOpen, setModalOpen] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (periodes.length === 0) {
      getPeriodes();
    }
  }, []);

  return (
    <>
      <CenteredModal
        title="Ajout Periode"
        isOpen={modalOpen}
        onHide={() => setModalOpen(false)}
      >
        <PeriodeForm marginTop="0px" />
      </CenteredModal>

      <h1
        style={{
          width: "100%",
          textAlign: "center",
          margin: "2rem",
          color: "#797ef6",
        }}
      >
        PERIODES
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
              <TableCell>Titre</TableCell>
              <TableCell align="center">Détails</TableCell>
              <TableCell align="center">Periode des ...</TableCell>
              <TableCell align="center">Date/Periode</TableCell>
              <TableCell align="center">Date création</TableCell>
              <TableCell align="right">Ordre</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <></>
            ) : (
              periodes.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.title}
                  </TableCell>
                  <TableCell align="center">{row.details}</TableCell>
                  <TableCell align="center">
                    {row.piece ? "pieces" : "billets"}
                  </TableCell>
                  <TableCell align="center">{row.date}</TableCell>
                  <TableCell align="center">
                    {row.date_creation.substring(0, 10)}
                  </TableCell>
                  <TableCell align="right">{row.order}</TableCell>
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
                          removePeriode(row._id);
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
