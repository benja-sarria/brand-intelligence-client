import { useContext, useState } from "react";
import { NiceClassContext } from "../../context/NiceClassProvider";
import { NiceCard } from "../NiceCard/NiceCard";
import { NiceProductList } from "../NiceProductList/NiceProductList";
import style from "./NiceCardContainer.module.scss";

export const NiceCardContainer = () => {
    const { niceClass } = useContext(NiceClassContext);
    const [showProductList, setShowProductList] = useState(false);
    console.log(niceClass);

    return (
        <div className={`${style["custom-section-container"]}`}>
            <div className={`${style["custom-subtitle-container"]}`}>
                <p className={`${style["custom-subtitle"]}`}>
                    Selecciona las Clases Niza que consideres que involucran lo
                    que deseas proteger
                </p>
            </div>
            <div className={style["nice-class-container"]}>
                {niceClass.niceClass.map((element: number, index: number) => {
                    return <NiceCard key={index} element={element} />;
                })}
            </div>
            <div className={`${style["custom-btn-container"]}`}>
                <button
                    className={`btn ${style["custom-btn"]}`}
                    onClick={() => {
                        setShowProductList(!showProductList);
                    }}
                >
                    Buscar con Precisión por Productos
                </button>
            </div>
            {showProductList && <NiceProductList />}
        </div>
    );
};
