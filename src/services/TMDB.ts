import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const tmdbapikey = '732dfe94c237f44327af913ebba97825'; // process.env.REACT_APP_TMDB_KEY;

export const tmdbApi = createApi({
    reducerPath: 'tmdbApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3' }),
    endpoints: (builder) => ({

        // Get Genres
        getGenres: builder.query({
            query: () => `/genre/movie/list?api_key=${tmdbapikey}`,
        }),

        // Get Movies by [Type]
        getMovies: builder.query({
            query: ({ genreIdOrCategoryName, page, searchQuery }) => {
                // Get Movies by Search
                if (searchQuery) {
                    return `/search/movie?query=${searchQuery}&page=${page}&api_key=${tmdbapikey}`;
                }

                // Get Movies by Category
                if (genreIdOrCategoryName && typeof genreIdOrCategoryName === 'string') {
                    return `/movie/${genreIdOrCategoryName}?page=${page}&api_key=${tmdbapikey}`;
                }

                // Get Movies by Genre
                if (genreIdOrCategoryName && typeof genreIdOrCategoryName === 'number') {
                    return `discover/movie?with_genres=${genreIdOrCategoryName}&page=${page}&api_key=${tmdbapikey}`;
                }

                // Get popular movies by default
                return `/movie/popular?page=${page}&api_key=${tmdbapikey}`;
            },
        }),

        // Get Movie
        getMovie: builder.query({
            query: (id) => `/movie/${id}?append_to_response=videos,credits&api_key=${tmdbapikey}`,
        }),

        // Get Recommendations
        getRecommendations: builder.query({
            query: ({ movieID, list }) => `/movie/${movieID}/${list}?api_key=${tmdbapikey}`,
        }),

        // Get Actor
        getActor: builder.query({
            query: (id) => `person/${id}?api_key=${tmdbapikey}`,
        }),

        // Get Movies by Actor
        getMoviesByActorId: builder.query({
            query: ({ id, page }) => `/discover/movie?with_cast=${id}&page=${page}&api_key=${tmdbapikey}`,
        }),

        // Get User Specific Lists
        getList: builder.query({
            query: ({ listName, accountId, sessionId, page }) => `/account/${accountId}/${listName}?api_key=${tmdbapikey}&session_id=${sessionId}&page=${page}`,
        }),
    }),
});

export const {
    useGetGenresQuery,
    useGetMoviesQuery,
    useGetMovieQuery,
    useGetRecommendationsQuery,
    useGetActorQuery,
    useGetMoviesByActorIdQuery,
    useGetListQuery,
} = tmdbApi;
