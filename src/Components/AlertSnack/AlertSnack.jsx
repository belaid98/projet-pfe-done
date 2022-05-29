const { Snackbar, Slide } = require("@mui/material");

export const AlertSnack = ({ children, open, handleClose }) => {
  function TransitionUp(props) {
    return <Slide {...props} direction="right" />;
  }
  return (
    <Snackbar
      open={open}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      autoHideDuration={6000}
      onClose={handleClose}
      TransitionComponent={TransitionUp}
    >
      {children}
    </Snackbar>
  );
};
