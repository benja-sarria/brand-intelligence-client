import Image from "next/image";
import { useEffect } from "react";
import style from "./HomeHeader.module.scss";

export const HomeHeader = ({ type }: { type: string }) => {
    useEffect(() => {
        console.log(type);
    }, [type]);

    return (
        <>
            <div
                className={`${
                    type === "secondary"
                        ? style["letter-secondary"]
                        : style["word-brand-container"]
                }`}
            >
                <Image
                    src="/assets/img/brandLogo.webp"
                    alt="Brand Intelligence Logo"
                    className={`${style["letter-logo"]}`}
                    layout="fill"
                />
            </div>
            <div
                className={`${
                    type === "secondary"
                        ? style["logo-secondary"]
                        : style["logo-brand-container"]
                }`}
            >
                <Image
                    src="/assets/img/icon.webp"
                    alt="Brand Intelligence Logo"
                    className={`${style["brand-logo"]}`}
                    layout="fill"
                />
            </div>
            {type === "main" ? (
                <h1 className={`${style["title"]}`}>
                    Brand Intelligence - Una ayuda inteligente para proteger tu
                    Marca
                </h1>
            ) : (
                ""
            )}
        </>
    );
};
