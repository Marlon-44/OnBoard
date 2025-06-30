import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";

const PagoExitoso = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const idFactura = searchParams.get("idFactura");

    return (
        <Box textAlign="center" mt={8}>
            <Typography variant="h4" gutterBottom>
                ¡Pago Exitoso!
            </Typography>
            <Typography variant="body1" mb={2}>
                Tu transacción se completó correctamente. Puedes revisar tu reserva activa en tu perfil.
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
                ID Factura: {idFactura}
            </Typography>
            <Button variant="contained" color="primary" sx={{ mt: 3 }} onClick={() => navigate("/dashboard")}>
                Ir al panel de usuario
            </Button>
        </Box>
    );
};

export default PagoExitoso;
