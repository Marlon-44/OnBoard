const API = "http://localhost:8080/api/pagos";

export const crearFactura = async (idFactura) => {
    try {
        const response = await fetch(`${API}/crear?idFactura=${idFactura}`, {
            method: "POST"
        });

        if (!response.ok) {
            throw new Error("Error al crear la factura");
        }

        return response.json(); // Se espera que esto devuelva una URL de redirección o resultado
    } catch (error) {
        console.error("Error creando factura:", error);
        throw error;
    }
};
