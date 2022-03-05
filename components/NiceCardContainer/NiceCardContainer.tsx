import { useContext, useState } from "react";
import { NiceClassContext } from "../../context/NiceClassProvider";
import { NiceCard } from "../NiceCard/NiceCard";
import { NiceProductList } from "../NiceProductList/NiceProductList";
import style from "./NiceCardContainer.module.scss";

export const NiceCardContainer = () => {
    const { niceClass, category } = useContext(NiceClassContext);

    console.log(niceClass);

    return (
        <div className={`${style["custom-section-container"]}`}>
            <div className={`${style["custom-subtitle-container"]}`}>
                <p className={`${style["custom-subtitle"]}`}>
                    Si lo que deseas proteger es{" "}
                    <b>{`"${category.slice(0, 1).toUpperCase()}${category.slice(
                        1,
                        category.length
                    )}"`}</b>{" "}
                    te recomendamos que revises los productos de las siguientes
                    Clases Niza:
                </p>
            </div>
            <div className={style["nice-class-container"]}>
                {niceClass.niceClass.map((element: number, index: number) => {
                    return <NiceCard key={index} element={element} />;
                })}
            </div>
            <div className={`${style["custom-table-container"]}`}>
                <NiceProductList />
            </div>
        </div>
    );
};
