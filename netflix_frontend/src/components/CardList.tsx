import Card from "./Card";
import { getMovies } from "../services/MovieService";
import { useEffect, useRef, useState } from "react";
import { Movie } from "../types";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  nTitle: string;
}

const CardList = ({ nTitle }: Props) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      const data = await getMovies();
      setMovies(data);
    };
    fetchMovies();
  }, []);

  const repeatedMovies =
    movies.length > 0
      ? Array(21)
          .fill(null)
          .map((_, index) => movies[index % movies.length])
      : [];

  const handleScroll = (direction: "left" | "right") => {
    const container = containerRef.current;
    if (!container) return;

    const scrollAmount = 1120;
    const newScrollPosition =
      direction === "left"
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: newScrollPosition,
      behavior: "smooth",
    });
  };

  return (
    <div className="mt-10 ml-10 relative">
      <h1 className="font-bold text-lg text-white mb-2">{nTitle}</h1>
      <div
        className="relative"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <button
          onClick={() => handleScroll("left")}
          className={`absolute left-0 top-1/2 -translate-y-1/2 z-40 bg-black/50 p-2 rounded-full 
            transition-opacity duration-300 hover:bg-black/80
            ${isHovering ? "opacity-100" : "opacity-0"}`}
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <div ref={containerRef} className={`flex gap-1 no-scrollbar`}>
          {repeatedMovies.map((movie, index) => (
            <Card key={index} movie={movie} />
          ))}
        </div>
        <button
          onClick={() => handleScroll("right")}
          className={`absolute right-0 top-1/2 -translate-y-1/2 z-40 bg-black/50 p-2 rounded-full 
            transition-opacity duration-300 hover:bg-black/80
            ${isHovering ? "opacity-100" : "opacity-0"}`}
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  );
};

export default CardList;
