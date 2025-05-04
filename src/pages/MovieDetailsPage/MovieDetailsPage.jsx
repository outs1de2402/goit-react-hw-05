// src/pages/MovieDetailsPage/MovieDetailsPage.jsx

import { useEffect, useRef, useState, Suspense } from "react";
import { Link, useParams, useLocation, Outlet } from "react-router-dom";
import { getMovieDetails } from "../../services/tmdbAPI";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from || "/");

  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMovie() {
      try {
        const data = await getMovieDetails(movieId);
        setMovie(data);
      } catch {
        setError("Failed to load movie details");
      }
    }

    fetchMovie();
  }, [movieId]);

  if (error) return <p>{error}</p>;
  if (!movie) return <p>Loading...</p>;

  const { title, poster_path, overview, genres, vote_average } = movie;

  return (
    <div>
      <Link to={backLinkRef.current}>← Go back</Link>

      <div>
        <img
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w300/${poster_path}`
              : "https://via.placeholder.com/300x450?text=No+Image"
          }
          alt={title}
        />
        <div>
          <h2>{title}</h2>
          <p>User score: {Math.round(vote_average * 10)}%</p>
          <h3>Overview</h3>
          <p>{overview}</p>
          <h3>Genres</h3>
          <p>{genres.map((genre) => genre.name).join(", ")}</p>
        </div>
      </div>

      <hr />

      <div>
        <p>Additional information</p>
        <ul>
          <li>
            <Link to="cast" state={{ from: backLinkRef.current }}>
              Cast
            </Link>
          </li>
          <li>
            <Link to="reviews" state={{ from: backLinkRef.current }}>
              Reviews
            </Link>
          </li>
        </ul>
      </div>

      <hr />

      <Suspense fallback={<p>Loading subpage...</p>}>
        <Outlet />
      </Suspense>
    </div>
  );
}
