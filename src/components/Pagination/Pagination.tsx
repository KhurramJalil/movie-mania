import React from 'react';
import { Typography, Button } from '@mui/material';
import useStyles from './styles';

interface IPaginationProps {
    currentPage: number,
    setPage: any,
    totalPages: number
}

function Pagination(props: IPaginationProps) {
    const classes = useStyles();
    const { currentPage, setPage, totalPages } = props;

    const handlePrev = () => {
        if (currentPage !== 1) { setPage((prevPage: number) => prevPage - 1); }
    };

    const handleNext = () => {
        if (currentPage !== totalPages) { setPage((prevPage: number) => prevPage + 1); }
    };

    if (totalPages === 0) return null;

    return (
        <div className={classes.container}>
            <Button onClick={handlePrev} variant="contained" className={classes.button} color="primary" type="button">Prev</Button>
            <Typography variant="h4" className={classes.pageNumber}>{currentPage}</Typography>
            <Button onClick={handleNext} variant="contained" className={classes.button} color="primary" type="button">Next</Button>
        </div>
    );
}

export default Pagination;
