import Image from "next/image";
import { SyntheticEvent, useContext } from "react";
import { Accordion } from "react-bootstrap";
import { NiceClassContext } from "../../context/NiceClassProvider";
import { niceInfo } from "../../helpers/niceClassificationIcons";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import style from "./NiceCard.module.scss";

export const NiceCard = ({ element }: { element: number }) => {
    const { category } = useContext(NiceClassContext);
    const parsedImg = niceInfo[element].img;
    const parsedDesc = niceInfo[element].desc;
    const title = niceInfo[element].title;
    const parsedTitle = title.replace("PRODUCTO", category);

    const closeHandler = (evt: SyntheticEvent) => {
        const nativeEvent = evt.nativeEvent as any;
        const [accordionItem]: HTMLElement[] = nativeEvent.path.filter(
            (element: any) => {
                if (element.classList) {
                    return element.classList.contains("accordion-item");
                }
            }
        );

        const [accordionHeader]: any = Array.from(
            accordionItem.children
        ).filter((element: any) => {
            if (element.classList) {
                return element.classList.contains("accordion-header");
            }
        });

        const [accordionButton]: any = Array.from(
            accordionHeader.children
        ).filter((element: any) => {
            if (element.classList) {
                return element.classList.contains("accordion-button");
            }
        });

        accordionButton!.click();

        const btnPath = Array.from(nativeEvent.path);
        const accordionBody: any = btnPath.filter((element: any) => {
            if (element.classList) {
                return element.classList.contains("accordion-collapse");
            }
        });
        accordionBody[0].classList.remove("show");
        accordionBody[0].style.removeProperty("opacity");
    };

    const openHandler = (evt: SyntheticEvent) => {
        console.log(evt);
        const nativeEvent = evt.nativeEvent as any;
        console.log(nativeEvent);

        const [accordionItem]: HTMLElement[] = nativeEvent.path.filter(
            (element: any) => {
                if (element.classList) {
                    return element.classList.contains("accordion-item");
                }
            }
        );
        console.dir(accordionItem);

        const [accordionCollapse]: any = Array.from(
            accordionItem.children
        ).filter((element: any) => {
            if (element.classList) {
                return element.classList.contains("accordion-collapse");
            }
        });

        console.log(accordionCollapse);

        accordionCollapse.style = "opacity: 0;";

        setTimeout(() => {
            accordionCollapse.style.cssText = "";
        }, 300);
    };

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
                    Protege en la <b>Clase Niza {element}</b> si:
                </p>
                <p className={`${style["nice-card-subtitle"]}`}>
                    {parsedTitle}
                </p>
                <Accordion flush>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header
                            onClick={(evt) => {
                                openHandler(evt);
                            }}
                        >
                            <div
                                className={`${style["nice-card-text"]} ${style["accordion-btn-custom"]}`}
                            >
                                Descripción de la Clase
                            </div>
                        </Accordion.Header>
                        <Accordion.Body
                            className={` ${style["custom-accordion-body"]}`}
                        >
                            <p className={`${style["nice-card-text"]}`}>
                                {parsedDesc}
                            </p>
                            <div
                                className={`${style["custom-accordion-blur"]}`}
                            ></div>
                            <button
                                onClick={(evt) => {
                                    closeHandler(evt);
                                }}
                                className={`btn ${style["custom-btn"]}  ${style["custom-close-btn"]}`}
                            >
                                <ArrowBackIcon
                                    className={`${style["custom-arrow-icon"]}`}
                                />
                            </button>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>
        </div>
    );
};
