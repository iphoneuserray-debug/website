import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { Typography } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';


interface AlertDialogProps {
  open: boolean;
  handleClose: () => void;
}

export default function AlertDialog({ open, handleClose }: AlertDialogProps) {
  return (
    <Dialog
    open={open}
    onClose={handleClose}
    >
    <DialogTitle>
        <Typography 
        sx={{ textAlign: 'center' }}>
            Sign up successfully
        </Typography>
    </DialogTitle>
    <DialogActions>
        <Button onClick={handleClose} autoFocus>
        OK
        </Button>
    </DialogActions>
    </Dialog>
  );
}