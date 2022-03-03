import { useRef } from "react";
import style from "./CardForm.module.scss";

export const CardForm = (props: any) => {
    const { btnHandler } = props;

    return (
        <div className={`card ${style["custom-card"]}`}>
            <div className={`card-body ${style["custom-card-body"]}`}>
                <form
                    action=""
                    className={`mb-3 ${style["custom-form"]} has-validation`}
                    onSubmit={(evt) => {
                        evt.preventDefault();
                        btnHandler(evt);
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
                    <div
                        className={`invalid-feedback ${style["hidden"]}`}
                        id="errorAlert"
                    >
                        Por favor, ingresa un rubro válido
                    </div>
                    <button className={`btn ${style["form-custom-btn"]}`}>
                        Enviar
                    </button>
                </form>
            </div>
        </div>
    );
};
