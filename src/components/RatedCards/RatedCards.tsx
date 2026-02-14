import React from 'react';
import { Typography, Box } from '@mui/material';

import useStyles from './styles';
import Movie from '../Movie/Movie';

interface IMovieProps {
    id: number,
    poster_path?: string,
    title: string,
    vote_average: number
}

interface IRateCardsProps {
    movies: { results: IMovieProps[] };
    title: string;
}

function RatedCards(props: IRateCardsProps) {
    const classes = useStyles();
    const { title, movies: { results } = {} } = props;

    return (
        <Box>
            <Typography variant="h5" gutterBottom>{title}</Typography>
            <Box display="flex" flexWrap="wrap" sx={classes.container}>
                {results?.map((movieItem, i) => (
                    <Movie movie={movieItem} mkey={i} key={i} />
                ))}
            </Box>
        </Box>
    );
}

export default RatedCards;
