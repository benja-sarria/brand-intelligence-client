import { useCallback, useContext, useEffect, useState } from "react";
import { NiceClassContext } from "../../context/NiceClassProvider";
import style from "./TrademarkFormContainer.module.scss";
import { TrademarkFormCard } from "../TrademarkFormCard/TrademarkFormCard";
import debounce from "lodash.debounce";
import { ResultsContainer } from "../ResultsContainer/ResultsContainer";
import { LoadingComponent } from "../LoadingComponent/LoadingComponent";

export const TrademarkFormContainer = () => {
    const {
        selectedNiceProtection,
        setSelectedTrademarkName,
        selectedTrademarkName,
        applicationSumUp,
        setApplicationSumUp,
        similarities,
        setSimilarities,
    } = useContext(NiceClassContext);
    const [loading, setLoading] = useState(false);

    console.log(selectedNiceProtection);

    const debounceInputChange = useCallback(
        debounce((inputValue) => setSelectedTrademarkName(inputValue), 1000),
        []
    );

    const handleInputChange = (evt: any) => {
        console.log(evt.target.value);

        debounceInputChange(evt.target.value);
    };

    const btnHandler = async (evt: {
        target: { value: string }[];
        preventDefault: Function;
    }) => {
        evt.preventDefault();
        const alertMessage = document.querySelector("#errorAlert");
        if (+evt.target[0].value || !evt.target[0].value) {
            if (alertMessage) {
                alertMessage.classList.remove(`${style["hidden"]}`);
                alertMessage.classList.add(`${style["show"]}`);
            }
        } else {
            if (alertMessage) {
                if (!alertMessage.classList.contains("hidden")) {
                    alertMessage.classList.add(`${style["hidden"]}`);
                    alertMessage.classList.remove(`${style["show"]}`);
                }
            }
            console.log("Se activó el botón");
            console.log(evt.target[0].value);
            setSelectedTrademarkName(evt.target[0].value);

            setLoading(true);

            const response = await fetch(
                `http://localhost:8080/api/wordTrademark?trademark=${evt.target[0].value.toLowerCase()}&translation=false`,
                {
                    keepalive: true,
                }
            );
            const data = await response.json();
            console.log(data.results.length);
            const similaritiesObtained = !data.results.length
                ? "No similarities found"
                : [...data.results];
            setSimilarities(similaritiesObtained);

            setLoading(false);
            /* setCategory(evt.target[0].value.replace(/[ \t]+$/, ""));
            setNiceClass(data); */
        }
    };
    useEffect(() => {
        setApplicationSumUp({
            ...applicationSumUp,
            selectedNiceProtection,
            trademark: selectedTrademarkName,
            similarities: similarities,
        });
    }, [selectedTrademarkName, similarities]);
    useEffect(() => {
        console.log(applicationSumUp);
    }, [applicationSumUp]);

    return loading ? (
        <div className={`${style["card-form-container"]}`}>
            <LoadingComponent />
        </div>
    ) : applicationSumUp &&
      applicationSumUp.selectedNiceProtection &&
      applicationSumUp.trademark &&
      applicationSumUp.similarities ? (
        <ResultsContainer />
    ) : (
        <div className={`${style["custom-trademark-container"]}`}>
            <TrademarkFormCard
                btnHandler={btnHandler}
                setApplicationSumUp={setApplicationSumUp}
                applicationSumUp={applicationSumUp}
                handleInputChange={handleInputChange}
            />
        </div>
    );
};
