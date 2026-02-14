import * as React from 'react';
import { Grid } from '@mui/material';
import useStyles from './styles';
import Movie from '../Movie/Movie';
import { useTheme } from '@mui/material/styles';
import resolveStyles from '../../utils/resolveStyles';

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
    const theme = useTheme();
    const raw = useStyles();
    const classes = resolveStyles(raw, theme as any);
    const { excludeFirst, numberOfMovies, movies: { results } = {} } = props;

    return (
        <Grid container sx={classes.movieContainer as any}>
            {results?.slice(excludeFirst ? 1 : 0, numberOfMovies).map((movieItem, i) => (
                <Movie movie={movieItem} mkey={i} key={i} />
            ))}
        </Grid>
    );
}

export default MovieList;
