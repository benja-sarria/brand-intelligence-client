import { useContext } from "react";
import { NiceClassContext } from "../../context/NiceClassProvider";
import { NiceCard } from "../NiceCard/NiceCard";
import style from "./NiceCardContainer.module.scss";

export const NiceCardContainer = () => {
    const { niceClass } = useContext(NiceClassContext);
    console.log(niceClass.niceClass);

    return (
        <div>
            <div>
                <p>
                    Selecciona las Clases Niza que consideres que involucran lo
                    que deseas proteger
                </p>
            </div>
            <div className={style["nice-class-container"]}>
                {niceClass.niceClass.map((element: number, index: number) => {
                    return <NiceCard key={index} element={element} />;
                })}
            </div>
        </div>
    );
};
