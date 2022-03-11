import CircularProgress, {
    CircularProgressProps,
} from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import style from "./CircularProgressWithLabel.module.scss";

export const CircularProgressWithLabel = (
    props: CircularProgressProps & {
        value: number;
    } & { mainMeter: boolean } & { id?: string }
) => {
    useEffect(() => {
        const meters = document.querySelectorAll("#high, #moderate, #low");

        meters.forEach((meter) => {
            console.dir(meter);
            const svgImage = meter!.children[0];

            console.log(svgImage!.parentElement!.parentElement!.children[1]);

            const mainAvgTitleNode =
                svgImage!.parentElement!.parentElement!.children[1];

            mainAvgTitleNode!.classList.add("main-avg-title");
            if (
                meter!.id === "high" &&
                !svgImage!.classList.contains("high-risk")
            ) {
                svgImage!.classList.add("high-risk");
            } else if (
                meter!.id === "moderate" &&
                !svgImage!.classList.contains("moderate-risk")
            ) {
                svgImage!.classList.add("moderate-risk");
            } else if (
                meter!.id === "low" &&
                !svgImage!.classList.contains("low-risk")
            ) {
                svgImage!.classList.add("low-risk");
            } else if (
                meter!.id === "barely" &&
                !svgImage!.classList.contains("barely-risk")
            ) {
                svgImage!.classList.add("barely-risk");
            }
        });
    }, []);

    return (
        <Box
            sx={{ position: "relative", display: "inline-flex" }}
            className={`${style["custom-mui-box"]}`}
        >
            <CircularProgress
                variant="determinate"
                {...props}
                className={`${style["custom-progress-circle"]}  ${
                    props.mainMeter && style["main-meter"]
                }`}
            />
            <Box
                sx={{
                    top: 0,
                    left: 102,
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
                    className={`${style["custom-progress-circle"]} ${
                        props.mainMeter && style["main-meter"]
                    } `}
                >{`${Math.round(props.value)}%`}</Typography>
            </Box>
        </Box>
    );
};
