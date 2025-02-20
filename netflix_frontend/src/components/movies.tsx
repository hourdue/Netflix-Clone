import React, { useEffect, useState } from 'react';
import { getMovies } from '../services/MovieService';
import { Movie } from '../types';

const Movies = () => {
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        const fetchMovies = async () => {
            const data = await getMovies();
            setMovies(data);
        };
        fetchMovies();
    }, []);

    return (movies);
};

export default Movies;
