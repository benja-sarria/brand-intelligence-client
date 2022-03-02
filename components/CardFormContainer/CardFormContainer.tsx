import { useState } from "react";
import { CardForm } from "../CardForm/CardForm";

export const CardFormContainer = () => {
    const [first, setfirst] = useState();

    const btnHandler = (evt: Event) => {
        evt.preventDefault();
        console.log("Se activó el botón");
    };

    return <CardForm btnHandler={btnHandler} />;
};
