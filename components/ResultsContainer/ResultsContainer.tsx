import { SyntheticEvent, useContext } from "react";
import { Accordion } from "react-bootstrap";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { NiceClassContext } from "../../context/NiceClassProvider";
import { ResultsCard } from "../ResultsCard/ResultsCard";
import style from "./ResultsContainer.module.scss";
import { IndividualTrademarkMatch } from "../../models/IndividualTrademarkMatch";

export const ResultsContainer = () => {
    const { applicationSumUp } = useContext(NiceClassContext);

    console.log(typeof applicationSumUp.similarities);

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
                                className={` ${style["accordion-custom-header"]} ${style["main-custom-header"]}`}
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
                                className={` ${style["custom-accordion-body"]} ${style["main-accordion-body"]}`}
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
                    <div
                        className={`${style["nice-card-text"]} ${style["accordion-btn-custom"]}  ${style["inpi-nice-class"]}`}
                        key={index}
                    >
                        <p>Clase Niza {niceClass}</p>
                    </div>
                );
            });
        }
    };

    const calculateAverage = (registry: IndividualTrademarkMatch) => {
        const avgDamerau =
            100 - (registry.criteria[0] * 100) / registry.trademarkName.length;

        const avgJaro = registry.criteria[1] * 100;

        const avgMetaphone = registry.criteria[2] * 100;

        const avgTfUse = registry.criteria[3] * 100;

        let totalAvg;
        if (avgMetaphone <= 50) {
            totalAvg = (avgDamerau + avgJaro + avgMetaphone + avgTfUse) / 3.8;
        } else {
            totalAvg = (avgDamerau + avgJaro + avgMetaphone + avgTfUse) / 4;
        }

        return {
            totalAvg,
            similarityDegree:
                totalAvg >= 75
                    ? "high"
                    : totalAvg < 75 && totalAvg >= 50
                    ? "moderate"
                    : totalAvg < 50 && totalAvg >= 25
                    ? "low"
                    : "barely",
        };
    };

    const toggleCriteria = (
        evt: SyntheticEvent | undefined,
        similarityNode: Element | undefined
    ) => {
        if (evt) {
            const target = evt.target as HTMLElement;
            console.log(target.parentElement?.parentElement);
            const container = target!.parentElement!.children[2];
            if (container.classList.contains("hidden-criteria")) {
                container.classList.remove("hidden-criteria");
            } else {
                container.classList.add("hidden-criteria");
            }
            const card = target.parentElement?.parentElement;
            if (!container.classList.contains("hidden-criteria")) {
                card!.classList.add(`${style["open-card"]}`);
            } else {
                card!.classList.remove(`${style["open-card"]}`);
            }
        } else if (similarityNode) {
            console.log(similarityNode.classList);

            if (!similarityNode.classList.contains("hidden-criteria")) {
                similarityNode.classList.add("hidden-criteria");
            }
        }
    };

    return (
        <div>
            <div>
                <div className={`${style["principal-cards-container"]}`}>
                    <ResultsCard
                        applicationSumUp={applicationSumUp}
                        closeHandler={closeHandler}
                        openHandler={openHandler}
                        renderNiceClasses={renderNiceClasses}
                        registry={undefined}
                        calculateAverage={calculateAverage}
                    />
                    <div className={`card ${style["sum-up-card"]}`}>
                        <div>
                            <h2>Resumen de la Protección</h2>
                            <div>
                                <h3>Clases Niza a proteger</h3>
                                <div>{renderNiceClasses()}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {typeof applicationSumUp.similarities !== "string" ? (
                applicationSumUp.similarities.map(
                    (registry: IndividualTrademarkMatch, index: number) => {
                        return (
                            <ResultsCard
                                applicationSumUp={applicationSumUp}
                                closeHandler={closeHandler}
                                openHandler={openHandler}
                                renderNiceClasses={renderNiceClasses}
                                registry={registry}
                                key={index}
                                calculateAverage={calculateAverage}
                                toggleCriteria={toggleCriteria}
                            />
                        );
                    }
                )
            ) : (
                <div>No hay similitudes</div>
            )}
            {}
        </div>
    );
};
