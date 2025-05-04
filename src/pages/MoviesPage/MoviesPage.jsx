import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { searchMovies } from "../../services/tmdbAPI";
import MovieList from "../../components/MovieList/MovieList";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  useEffect(() => {
    if (!query) return;
    async function fetchSearch() {
      try {
        const data = await searchMovies(query);
        setMovies(data.results);
      } catch (error) {
        console.error(error);
      }
    }
    fetchSearch();
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = e.target.elements.query.value.trim();
    setSearchParams({ query: value });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input name="query" type="text" defaultValue={query} />
        <button type="submit">Search</button>
      </form>
      <MovieList movies={movies} />
    </div>
  );
};
export default MoviesPage;
