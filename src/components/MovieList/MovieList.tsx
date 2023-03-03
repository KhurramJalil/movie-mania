import React from 'react';
import { Grid } from '@mui/material';
import useStyles from './styles';
import Movie from '../Movie/Movie';

interface IMovie {
    id: number,
    poster_path?: string,
    title: string,
    vote_average: number
}

interface IMovieListProps {
    movies: { results: IMovie[] };
    numberOfMovies: number;
    excludeFirst: boolean;
}

function MovieList(props: IMovieListProps) {
    const classes = useStyles();
    const { excludeFirst, numberOfMovies, movies: { results } = {} } = props;

    return (
        <Grid container className={classes.movieContainer}>
            {results?.slice(excludeFirst ? 1 : 0, numberOfMovies).map((movieItem, i) => (
                <Movie movie={movieItem} mkey={i} key={i} />
            ))}
        </Grid>
    );
}

export default MovieList;
