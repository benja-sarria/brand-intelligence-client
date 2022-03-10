import CircularProgress, {
    CircularProgressProps,
} from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import style from "./CircularProgressWithLabel.module.scss";

export const CircularProgressWithLabel = (
    props: CircularProgressProps & { value: number }
) => {
    return (
        <Box
            sx={{ position: "relative", display: "inline-flex" }}
            className={`${style["custom-mui-box"]}`}
        >
            <CircularProgress
                variant="determinate"
                {...props}
                className={`${style["custom-progress-circle"]}`}
            />
            <Box
                sx={{
                    top: 0,
                    left: 97,
                    bottom: 0,
                    right: 0,
                    position: "absolute",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Typography
                    variant="caption"
                    component="div"
                    color="text.secondary"
                    className={`${style["custom-progress-circle"]}`}
                >{`${Math.round(props.value)}%`}</Typography>
            </Box>
        </Box>
    );
};
