import { Box, Typography, Card, CardContent, CardMedia } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import * as React from 'react';
import rawStyles from './styles';
import resolveStyles from '../../utils/resolveStyles';
import Link from 'next/link';

interface IMovieProps {
    id: number,
    poster_path?: string,
    title: string,
    vote_average: number,
    overview: string,
    backdrop_path: string
}

function FeaturedMovie(props: { movie: IMovieProps }) {
    const theme = useTheme();
    const raw = rawStyles();
    const classes = resolveStyles(raw, theme as any);

    const { movie } = props;

    if (!movie) return null;

    return (
        <Box component={Link} href={`/movie/${movie.id}`} sx={classes.featuredCardContainer}>
            <Card sx={classes.card as any} classes={{ root: classes.cardRoot}}>
                <CardMedia
                    component="img"
                    alt={movie.title}
                    image={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
                    title={movie.title}
                    sx={classes.cardMedia as any}
                />
                <Box padding="20px">
                    <CardContent sx={classes.cardContent as any} classes={{ root: classes.cardContentRoot}}>
                        <Typography variant="h5" gutterBottom>{movie.title}</Typography>
                        <Typography variant="body2">{movie.overview}</Typography>
                    </CardContent>
                </Box>
            </Card>
        </Box>
    );
}

export default FeaturedMovie;
