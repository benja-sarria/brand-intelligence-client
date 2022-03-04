import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import SortIcon from "@mui/icons-material/Sort";
import { SetStateAction, useState } from "react";

const options = ["Ordenar por Relevancia", "Ordenar por Clase"];

const ITEM_HEIGHT = 48;

export const TableMenu = ({
    returnFilteredItems,
    setIsSortedByClass,
    currentPage,
    isSortedByClass,
}: {
    returnFilteredItems: Function;
    setIsSortedByClass: Function;
    currentPage: number;
    isSortedByClass: boolean;
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
        if (eventFix.textContent === "Ordenar por Clase" && !isSortedByClass) {
            setIsSortedByClass(true);
            returnFilteredItems(currentPage).currentPage;
        } else if (
            eventFix.textContent === "Ordenar por Relevancia" &&
            isSortedByClass
        ) {
            setIsSortedByClass(false);
            returnFilteredItems(currentPage).currentPage;
        }
        const pageOne: any =
            document.querySelector(".MuiPagination-ul")!.children[1]
                .children[0];
        pageOne.click();
    };

    return (
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
                    },
                }}
            >
                {options.map((option) => (
                    <MenuItem
                        key={option}
                        onClick={(event: React.MouseEvent) => {
                            handleClose(event);
                        }}
                    >
                        {option}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
};
