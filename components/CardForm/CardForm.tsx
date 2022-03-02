import { useRef } from "react";
import style from "./CardForm.module.scss";

export const CardForm = (props: any) => {
    const { btnHandler } = props;

    return (
        <div className={`card ${style["custom-card"]}`}>
            <div className={`card-body ${style["custom-card-body"]}`}>
                <form
                    action=""
                    className={`mb-3 ${style["custom-form"]}`}
                    onSubmit={(evt) => {
                        evt.preventDefault();
                    }}
                >
                    <label htmlFor="subject" className="form-label">
                        Ingresa cuál es el producto o servicio que deseas
                        proteger con tu Marca Comercial:
                    </label>
                    <input
                        type="text"
                        name="subject"
                        id="subject"
                        className={`form-control ${style["form-control-custom"]}`}
                    />
                    <button
                        className={`btn ${style["form-custom-btn"]}`}
                        onClick={(evt) => {
                            btnHandler(evt);
                        }}
                    >
                        Enviar
                    </button>
                </form>
            </div>
        </div>
    );
};
