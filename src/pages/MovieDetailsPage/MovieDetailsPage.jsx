import { useEffect, useState } from "react";
import { useParams, Link, Outlet } from "react-router-dom";
import axios from "axios";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${movieId}`, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZWI4OTI5OTZhYTI0ZGJiZjliM2FiZjM2YzlmZjcwMiIsIm5iZiI6MTc0NTY5MjY3MC4yNjEsInN1YiI6IjY4MGQyN2ZlZjc2OWYwYWY2YTgwZjAyZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8phHT-NYpX440NI5MyQx5lDBcX7KsA9tNYXCffrUp9w",
        },
      })
      .then((response) => setMovie(response.data))
      .catch((error) => console.error(error));
  }, [movieId]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div>
      <h1>{movie.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <p>{movie.overview}</p>

      <nav>
        <Link to="cast">Cast</Link> | <Link to="reviews">Reviews</Link>
      </nav>

      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
