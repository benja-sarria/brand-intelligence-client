import { IndividualTrademarkMatch } from "../../models/IndividualTrademarkMatch";
import { ApplicationSumUpModel } from "../../models/ApplicationSumUpModel";

import style from "./ResultsCard.module.scss";
import { CircularProgressWithLabel } from "../CircularProgressWithLabel/CircularProgressWithLabel";

export const ResultsCard = ({
    applicationSumUp,
    openHandler,
    closeHandler,
    renderNiceClasses,
    registry = undefined,
}: {
    applicationSumUp: ApplicationSumUpModel;
    openHandler: Function;
    closeHandler: Function;
    renderNiceClasses: Function;
    registry: undefined | IndividualTrademarkMatch;
}) => {
    console.log(registry);

    return !registry ? (
        <div
            className={`card ${style["nice-card"]} ${style["owners-card"]} ${style["main-card"]}`}
        >
            <div className={`card-body ${style["nice-card-body"]}`}>
                <p className={`${style["nice-card-title"]}`}>
                    Marca (Denominación) pretendida :{" "}
                    <b>
                        {applicationSumUp.trademark.slice(0, 1).toUpperCase()}
                        {applicationSumUp.trademark.slice(
                            1,
                            applicationSumUp.trademark.length
                        )}
                    </b>
                </p>
                <p className={`${style["nice-card-subtitle"]}`}>{}</p>
                <div className={`${style["custom-accordion-container"]}`}>
                    {renderNiceClasses()}
                </div>
            </div>
        </div>
    ) : (
        <div
            className={`card ${style["nice-card"]}  ${style["alternate-card"]}`}
        >
            <div className={`card-body ${style["nice-card-body"]}`}>
                <div className={`${style["nice-card-header"]}`}>
                    <p className={`${style["nice-card-title"]}`}>
                        Similitud encontrada:{" "}
                        <b className={`${style["brand-title"]}`}>
                            {`"${registry.trademarkName
                                .slice(0, 1)
                                .toUpperCase()}${registry.trademarkName.slice(
                                1,
                                registry.trademarkName.length
                            )}"`}
                        </b>
                    </p>
                    <p className={`${style["nice-card-subtitle"]}`}>{}</p>
                    <div className={`${style["custom-accordion-container"]}`}>
                        {renderNiceClasses(registry)}
                    </div>
                </div>
                <div className={`${style["custom-criteria-container"]}`}>
                    {registry.criteria.map((similarity, index) => {
                        console.log(`El index es ${index} y la similaridad:`);
                        console.log(similarity);
                        if (index === 0) {
                            const percentage =
                                100 -
                                (similarity * 100) /
                                    registry.trademarkName.length;

                            console.log(`El percentage es ${percentage}`);

                            return (
                                <div>
                                    <h5
                                        className={`${style["custom-criteria-subtitle"]}`}
                                    >
                                        Diferencia de caracteres: <br /> Modelo
                                        Damerau-Levenshtein
                                    </h5>
                                    <CircularProgressWithLabel
                                        value={percentage}
                                        key={index}
                                    />
                                </div>
                            );
                        } else if (index === 1) {
                            const percentage = similarity * 100;
                            return (
                                <div>
                                    <h5
                                        className={`${style["custom-criteria-subtitle"]}`}
                                    >
                                        Diferencia de caracteres: <br />
                                        Modelo Jaro–Winkler
                                    </h5>
                                    <CircularProgressWithLabel
                                        value={percentage}
                                        key={index}
                                    />
                                </div>
                            );
                        } else if (index === 2) {
                            const percentage = similarity * 100;
                            return (
                                <div>
                                    <h5
                                        className={`${style["custom-criteria-subtitle"]}`}
                                    >
                                        Análisis fonético: <br /> Modelo
                                        Metaphone
                                    </h5>
                                    <CircularProgressWithLabel
                                        value={percentage}
                                        key={index}
                                    />
                                </div>
                            );
                        } else if (index === 3) {
                            const percentage = similarity * 100;
                            return (
                                <div>
                                    <h5
                                        className={`${style["custom-criteria-subtitle"]}`}
                                    >
                                        Similaridad de cosenos: <br /> Modelo
                                        TensorFlow USE
                                    </h5>
                                    <CircularProgressWithLabel
                                        value={percentage}
                                        key={index}
                                    />
                                </div>
                            );
                        }
                    })}
                </div>
            </div>
        </div>
    );
};
