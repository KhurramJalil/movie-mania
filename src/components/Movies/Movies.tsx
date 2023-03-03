import React, { useState } from 'react';
import { Box, CircularProgress, useMediaQuery, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import MovieList from '../MovieList/MovieList';
import Pagination from '../Pagination/Pagination';
import FeaturedMovie from '../FeaturedMovie/FeaturedMovie';

import { useGetMoviesQuery } from '../../services/TMDB';

function Movies() {
    const [page, setPage] = useState(1);
    const { genreIdOrCategoryName, searchQuery } = useSelector((state: any) => state.currentGenreOrCategory);
    const { data, error, isFetching } = useGetMoviesQuery({ genreIdOrCategoryName, page, searchQuery });

    const lg = useMediaQuery((theme: any) => theme.breakpoints.only('lg'));
    const numberOfMovies = lg ? 17 : 19;

    if (isFetching) {
        return (
            <Box display="flex" justifyContent="center">
                <CircularProgress size="4rem" />
            </Box>
        );
    }

    if (!data.results.length) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" mt="20px">
                <Typography variant="h4">
                    No movies that match that name.
                    <br />
                    Please searh for something else.
                </Typography>
            </Box>
        );
    }

    if (error) return null;

    return (
        <div>
            <FeaturedMovie movie={data.results[0]} />
            <MovieList movies={data} numberOfMovies={numberOfMovies} excludeFirst />
            <Pagination currentPage={page} setPage={setPage} totalPages={data.total_pages} />
        </div>
    );
}

export default Movies;
