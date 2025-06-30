// src/api/stripe.js
export const crearSesionPagoStripe = async ({ idFactura, razon, total }) => {
    try {
        const response = await fetch("http://localhost:8080/api/stripe/create-checkout-session", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                idFactura,
                razon,
                total: Math.round(total * 100)
            })
        });

        const data = await response.json();

        if (!response.ok) throw new Error(data?.error || "Error al crear la sesión de Stripe");

        return data; // contiene la `url`
    } catch (error) {
        console.error("Error creando sesión de Stripe:", error);
        throw error;
    }
};
