import * as React from 'react';
import { useState, useEffect } from 'react';
import { Modal, Typography, Button, ButtonGroup, Grid, Box, CircularProgress, Rating } from '@mui/material';
import { Movie as MovieIcon, Theaters, Language, PlusOne, Favorite, FavoriteBorderOutlined, Remove, ArrowBack } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import rawStyles from './styles';
import resolveStyles from '../../utils/resolveStyles';
import MovieList from '../MovieList/MovieList';
import { useGetMovieQuery, useGetRecommendationsQuery, useGetListQuery } from '../../services/TMDB';
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';
import tempIcons from '../../assets/genres';
import { useTheme } from '@mui/material/styles';
import Image from 'next/image';
import Link from 'next/link';

function MovieInfo() {
    const theme = useTheme();
    const raw = rawStyles();
    const classes = resolveStyles(raw, theme as any);

    const dispatch = useDispatch();
    const genreIcons: { [key: string]: any } = tempIcons;
    const { user } = useSelector((state: any) => state.user);

    // Extract id from the current URL path instead of react-router's useParams
    const getIdFromPath = () => {
        if (typeof window === 'undefined') return undefined;
        const parts = window.location.pathname.split('/').filter(Boolean);
        return parts[parts.length - 1];
    };

    const id = getIdFromPath();

    const { data, error, isFetching } = useGetMovieQuery(id as any);
    const { data: favoriteMovies } = useGetListQuery({ listName: 'favorite/movies', accountId: user.id, sessionId: typeof window !== 'undefined' ? localStorage.getItem('session_id') : null, page: 1 });
    const { data: watchlistMovies } = useGetListQuery({ listName: 'watchlist/movies', accountId: user.id, sessionId: typeof window !== 'undefined' ? localStorage.getItem('session_id') : null, page: 1 });
    const { data: recommendations } = useGetRecommendationsQuery({ list: '/recommendations', movie_id: id as any });

    const [open, setOpen] = useState(false);
    const [isMovieFavorited, setIsMovieFavorited] = useState(false);
    const [isMovieWatchlisted, setIsMovieWatchlisted] = useState(false);

    useEffect(() => {
        setIsMovieFavorited(!!favoriteMovies?.results?.find((movie: any) => movie?.id === data?.id));
    }, [favoriteMovies, data]);
    useEffect(() => {
        setIsMovieWatchlisted(!!watchlistMovies?.results?.find((movie: any) => movie?.id === data?.id));
    }, [watchlistMovies, data]);

    const addToFavorites = async () => {
        await axios.post(`https://api.themoviedb.org/3/account/${user.id}/favorite?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY ?? ''}&session_id=${typeof window !== 'undefined' ? localStorage.getItem('session_id') : ''}`, {
            media_type: 'movie',
            media_id: id,
            favorite: !isMovieFavorited,
        });

        setIsMovieFavorited((prev) => !prev);
    };

    const addToWatchList = async () => {
        await axios.post(`https://api.themoviedb.org/3/account/${user.id}/watchlist?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY ?? ''}&session_id=${typeof window !== 'undefined' ? localStorage.getItem('session_id') : ''}`, {
            media_type: 'movie',
            media_id: id,
            watchlist: !isMovieWatchlisted,
        });

        setIsMovieWatchlisted((prev) => !prev);
    };

    if (isFetching) {
        return (
            <Box display="flex" alignItems="center" justifyContent="center">
                <CircularProgress size="8rem" />
            </Box>
        );
    }

    if (error) {
        return (
            <Box display="flex" alignItems="center" justifyContent="center">
                <a href="/">Something went wrong - Go back.</a>
            </Box>
        );
    }

    return (
        <Grid container sx={classes.containerSpaceAround as any}>
            <Grid item sm={12} lg={4} alignContent="center" component="div">
                {data?.poster_path ? (
                    <Image
                        src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`}
                        alt={data?.title ?? 'Poster'}
                        width={500}
                        height={750}
                        style={classes.poster as any}
                    />
                ) : (
                    <Image
                        src={'https://www.fillmurray.com/200/300'}
                        alt="placeholder"
                        width={200}
                        height={300}
                        style={classes.poster as any}
                    />
                )}
            </Grid>
            <Grid item container direction="column" lg={7}>
                <Typography variant="h3" align="center" gutterBottom>
                    {data?.title} ({data?.release_date?.split('-')[0]})
                </Typography>
                <Typography variant="h5" align="center" gutterBottom>
                    {data?.tagline}
                </Typography>
                <Grid item sx={classes.containerSpaceAround as any}>
                    <Box display="flex" alignContent="center">
                        <Rating readOnly value={data?.vote_average / 2} />
                        <Typography gutterBottom variant="subtitle1" style={{ marginLeft: '10px' }}>
                            {data?.vote_average} / 10
                        </Typography>
                    </Box>
                    <Typography gutterBottom variant="h6" align="center">{data?.runtime}min</Typography>
                </Grid>
                <Grid item sx={classes.genresContainer as any}>
                    {data?.genres?.map((genre: any) => (
                        <a key={genre.name} style={classes.links as any} href="#" onClick={(e) => { e.preventDefault(); dispatch(selectGenreOrCategory(genre.id)); }}>
                            <Image src={genreIcons[genre.name.toLowerCase()]} alt={genre.name} width={30} height={30} style={classes.genreImage as any} />
                            <Typography color="textPrimary" variant="subtitle1">{genre?.name}</Typography>
                        </a>
                    ))}
                </Grid>
                <Typography variant="h5" gutterBottom style={{ marginTop: '20px' }}>Overview</Typography>
                <Typography style={{ marginBottom: '2rem' }}>{data?.overview}</Typography>
                <Typography variant="h5" gutterBottom>Top Cast</Typography>
                <Grid item container spacing={2}>
                    {data && data?.credits?.cast?.map((character: any, i: React.Key | null | undefined) => (
                        character.profile_path && (
                            <Grid key={i} item xs={4} md={2} style={{ textDecoration: 'none' }}>
                                <Link href={`/actors/${character.id}`} style={{ textDecoration: 'none' }}>
                                    <Image
                                        style={classes.castImage as any}
                                        src={`https://image.tmdb.org/t/p/w500/${character.profile_path}`}
                                        alt={character.name}
                                        width={200}
                                        height={300}
                                    />
                                    <Typography color="textPrimary" align="center">{character?.name}</Typography>
                                    <Typography color="textSecondary" align="center">
                                        {character.character.split('/')[0]}
                                    </Typography>
                                </Link>
                            </Grid>
                        )
                    )).slice(0, 6)}
                </Grid>
                <Grid item container style={{ marginTop: '2rem' }}>
                    <div style={classes.buttonContainer as any}>
                        <Grid item xs={12} sm={6} style={classes.buttonContainer as any}>
                            <ButtonGroup size="small" variant="outlined">
                                <Button target="_blank" rel="noopener noreferrer" href={data?.homepage} endIcon={<Language />}>Website</Button>
                                <Button target="_blank" rel="noopener noreferrer" href={`https://www.imdb.com/title/${data?.imdb_id}`} endIcon={<MovieIcon />}>IMDB</Button>
                                <Button onClick={() => setOpen(true)} href="#" endIcon={<Theaters />}>Trailer</Button>
                            </ButtonGroup>
                        </Grid>
                        <Grid item xs={12} sm={6} style={classes.buttonContainer as any}>
                            <ButtonGroup size="small" variant="outlined">
                                <Button onClick={addToFavorites} endIcon={isMovieFavorited ? <FavoriteBorderOutlined /> : <Favorite />}>
                                    {isMovieFavorited ? 'Unfavorite' : 'Favorite'}
                                </Button>
                                <Button onClick={addToWatchList} endIcon={isMovieWatchlisted ? <Remove /> : <PlusOne />}>
                                    Watchlist
                                </Button>
                                <Button endIcon={<ArrowBack />} sx={{ borderColor: 'primary.main' }}>
                                    <a href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Back</a>
                                </Button>
                            </ButtonGroup>
                        </Grid>
                    </div>
                </Grid>
            </Grid>
            <Box marginTop="5rem" width="100%">
                <Typography variant="h3" gutterBottom align="center">
                    You might also like
                </Typography>
                {recommendations ? <MovieList movies={recommendations} numberOfMovies={12} excludeFirst={false} /> : <Box>Sorry, nothing was found.</Box>}
            </Box>
            {data?.videos?.results?.length > 0 && (
                <Modal
                    closeAfterTransition
                    sx={classes.modal as any}
                    open={open}
                    onClose={() => setOpen(false)}
                >
                    <iframe
                        style={classes.video as any}
                        frameBorder="0"
                        title="Trailer"
                        src={`https://www.youtube.com/embed/${data.videos.results[0].key}`}
                        allow="autoplay"
                    />
                </Modal>
            )}
        </Grid>
    );
}

export default MovieInfo;
