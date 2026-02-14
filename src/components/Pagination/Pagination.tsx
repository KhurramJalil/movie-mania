import * as React from 'react';
import { Typography, Button } from '@mui/material';
import useStyles from './styles';
import { useTheme } from '@mui/material/styles';
import resolveStyles from '../../utils/resolveStyles';

interface IPaginationProps {
    currentPage: number,
    setPage: any,
    totalPages: number
}

function Pagination(props: IPaginationProps) {
    const theme = useTheme();
    const raw = useStyles();
    const classes = resolveStyles(raw, theme as any);

    const { currentPage, setPage, totalPages } = props;

    const handlePrev = () => {
        if (currentPage !== 1) { setPage((prevPage: number) => prevPage - 1); }
    };

    const handleNext = () => {
        if (currentPage !== totalPages) { setPage((prevPage: number) => prevPage + 1); }
    };

    if (totalPages === 0) return null;

    return (
        <div style={classes.container as any}>
            <Button onClick={handlePrev} variant="contained" sx={classes.button as any} color="primary" type="button">Prev</Button>
            <Typography variant="h4" style={classes.pageNumber as any}>{currentPage}</Typography>
            <Button onClick={handleNext} variant="contained" sx={classes.button as any} color="primary" type="button">Next</Button>
        </div>
    );
}

export default Pagination;
