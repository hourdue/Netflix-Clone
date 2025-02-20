import { useParams } from "react-router-dom";
import VideoPlayer from "../components/VideoPlayer";
import { useEffect, useState } from "react";
import { getMovieById } from "../services/MovieService";
import { Movie } from "../types";

const VideoP = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      setIsLoading(true);
      if (id) {
        const movieData = await getMovieById(parseInt(id));
        setMovie(movieData);
      }
      setIsLoading(false);
    };

    fetchMovie();
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!movie?.video_url) {
    return <div>No video URL available</div>;
  }

  return (
    <div>
      <VideoPlayer src={movie.video_url} />
    </div>
  );
};

export default VideoP;
