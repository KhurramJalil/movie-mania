import React from 'react';
import { Typography, Grid, Grow, Tooltip, Rating } from '@mui/material';
import { Link } from 'react-router-dom';
import useStyles from './styles';

interface IMovie {
    id: number,
    poster_path?: string,
    title: string,
    vote_average: number
}

interface IMovieProps {
    movie: IMovie,
    mkey: number
}

function Movie(props: IMovieProps) {
    const classes = useStyles();
    const { movie, mkey } = props;

    return (
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2} className={classes.movie}>
            <Grow in key={mkey} timeout={(mkey + 1) * 250}>
                <Link className={classes.links} to={`/movie-mania/movie/${movie.id}`}>
                    <img
                        src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : 'https://www.fillmurray.com/200/300'}
                        alt={movie.title}
                        className={classes.image}
                    />
                    <Typography className={classes.title} variant="h5">{movie.title}</Typography>
                    <Tooltip disableTouchListener title={`${movie.vote_average} / 10`}>
                        <div>
                            <Rating readOnly value={movie.vote_average / 2} precision={0.1} />
                        </div>
                    </Tooltip>
                </Link>
            </Grow>
        </Grid>
    );
}

export default Movie;
