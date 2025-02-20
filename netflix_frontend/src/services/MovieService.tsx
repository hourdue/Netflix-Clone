import axios from 'axios';
import { Movie } from '../types';
import { getAuthToken } from '../utils/auth';

const API_URL = 'http://127.0.0.1:8000/api/movies/';

const getAuthHeaders = () => {
    const token = getAuthToken();
    return {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };
  };

  export const getMovies = async () => {
    const response = await axios.get(API_URL, getAuthHeaders());
    return response.data;
  };

  export const createMovie = async (movie: Movie) => {
    const response = await axios.post(API_URL, movie, getAuthHeaders());
    return response.data;
  };
  
  export const getMovieById = async (id: number): Promise<Movie | null> => {
    const movies = await getMovies();
    return movies.find((movie: Movie) => movie.id === id) || null;
  };