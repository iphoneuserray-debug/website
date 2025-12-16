import * as React from 'react';
import Alert from '@mui/material/Alert';
import { Snackbar } from '@mui/material';

export type NotificationSeverity = 'success' | 'info' | 'warning' | 'error';

interface NotificationProps{
    open: boolean;
    severity: NotificationSeverity;
    message: string;
    setNotificationOpen: (open: boolean) => void
}

export default function Notification({open, severity, message, setNotificationOpen}: NotificationProps) {
    const handleClose = () => {
    setNotificationOpen(false);
  };
  return (
    <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
    <Alert severity={severity}>{message}</Alert>
    </Snackbar>
  );
}