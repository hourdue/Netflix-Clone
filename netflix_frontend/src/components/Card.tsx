import { Link } from "react-router-dom";
import { Play, Plus, ThumbsUp } from "lucide-react";
import { Movie } from "../types";

interface Props {
  movie: Movie;
}

const Card = ({ movie }: Props) => {
  return (
    <div className="flex-shrink-0 relative group">
      <Link to={`/video/${movie.id}`} className="block relative">
        <img
          className="w-[224px] h-[124px] object-cover rounded-md transition-all duration-200"
          src={movie.thumbnail}
          alt={movie.title}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="absolute bottom-0 left-0 right-0 p-3">
            <h3 className="text-white font-bold mb-2 text-sm">{movie.title}</h3>

            <div className="flex items-center space-x-2 mb-2">
              <button className="bg-white rounded-full p-1.5 hover:bg-white/90 transition-colors">
                <Play className="w-4 h-4 text-black" />
              </button>
              <button className="border border-white/40 rounded-full p-1.5 hover:border-white transition-colors">
                <Plus className="w-4 h-4 text-white" />
              </button>
              <button className="border border-white/40 rounded-full p-1.5 hover:border-white transition-colors">
                <ThumbsUp className="w-4 h-4 text-white" />
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs text-white">
              <span className="text-green-500 font-bold">{movie.rating}</span>
              <span>{movie.year}</span>
              <span className="px-2 py-0.5 border border-white/40 rounded text-xs">
                {movie.genre}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
