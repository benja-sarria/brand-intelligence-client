import Checkbox from "@mui/material/Checkbox";
import { ChangeEvent, useState } from "react";

interface checkedModel {
    [description: string]: { checkedState: boolean };
}

export const ControlledCheckbox = ({
    checkboxHandler,
    name,
    description,
}: {
    checkboxHandler: Function;
    name: number;
    description: string;
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

        checkboxHandler(
            +event.target.name,
            event.target.checked,
            event.target.id
        );
    };

    return (
        <Checkbox
            checked={
                checked[description] ? checked[description].checkedState : false
            }
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}
            name={`${name}`}
            id={`${description}`}
        />
    );
};
