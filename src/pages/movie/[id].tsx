import * as React from 'react';
import { useRouter } from 'next/router';
import MovieInfo from '../../components/MovieInfo/MovieInfo';

export default function MoviePage() {
    const router = useRouter();
    const { id } = router.query;

    return <MovieInfo />;
}
