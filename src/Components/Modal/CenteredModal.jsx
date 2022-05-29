import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grow,
  IconButton,
} from "@mui/material";
import { CloseRounded } from "@mui/icons-material";

const CloseDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          color="warning"
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
        >
          <CloseRounded />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

CloseDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};
const Transition = React.forwardRef(function Transition(props, ref) {
  return (
    <Grow in={props.isOpen} mountOnEnter unmountOnExit ref={ref} {...props} />
  );
});
function CenteredModal(props) {
  return (
    <Dialog
      open={props.isOpen}
      TransitionComponent={Transition}
      transitionDuration={{ enter: 500, exit: 300 }}
      onClose={props.onHide}
      keepMounted
      aria-describedby="alert-dialog-slide-description"
      className={props.classes}
    >
      <CloseDialogTitle onClose={props.onHide}>{props.title}</CloseDialogTitle>
      <DialogContent style={{ minWidth: "250px !important" }}>
        {props.children}
      </DialogContent>
      {props.actions && (
        <DialogActions>
          <Button onClick={props.onHide}>Disagree</Button>
          <Button onClick={props.onHide}>Agree</Button>
        </DialogActions>
      )}
    </Dialog>
  );
}
CenteredModal.defaultProps = {
  title: " ",
  classes: "",
  actions: null,
};
export default CenteredModal;
