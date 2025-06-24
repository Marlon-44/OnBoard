const SidebarIndividualClient = ({ onCerrarSesion }) => (
    <aside style={{ width: "250px", backgroundColor: "#333", color: "#fff", padding: "20px" }}>
        <h2>Cliente</h2>
        <ul>
            <li>Mis alquileres</li>
            <li>Mis reservas</li>
        </ul>
        <button onClick={onCerrarSesion}>Cerrar sesión</button>
    </aside>
);

export default SidebarIndividualClient;
