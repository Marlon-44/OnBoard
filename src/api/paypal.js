// src/api/paypal.js
// src/api/paypal.js
export const crearOrdenPaypal = async (idFactura) => {
    const response = await fetch(`http://localhost:8080/api/pagos/crear?idFactura=${idFactura}`, {
        method: "POST"
    });

    if (!response.ok) {
        throw new Error("Error al crear la orden de PayPal");
    }

    return response.json(); 
};
