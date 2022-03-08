import { useRef } from "react";
import style from "./TrademarkFormCard.module.scss";

export const TrademarkFormCard = (props: any) => {
    const { btnHandler, setApplicationSumUp, applicationSumUp, handleInputChange } = props;

    

    return (
        <div className={`card ${style["custom-card"]}`}>
            <div className={`card-body ${style["custom-card-body"]}`}>
                <form
                    action=""
                    className={`mb-3 ${style["custom-form"]} has-validation`}
                    onSubmit={(evt: any) => {
                        evt.preventDefault();

                        btnHandler(evt);
                    }}
                >
                    <label htmlFor="subject" className="form-label">
                        {
                            "Ingresa cuál es el Nombre de tu Marca (Denominación) que deseas proteger:"
                        }
                    </label>
                    <input
                        type="text"
                        name="subject"
                        id="subject"
                        className={`form-control ${style["form-control-custom"]}`}
                        onChange={(evt: any) => {
                            handleInputChange(evt)
                        }}
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
