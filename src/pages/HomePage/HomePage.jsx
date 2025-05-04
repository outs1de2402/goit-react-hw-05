import { useEffect, useState } from "react";

import MovieList from "../../components/MovieList/MovieList";
import { getTrendingMovies } from "../../services/tmdbApi";

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const data = await getTrendingMovies();
        setMovies(data.results);
      } catch (error) {
        console.error(error);
      }
    }
    fetchMovies();
  }, []);

  return (
    <div>
      <h1>Trending today</h1>
      <MovieList movies={movies} />
    </div>
  );
};
export default HomePage;
