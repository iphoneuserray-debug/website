import * as React from 'react';
import Alert from '@mui/material/Alert';
import { Snackbar } from '@mui/material';

interface NotificationProps {
    open: boolean;
    message: string;
    setAlert: (open: boolean) => void
}

export default function Notification({ open, message, setAlert }: NotificationProps) {
    const handleClose = () => {
        setAlert(false);
    };
    return (
        <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
            <Alert severity='warning'>{message}</Alert>
        </Snackbar>
    );
}