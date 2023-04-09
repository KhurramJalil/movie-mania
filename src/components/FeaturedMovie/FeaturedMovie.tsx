import React from 'react';
import { Box, Typography, Card, CardContent, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';
import useStyles from './styles';

interface IMovieProps {
    id: number,
    poster_path?: string,
    title: string,
    vote_average: number,
    overview: string,
    backdrop_path: string
}

function FeaturedMovie(props: { movie: IMovieProps }) {
    const classes = useStyles();
    const { movie } = props;

    if (!movie) return null;

    return (
        <Box component={Link} to={`/movie-mania/movie/${movie.id}`} className={classes.featuredCardContainer}>
            <Card className={classes.card} classes={{ root: classes.cardRoot }}>
                <CardMedia
                    component="img"
                    alt={movie.title}
                    image={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
                    title={movie.title}
                    className={classes.cardMedia}
                />
                <Box padding="20px">
                    <CardContent className={classes.cardContent} classes={{ root: classes.cardContentRoot }}>
                        <Typography variant="h5" gutterBottom>{movie.title}</Typography>
                        <Typography variant="body2">{movie.overview}</Typography>
                    </CardContent>
                </Box>
            </Card>
        </Box>
    );
}

export default FeaturedMovie;
