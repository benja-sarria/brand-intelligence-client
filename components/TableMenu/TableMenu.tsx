import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import SortIcon from "@mui/icons-material/Sort";
import { SetStateAction, useState } from "react";
import style from "./TableMenu.module.scss";

const optionsNiceClass = ["Ordenar por Relevancia", "Ordenar por Clase"];
const optionsSelected = ["Ordenar seleccionados primero"];

const ITEM_HEIGHT = 48;

export const TableMenu = ({
    returnFilteredItems,
    setIsSortedByClass,
    currentPage,
    isSortedByClass,
    type,
    setIsSortedBySelect,
    setIsSortedByRelevance,
}: {
    returnFilteredItems: Function;
    setIsSortedByClass: Function;
    currentPage: number;
    isSortedByClass: boolean;
    type: string;
    setIsSortedBySelect: Function;
    setIsSortedByRelevance: Function;
}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (event: React.MouseEvent) => {
        setAnchorEl(null);
        console.log(event);

        const eventFix = event.target as HTMLElement;
        if (eventFix.textContent === "Ordenar seleccionados primero") {
            console.log("ordenando seleccionados");
            setIsSortedByRelevance(false);
            setIsSortedBySelect(true);
            setIsSortedByClass(false);
            // returnFilteredItems(currentPage, true);
        } else {
            console.log(eventFix.textContent);
            console.log(isSortedByClass);

            if (
                eventFix.textContent === "Ordenar por Clase" &&
                !isSortedByClass
            ) {
                setIsSortedByRelevance(false);
                setIsSortedBySelect(false);
                setIsSortedByClass(true);
                // returnFilteredItems(currentPage);
            } else if (eventFix.textContent === "Ordenar por Relevancia") {
                setIsSortedByRelevance(true);
                setIsSortedBySelect(false);
                setIsSortedByClass(false);
                // returnFilteredItems(currentPage);
            }
        }
        const pageOne: any =
            document.querySelector(".MuiPagination-ul")!.children[1]
                .children[0];
        pageOne.click();
    };

    return type === "niceClass" ? (
        <div>
            {" "}
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? "long-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <SortIcon />
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{
                    "aria-labelledby": "long-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: "24ch",
                        backgroundColor: `var(--globalPurpleMain)`,
                        color: "white",
                        opacity: 1,
                    },
                }}
            >
                {optionsNiceClass.map((option) => (
                    <MenuItem
                        key={option}
                        onClick={(event: React.MouseEvent) => {
                            handleClose(event);
                        }}
                        className={`${style["custom-menu-item"]}`}
                    >
                        {option}
                    </MenuItem>
                ))}
            </Menu>{" "}
        </div>
    ) : (
        <div>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? "long-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <SortIcon />
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{
                    "aria-labelledby": "long-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: "24ch",
                        backgroundColor: `var(--globalPurpleMain)`,
                        color: "white",
                        opacity: 1,
                    },
                }}
            >
                {optionsSelected.map((option) => (
                    <MenuItem
                        key={option}
                        onClick={(event: React.MouseEvent) => {
                            handleClose(event);
                        }}
                        className={`${style["custom-menu-item"]}`}
                    >
                        {option}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
};
