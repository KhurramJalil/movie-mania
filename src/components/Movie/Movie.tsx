import * as React from 'react';
import { Typography, Grid, Grow, Tooltip, Rating } from '@mui/material';
import useStyles from './styles';
import { useTheme } from '@mui/material/styles';
import resolveStyles from '../../utils/resolveStyles';
import Image from 'next/image';
import Link from 'next/link';

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
    const theme = useTheme();
    const raw = useStyles();
    const classes = resolveStyles(raw, theme);
    const { movie, mkey } = props;

    return (
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2} sx={classes.movie}>
            <Grow in key={mkey} timeout={(mkey + 1) * 250}>
                <Link href={`/movie/${movie.id}`} className="link" style={classes.links}>
                    {movie.poster_path ? (
                        <Image
                            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                            alt={movie.title}
                            width={200}
                            height={300}
                            style={classes.image as any}
                        />
                    ) : (
                        <Image src={'https://www.fillmurray.com/200/300'} alt="placeholder" width={200} height={300} style={classes.image as any} />
                    )}
                    <Typography style={classes.title as any} variant="h5">{movie.title}</Typography>
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
