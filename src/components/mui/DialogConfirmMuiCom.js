import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Typography } from "@mui/material";

const DialogConfirmMuiCom = ({
  open,
  onClose,
  closeContent,
  onConfirm,
  confirmContent,
  title,
  title2,
  content,
  content0,
  warning,
  warningContent,
}) => {
  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <Typography variant="h5" ml={3} color="red">
          {warning}
        </Typography>
        <Typography variant="h7" ml={3} color="red">
          {title2}
        </Typography>

        <DialogContent>
          <DialogContentText id="alert-dialog-description" mb={1}>
            {warningContent}
          </DialogContentText>
          <DialogContentText id="alert-dialog-description" mb={1}>
            {content0}
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>{closeContent}</Button>
          <Button autoFocus onClick={onConfirm}>
            {confirmContent}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DialogConfirmMuiCom;
