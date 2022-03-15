import PuffLoader from "react-spinners/PuffLoader";
import style from "./LoadingComponent.module.scss";
import { css } from "@emotion/react";
import Image from "next/image";

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red !important;
    z-index: 20;
    margin: 0em auto;
    color: red;
`;

export const LoadingComponent = () => {
    return (
        <div className={`${style["loading-container"]}`}>
            <div className={`${style["bkg-blur"]}`}></div>
            <Image
                src={"/assets/img/background.webp"}
                className={`${style["bkg-image"]}`}
                layout={"fill"}
            ></Image>
            <Image
                src={"/assets/img/background.webp"}
                className={`${style["bkg-image"]}`}
                layout={"fill"}
            ></Image>

            <div className={`${style["spinner-container"]}`}>
                <p className={`${style["loading-text"]}`}>
                    Cargando resultados...
                </p>
                <PuffLoader css={override} color={"var(--checkboxColor)"} />
            </div>
        </div>
    );
};
