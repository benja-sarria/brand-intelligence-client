import { IndividualTrademarkMatch } from "../../models/IndividualTrademarkMatch";
import { ApplicationSumUpModel } from "../../models/ApplicationSumUpModel";

import style from "./ResultsCard.module.scss";
import { CircularProgressWithLabel } from "../CircularProgressWithLabel/CircularProgressWithLabel";
import { SyntheticEvent, useEffect } from "react";

export const ResultsCard = ({
    applicationSumUp,
    openHandler,
    closeHandler,
    renderNiceClasses,
    registry = undefined,
    calculateAverage,
    toggleCriteria,
}: {
    applicationSumUp: ApplicationSumUpModel;
    openHandler: Function;
    closeHandler: Function;
    renderNiceClasses: Function;
    registry: undefined | IndividualTrademarkMatch;
    calculateAverage: Function;
    toggleCriteria?: Function;
}) => {
    console.log(registry);

    useEffect(() => {
        const criteriaContainers = document.querySelectorAll(
            ".custom-criteria-container"
        );
        console.log(criteriaContainers);
        const criteriaContArray: Element[] = Array.from(criteriaContainers);
        criteriaContArray.forEach((similarity) => {
            if (toggleCriteria) {
                toggleCriteria(undefined, similarity);
            }
        });
    }, []);

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
            </div>
        </div>
    ) : (
        <div
            className={`card ${style["nice-card"]}  ${style["alternate-card"]}`}
        >
            <div className={`card-body ${style["nice-card-body"]}`}>
                <div className={`${style["nice-card-header"]}`}>
                    <div className={`${style["similarity-average-container"]}`}>
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
                        <div
                            className={`${style["average-criteria-subcontainer"]}`}
                        >
                            <div
                                className={`${style["similarity-recommendation-container"]}`}
                            >
                                <p
                                    className={`${style["recommendation-text"]}`}
                                >
                                    <b
                                        className={`${
                                            style["similarity-degree"]
                                        } ${
                                            calculateAverage(registry)
                                                .similarityDegree === "high"
                                                ? "high-risk"
                                                : calculateAverage(registry)
                                                      .similarityDegree ===
                                                  "moderate"
                                                ? "moderate-risk"
                                                : calculateAverage(registry)
                                                      .similarityDegree ===
                                                  "low"
                                                ? "low-risk"
                                                : "barely-risk"
                                        }`}
                                    >
                                        {calculateAverage(registry)
                                            .similarityDegree === "high"
                                            ? "Alta"
                                            : calculateAverage(registry)
                                                  .similarityDegree ===
                                              "moderate"
                                            ? "Moderada"
                                            : calculateAverage(registry)
                                                  .similarityDegree === "low"
                                            ? "Baja"
                                            : "Prácticamente nula"}
                                        :
                                    </b>{" "}
                                    &nbsp;{" "}
                                    {calculateAverage(registry)
                                        .similarityDegree === "high" ? (
                                        <>
                                            En casos en que el porcentaje
                                            promedio de similitud es mayor al
                                            75%, es conveniente analizar lo
                                            siguiente: <br />
                                            <br />- El grado de similitud es
                                            demasiado elevado, con lo cual las
                                            probabilidades de rechazo son
                                            prácticamente inevitables. No es
                                            recomendable invertir
                                            aproximadamente 2 años para intentar
                                            el registro{" "}
                                            {
                                                "(plazo que demora aprox. el trámite)"
                                            }{" "}
                                            de una Marca que muy probablemente
                                            vaya a ser rechazada. <br />
                                            <br />- La Marca Comercial debe
                                            servirte para diferenciarte, y en
                                            este caso sucede exactamente lo
                                            opuesto, van a relacionarte con esta
                                            Marca. Con lo cual, desde el punto
                                            de vista económico y de marketing,
                                            no es recomendable intentar el
                                            registro.
                                        </>
                                    ) : calculateAverage(registry)
                                          .similarityDegree === "moderate" ? (
                                        <>
                                            En casos en que el porcentaje
                                            promedio de similitud es mayor al
                                            50% y menor al 75%, es conveniente
                                            analizar lo siguiente: <br />
                                            <br />
                                            - Una Marca Comercial debe
                                            distinguir tu producto de otros. El
                                            hecho de que existan Marcas
                                            similares te perjudica, ya que puede
                                            llevar a que tus clientes las
                                            confundan. Esto se ve traducido en
                                            un menor valor comercial de la
                                            Marca, en caso de que la concedan.
                                            <br />
                                            <br />- El riesgo de rechazo de tu
                                            Solicitud de Registro es elevado, lo
                                            que puede llevar a que pierdas
                                            aproximadamente 2 años intentando el
                                            mismo. Es recomendable invertir ese
                                            tiempo en una Marca que si te
                                            asegure exclusividad.
                                        </>
                                    ) : calculateAverage(registry)
                                          .similarityDegree === "low" ? (
                                        <>
                                            En casos en que el porcentaje
                                            promedio de similitud es mayor al
                                            25% y menor al 50%, la finalidad de
                                            destacar la similitud es a los fines
                                            de lo siguiente: <br />
                                            <br />
                                            - Entendemos que existen algunos
                                            indicios de similitud, aunque no
                                            resultan tan elevados como para
                                            tener certidumbre respecto de la
                                            posibilidad de conflicto. Puedes
                                            decidir avanzar e intentar registrar
                                            tu Marca Comercial, estando al tanto
                                            del riesgo bajo de conflictividad,
                                            pero existente.
                                            <br />
                                            <br />- Los titulares de estas
                                            Marcas Comerciales podrán presentar
                                            una Oposición a tu Solicitud de
                                            Registro. Esto no significa que no
                                            podrás registrar tu Marca, pero
                                            deberás buscar la ayuda de un
                                            Abogado o Agente de la Propiedad
                                            Industrial para asesorarte respecto
                                            de las posiblidades de superar dicha
                                            oposición.
                                        </>
                                    ) : (
                                        <>
                                            En casos en que el porcentaje
                                            promedio de similitud es menor al
                                            25%, la finalidad de destacar la
                                            similitud es a los fines de lo
                                            siguiente: <br />
                                            <br />
                                            - En estos supuestos, entendemos que
                                            la similitud es prácticamente
                                            inexistente, y su relevancia es
                                            relativa. En estos casos no suelen
                                            existir conflictos para el registro,
                                            pero consideramos pertinente
                                            ponerlos en tu conocimiento,
                                            simplemente para que estés al tanto,
                                            y no haya sorpresas.
                                            <br />
                                            <br />- Puedes intentar entonces
                                            avanzar con tu solicitud de registro
                                            de Marca Comercial.
                                        </>
                                    )}
                                </p>
                            </div>
                            <div
                                className={`${style["average-similarity-container"]}`}
                            >
                                <h5
                                    className={`${style["custom-criteria-subtitle"]}`}
                                >
                                    Similitud Total:
                                </h5>
                                <CircularProgressWithLabel
                                    value={calculateAverage(registry).totalAvg}
                                    mainMeter={true}
                                    id={
                                        calculateAverage(registry)
                                            .similarityDegree
                                    }
                                />
                            </div>
                        </div>
                    </div>
                    <p className={`${style["nice-card-subtitle"]}`}>{}</p>
                    <div className={`${style["custom-accordion-container"]}`}>
                        {renderNiceClasses(registry)}
                    </div>
                </div>

                <button
                    className={`btn  ${style["expand-criteria-btn"]}`}
                    onClick={(evt: SyntheticEvent) => {
                        if (toggleCriteria) {
                            toggleCriteria(evt, undefined);
                        }
                    }}
                >
                    Mostrar criterios
                </button>
                <div
                    className={`${style["custom-criteria-container"]} custom-criteria-container`}
                >
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
                                        className={`${style["custom-criteria-title"]}`}
                                    >
                                        Diferencia de caracteres: <br /> Modelo
                                        Damerau-Levenshtein
                                    </h5>
                                    <CircularProgressWithLabel
                                        value={percentage}
                                        key={index}
                                        mainMeter={false}
                                    />
                                </div>
                            );
                        } else if (index === 1) {
                            const percentage = similarity * 100;
                            return (
                                <div>
                                    <h5
                                        className={`${style["custom-criteria-title"]}`}
                                    >
                                        Diferencia de caracteres: <br />
                                        Modelo Jaro–Winkler
                                    </h5>
                                    <CircularProgressWithLabel
                                        value={percentage}
                                        key={index}
                                        mainMeter={false}
                                    />
                                </div>
                            );
                        } else if (index === 2) {
                            const percentage = similarity * 100;
                            return (
                                <div>
                                    <h5
                                        className={`${style["custom-criteria-title"]}`}
                                    >
                                        Análisis fonético: <br /> Modelo
                                        Metaphone
                                    </h5>
                                    <CircularProgressWithLabel
                                        value={percentage}
                                        key={index}
                                        mainMeter={false}
                                    />
                                </div>
                            );
                        } else if (index === 3) {
                            const percentage = similarity * 100;
                            return (
                                <div>
                                    <h5
                                        className={`${style["custom-criteria-title"]}`}
                                    >
                                        Similaridad de cosenos: <br /> Modelo
                                        TensorFlow USE
                                    </h5>
                                    <CircularProgressWithLabel
                                        value={percentage}
                                        key={index}
                                        mainMeter={false}
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
