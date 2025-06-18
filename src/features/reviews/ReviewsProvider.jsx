import { ReviewsContext } from "./ReviewsContext";

const reviews = [
    {
        user: "Carlos López",
        text: "El vehículo estaba en excelentes condiciones. 100% recomendado.",
        date: "2024-12-01",
    },
    {
        user: "María Torres",
        text: "Buena atención y el coche era muy cómodo. ¡Gracias!",
        date: "2024-12-02",
    },
    {
        user: "Juan Pérez",
        text: "El proceso de alquiler fue muy sencillo. Todo perfecto.",
        date: "2024-12-03",
    },
    {
        user: "Lucía Gómez",
        text: "Excelente experiencia. Volveré a alquilar aquí.",
        date: "2024-12-04",
    },
    {
        user: "Andrés Ramírez",
        text: "Todo salió como esperaba. Vehículo limpio y puntual.",
        date: "2024-12-05",
    },
    {
        user: "Daniela Morales",
        text: "Muy buena atención al cliente y buen precio.",
        date: "2024-12-06",
    },
    {
        user: "Santiago Jiménez",
        text: "El servicio fue rápido y profesional.",
        date: "2024-12-07",
    },
    {
        user: "Camila Herrera",
        text: "Me encantó la experiencia. Súper fácil de reservar.",
        date: "2024-12-08",
    },
    {
        user: "Mateo Ruiz",
        text: "Todo bien, aunque el carro tenía poco combustible.",
        date: "2024-12-09",
    },
    {
        user: "Valentina Cruz",
        text: "Buena calidad y excelente atención. Lo recomiendo.",
        date: "2024-12-10",
    },
    {
        user: "David Mendoza",
        text: "Satisfecho con el servicio. Muy profesional.",
        date: "2024-12-11",
    },
    {
        user: "Isabella Fernández",
        text: "Una experiencia perfecta. ¡Gracias!",
        date: "2024-12-12",
    },
];

export const ReviewsProvider = ({ children }) => {
    return (
        <ReviewsContext.Provider value={{reviews }}>
            {children}
        </ReviewsContext.Provider>
    );
};
