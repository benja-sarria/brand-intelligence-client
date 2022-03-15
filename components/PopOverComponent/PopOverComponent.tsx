import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import style from "./PopOverComponent.module.scss";
import { ReactChildren, useState } from "react";

export const PopOverComponent = ({
    children,
    childType,
}: {
    children: any;
    childType: string;
}) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <div>
            <div
                aria-owns={open ? "mouse-over-popover" : undefined}
                aria-haspopup="true"
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
            >
                {children}
            </div>
            <Popover
                id="mouse-over-popover"
                sx={{
                    pointerEvents: "none",
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
                className={`${style["popover-type"]}`}
            >
                <Typography
                    sx={{ p: 1, maxWidth: "32em" }}
                    bgcolor="var(--globalPurpleMain)"
                    color="white"
                >
                    {" "}
                    {childType === "product" ? (
                        <>
                            <b>Producto</b>: Es tipo {"producto"} si tu fabricas
                            o produces el mismo
                        </>
                    ) : (
                        <>
                            <b>Servicio</b>: Es tipo {"servicio"} si solamente
                            comercializas productos fabricados por otra persona,
                            o brindas directamente un servicio
                        </>
                    )}
                </Typography>
            </Popover>
        </div>
    );
};
