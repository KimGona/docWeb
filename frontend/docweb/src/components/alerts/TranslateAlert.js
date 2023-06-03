import React from "react";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

export default function TranslateAlert({isVisible, type, message, onClose}) {
    if (!isVisible) return;
    if (type == "success")
        return (
            <Alert severity="success" onClose={onClose}>
                <AlertTitle>Success</AlertTitle>
                {message}
            </Alert>
        );
    else if (type == "error")
        return (
            <Alert severity="error" onClose={onClose}>
                <AlertTitle>Error</AlertTitle>
                {message}
            </Alert>
        );
}