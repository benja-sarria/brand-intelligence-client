import { createContext, useState } from "react";

export const NiceClassContext = createContext<any>(null);

export const NiceClassProvider = ({ children }: { children: any }) => {
    const [niceClass, setNiceClass] = useState();
    const [category, setCategory] = useState();
    return (
        <NiceClassContext.Provider
            value={{ niceClass, setNiceClass, setCategory, category }}
        >
            {children}
        </NiceClassContext.Provider>
    );
};
