// src/pages/HomePage.jsx

import { useEffect, useState } from "react";
import axios from "axios";

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/trending/movie/day",
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZWI4OTI5OTZhYTI0ZGJiZjliM2FiZjM2YzlmZjcwMiIsIm5iZiI6MTc0NTY5MjY3MC4yNjEsInN1YiI6IjY4MGQyN2ZlZjc2OWYwYWY2YTgwZjAyZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8phHT-NYpX440NI5MyQx5lDBcX7KsA9tNYXCffrUp9w`,
            },
          }
        );
        setMovies(response.data.results); // Збереження фільмів у стан
      } catch (error) {
        console.error("Error fetching trending movies:", error);
      }
    };

    fetchTrendingMovies();
  }, []);

  return (
    <div>
      <h2>Trending Movies</h2>
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

export default HomePage;
