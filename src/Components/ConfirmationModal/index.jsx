// src/Components/ModalConfirmacion.jsx
import { useEffect, useRef } from "react";

const ConfirmationModal = ({ titulo, mensaje, onConfirmar,onCerrar, id = "modalConfirmacion" }) => {
    const modalRef = useRef(null);

    useEffect(() => {
        if (window.bootstrap) {
            const modal = new window.bootstrap.Modal(modalRef.current);
            modal.show();

            // Guardamos la instancia en el ref por si se necesita cerrar manualmente
            modalRef.current.modalInstance = modal;
        }
    }, []);

    const cerrarModal = () => {
        modalRef.current?.modalInstance?.hide();

        setTimeout(() => {
            const backdrop = document.querySelector(".modal-backdrop");
            if (backdrop) backdrop.remove();

            document.body.classList.remove("modal-open");
            document.body.style.paddingRight = "";

            // Llama a la función opcional onCerrar si fue pasada
            if (typeof onCerrar === "function") {
                onCerrar();
            }
        }, 300);
    };



    const handleConfirmar = () => {
        cerrarModal();
        onConfirmar();
    };

    return (
        <div className="modal fade" id={id} tabIndex="-1" ref={modalRef} aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{titulo}</h5>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={cerrarModal}
                            aria-label="Cerrar"
                        />

                    </div>
                    <div className="modal-body">
                        <p>{mensaje}</p>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={cerrarModal}
                        >
                            Cancelar
                        </button>

                        <button type="button" className="btn btn-primary" onClick={handleConfirmar}>Confirmar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
