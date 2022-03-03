import Image from "next/image";
import { useContext } from "react";
import { Accordion } from "react-bootstrap";
import { NiceClassContext } from "../../context/NiceClassProvider";
import { niceInfo } from "../../helpers/niceClassificationIcons";
import style from "./NiceCard.module.scss";

export const NiceCard = ({ element }: { element: number }) => {
    const { category } = useContext(NiceClassContext);
    const parsedImg = niceInfo[element].img;
    const parsedDesc = niceInfo[element].desc;
    const title = niceInfo[element].title;
    const parsedTitle = title.replace("PRODUCTO", category);

    return (
        <div className={`card ${style["nice-card"]}`}>
            <div className={`card-body ${style["nice-card-body"]}`}>
                <div className={`${style["img-container"]}`}>
                    <Image
                        src={parsedImg}
                        alt=""
                        className={`${style["nice-img"]}`}
                        layout="fill"
                    />
                </div>
                <p className={`${style["nice-card-title"]}`}>
                    Selecciona la <b>Clase Niza {element}</b> si:
                </p>
                <p className={`${style["nice-card-subtitle"]}`}>
                    {" "}
                    {parsedTitle}
                </p>
                <button className={`btn ${style["custom-btn"]}`}>
                    Seleccionar
                </button>
                <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>
                            <div
                                className={`${style["nice-card-text"]} ${style["accordion-btn-custom"]}`}
                            >
                                Descripción de la Clase
                            </div>
                        </Accordion.Header>
                        <Accordion.Body>
                            <p className={`${style["nice-card-text"]}`}>
                                {parsedDesc}
                            </p>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>
        </div>
    );
};
