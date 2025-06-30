import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const PagoCancelado = () => {
    const navigate = useNavigate();

    return (
        <Box textAlign="center" mt={8}>
            <Typography variant="h4" color="error" gutterBottom>
                Pago Cancelado
            </Typography>
            <Typography variant="body1" mb={2}>
                El pago fue cancelado o falló. Puedes intentarlo nuevamente desde tu panel.
            </Typography>
            <Button variant="outlined" color="primary" onClick={() => navigate("/dashboard")}>
                Volver al panel
            </Button>
        </Box>
    );
};

export default PagoCancelado;
