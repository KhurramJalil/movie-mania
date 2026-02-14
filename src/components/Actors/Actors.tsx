import * as React from 'react';
import { useState } from 'react';
import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import Image from 'next/image';

import { StyledImage , ButtonContainer } from './styles';
import { useTheme } from '@mui/material/styles';
import { useGetActorQuery, useGetMoviesByActorIdQuery } from '../../services/TMDB';
import MovieList from '../MovieList/MovieList';
import Pagination from '../Pagination/Pagination';

function Actors() {
    const theme = useTheme();
    const [page, setPage] = useState(1);

    const getIdFromPath = () => {
        if (typeof window === 'undefined') return undefined;
        const parts = window.location.pathname.split('/').filter(Boolean);
        return parts[parts.length - 1];
    };

    const id = getIdFromPath();
    const { data, isFetching, error } = useGetActorQuery(id as any);
    const { data: movies } = useGetMoviesByActorIdQuery({ id, page });

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
                <Button startIcon={<ArrowBack />} onClick={() => (typeof window !== 'undefined' ? window.history.back() : undefined)} color="primary">
                    Go Back
                </Button>
            </Box>
        );
    }

    return (
        <>
            <Grid container spacing={3}>
                <Grid item lg={5} xl={4}>
                    {data?.profile_path ? (
                        <StyledImage
                            src={`https://image.tmdb.org/t/p/w780/${data.profile_path}`}
                            alt={data.name}
                            width={780}
                            height={1000}
                        />
                    ) : (
                        <StyledImage
                            src={'https://www.fillmurray.com/200/300'}
                            alt="placeholder"
                            width={200}
                            height={300}
                        />
                    )}
                </Grid>
                <Grid item lg={7} xl={8} style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                    <Typography variant="h2" gutterBottom>{data?.name}</Typography>
                    <Typography variant="h5" gutterBottom>Born: {data?.birthday ? new Date(data?.birthday).toDateString() : 'Unknown'}</Typography>
                    <Typography variant="body1" align="justify" paragraph>{data?.biography || 'Sorry, no biography yet...'}</Typography>
                    <ButtonContainer>
                        <Button variant="contained" color="primary" target="_blank" href={`https://www.imdb.com/name/${data?.imdb_id}`}>IMDB</Button>
                        <Button startIcon={<ArrowBack />} onClick={() => (typeof window !== 'undefined' ? window.history.back() : undefined)} color="primary">Back</Button>
                    </ButtonContainer>
                </Grid>
            </Grid>
            <Box margin="2rem 0">
                <Typography variant="h2" gutterBottom align="center">Movies</Typography>
                {movies && <MovieList movies={movies} numberOfMovies={12} excludeFirst={false} />}
                <Pagination currentPage={page} setPage={setPage} totalPages={movies?.total_pages} />
            </Box>
        </>
    );
}

export default Actors;
