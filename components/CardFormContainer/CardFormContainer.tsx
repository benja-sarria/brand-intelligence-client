import { useContext, useState } from "react";
import { NiceClassContext } from "../../context/NiceClassProvider";
import { CardForm } from "../CardForm/CardForm";
import style from "../CardForm/CardForm.module.scss";
import { LoadingComponent } from "../LoadingComponent/LoadingComponent";

export const CardFormContainer = () => {
    const [loading, setLoading] = useState(false);
    const { niceClass, setNiceClass, setCategory } =
        useContext(NiceClassContext);

    const btnHandler = async (evt: {
        target: { value: string }[];
        preventDefault: Function;
    }) => {
        evt.preventDefault();
        const alertMessage = document.querySelector("#errorAlert");
        if (+evt.target[0].value || !evt.target[0].value) {
            if (alertMessage) {
                alertMessage.classList.remove(`${style["hidden"]}`);
                alertMessage.classList.add(`${style["show"]}`);
            }
        } else {
            if (alertMessage) {
                if (!alertMessage.classList.contains("hidden")) {
                    alertMessage.classList.add(`${style["hidden"]}`);
                    alertMessage.classList.remove(`${style["show"]}`);
                }
            }
            console.log("Se activó el botón");
            console.log(evt.target[0].value);
            setLoading(true);
            const response = await fetch(
                `http://localhost:8080/api/niceClass?classificationSubject=${evt.target[0].value}`
            );
            const data = await response.json();
            console.log(data);
            setLoading(false);
            setCategory(evt.target[0].value.replace(/[ \t]+$/, ""));
            setNiceClass(data);
        }
    };

    return loading ? (
        <div className={`${style["card-form-container"]}`}>
            <LoadingComponent />
        </div>
    ) : (
        <CardForm btnHandler={btnHandler} />
    );
};
