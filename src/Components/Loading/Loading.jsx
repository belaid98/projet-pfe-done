import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export const Loading = (props) => {
  return (
    <Box
      sx={{
        display: "flex",
        margin: "auto",
        width: "100%",
        justifyContent: "center",
      }}
    >
      <CircularProgress />
    </Box>
  );
};
