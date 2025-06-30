// components/FacturaResumen.jsx
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box } from "@mui/material";

const FacturaResumen = ({ diasTotales, precioPorDia }) => {
    const subtotal = diasTotales * precioPorDia;
    const impuesto4x1000 = subtotal * 0.004;
    const total = subtotal + impuesto4x1000;

    return (
        <Box mt={2}>
            <Typography variant="h6" mb={1}>Zona de Facturación</Typography>
            <TableContainer component={Paper}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Descripción</TableCell>
                            <TableCell align="right">Cantidad</TableCell>
                            <TableCell align="right">Valor Unitario</TableCell>
                            <TableCell align="right">Subtotal</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>Alquiler por días</TableCell>
                            <TableCell align="right">{diasTotales}</TableCell>
                            <TableCell align="right">${precioPorDia.toFixed(2)}</TableCell>
                            <TableCell align="right">${subtotal.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={3}>Impuesto 4x1000</TableCell>
                            <TableCell align="right">${impuesto4x1000.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={3}><strong>Total</strong></TableCell>
                            <TableCell align="right"><strong>${total.toFixed(2)}</strong></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default FacturaResumen;
