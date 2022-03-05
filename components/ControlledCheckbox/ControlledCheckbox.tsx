import Checkbox from "@mui/material/Checkbox";
import { ChangeEvent, useEffect, useState } from "react";
import style from "./ControlledCheckbox.module.scss";

interface checkedModel {
    [description: string]: { checkedState: boolean };
}

interface selectedNiceProtectionModel {
    [niceClass: number]: string[];
}

export const ControlledCheckbox = ({
    checkboxHandler,
    name,
    description,
    selectedNiceProtection,
}: {
    checkboxHandler: Function;
    name: number;
    description: string;
    selectedNiceProtection: selectedNiceProtectionModel;
}) => {
    const [checked, setChecked] = useState<checkedModel>({
        product: { checkedState: false },
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setChecked({
            ...checked,
            [event.target.id]: { checkedState: event.target.checked },
        });
        console.log(event);
        console.log(event.target.checked);
        const nativeEvent = event.nativeEvent as any;
        const row = nativeEvent.path.filter((element: HTMLElement) => {
            if (element.classList) {
                return element.classList.contains("custom-row");
            }
        });
        const cells = Array.from(document.querySelectorAll(".custom-cell"));

        const filteredCells = cells.filter((cell: any) => {
            return cell.dataset.name === event.target.id;
        });

        checkboxHandler(
            +event.target.name,
            event.target.checked,
            event.target.id,
            row,
            filteredCells
        );
    };

    useEffect(() => {}, [checked]);

    return (
        <Checkbox
            checked={
                selectedNiceProtection[name] &&
                selectedNiceProtection[name].includes(description)
                    ? true
                    : checked[description]
                    ? checked[description].checkedState
                    : false
            }
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}
            name={`${name}`}
            id={`${description}`}
            className={
                selectedNiceProtection[name] &&
                selectedNiceProtection[name].includes(description)
                    ? `${style["custom-checkbox-checked"]}`
                    : checked[description] && checked[description].checkedState
                    ? `${style["custom-checkbox-checked"]}`
                    : `${style["custom-checkbox-unchecked"]}`
            }
        />
    );
};
