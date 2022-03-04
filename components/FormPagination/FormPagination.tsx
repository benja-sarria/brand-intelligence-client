import { MouseEventHandler, useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export const FormPagination = ({
    pages,
    setPage,
}: {
    pages: number;
    setPage: Function;
}) => {
    // 3982 Pages

    const handleChange = (event: any, value: number) => {
        console.log(event);
        console.log((value - 1) * 20);
        setPage((value - 1) * 20);
    };

    return (
        <Stack spacing={2}>
            <Pagination
                count={Math.round(pages)}
                color="secondary"
                size="large"
                onChange={handleChange}
            />
        </Stack>
    );
};
