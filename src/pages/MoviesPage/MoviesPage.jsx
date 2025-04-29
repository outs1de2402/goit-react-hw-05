// src/pages/MoviesPage.jsx

import { useState } from "react";
import axios from "axios";

const MoviesPage = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${query}`,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZWI4OTI5OTZhYTI0ZGJiZjliM2FiZjM2YzlmZjcwMiIsIm5iZiI6MTc0NTY5MjY3MC4yNjEsInN1YiI6IjY4MGQyN2ZlZjc2OWYwYWY2YTgwZjAyZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8phHT-NYpX440NI5MyQx5lDBcX7KsA9tNYXCffrUp9w`,
          },
        }
      );
      setMovies(response.data.results);
    } catch (error) {
      console.error("Error searching movies:", error);
    }
  };

  return (
    <div>
      <h2>Search Movies</h2>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter movie name"
      />
      <button onClick={handleSearch}>Search</button>

      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <h3>{movie.title}</h3>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MoviesPage;
