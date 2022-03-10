import { SyntheticEvent, useContext } from "react";
import { Accordion } from "react-bootstrap";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { NiceClassContext } from "../../context/NiceClassProvider";
import { ResultsCard } from "../ResultsCard/ResultsCard";
import style from "./ResultsContainer.module.scss";
import { IndividualTrademarkMatch } from "../../models/IndividualTrademarkMatch";

export const ResultsContainer = () => {
    const { applicationSumUp } = useContext(NiceClassContext);

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

    const renderNiceClasses = (
        registry: undefined | IndividualTrademarkMatch = undefined
    ) => {
        if (!registry) {
            const protectionKeys = Object.keys(
                applicationSumUp.selectedNiceProtection
            );
            console.log(protectionKeys);

            return protectionKeys.map((niceClass, index) => {
                return (
                    <Accordion flush key={index}>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header
                                className={` ${style["accordion-custom-header"]}`}
                                onClick={(evt) => {
                                    openHandler(evt);
                                }}
                            >
                                <div
                                    className={`${style["nice-card-text"]} ${style["accordion-btn-custom"]}`}
                                >
                                    <p>Clase Niza {niceClass}</p>
                                </div>
                            </Accordion.Header>
                            <Accordion.Body
                                className={` ${style["custom-accordion-body"]}`}
                            >
                                <div>
                                    {applicationSumUp.selectedNiceProtection[
                                        niceClass
                                    ].map((product: string, index: number) => {
                                        return (
                                            <p
                                                className={`${style["nice-card-text"]}`}
                                                key={index}
                                            >
                                                {`[${niceClass}]`}
                                                {" - "} {product}
                                            </p>
                                        );
                                    })}
                                    <p
                                        className={`${style["nice-card-text"]}`}
                                    ></p>
                                    <div
                                        className={`${style["custom-accordion-blur"]}`}
                                    ></div>
                                </div>
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
                );
            });
        } else {
            return registry.niceClass.map((niceClass, index) => {
                console.log(typeof niceClass);
                console.log(registry.niceClass);

                return (
                    <Accordion flush key={index}>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header
                                className={` ${style["accordion-custom-header"]}`}
                                onClick={(evt) => {
                                    openHandler(evt);
                                }}
                            >
                                <div
                                    className={`${style["nice-card-text"]} ${style["accordion-btn-custom"]}`}
                                >
                                    <p>Clase Niza {niceClass}</p>
                                </div>
                            </Accordion.Header>
                            <Accordion.Body
                                className={` ${style["custom-accordion-body"]}`}
                            >
                                {/* protection goes here */}
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                );
            });
        }
    };

    return (
        <div>
            <div>
                <ResultsCard
                    applicationSumUp={applicationSumUp}
                    closeHandler={closeHandler}
                    openHandler={openHandler}
                    renderNiceClasses={renderNiceClasses}
                    registry={undefined}
                />
            </div>
            {applicationSumUp.similarities.map(
                (registry: IndividualTrademarkMatch, index: number) => {
                    return (
                        <ResultsCard
                            applicationSumUp={applicationSumUp}
                            closeHandler={closeHandler}
                            openHandler={openHandler}
                            renderNiceClasses={renderNiceClasses}
                            registry={registry}
                            key={index}
                        />
                    );
                }
            )}
        </div>
    );
};
