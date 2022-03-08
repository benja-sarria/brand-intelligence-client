import { createContext, useState } from "react";
import { ApplicationSumUpModel } from "../models/ApplicationSumUpModel";

export const NiceClassContext = createContext<any>(null);

export const NiceClassProvider = ({ children }: { children: any }) => {
    const [niceClass, setNiceClass] = useState();
    const [category, setCategory] = useState();
    const [selectedNiceProtection, setSelectedNiceProtection] = useState({});
    const [selectedTrademarkName, setSelectedTrademarkName] =
        useState<string>();
    const [similarities, setSimilarities] = useState();
    const [applicationSumUp, setApplicationSumUp] =
        useState<ApplicationSumUpModel>();
    return (
        <NiceClassContext.Provider
            value={{
                niceClass,
                setNiceClass,
                setCategory,
                category,
                setSelectedNiceProtection,
                selectedNiceProtection,
                selectedTrademarkName,
                setSelectedTrademarkName,
                applicationSumUp,
                setApplicationSumUp,
                similarities,
                setSimilarities,
            }}
        >
            {children}
        </NiceClassContext.Provider>
    );
};
