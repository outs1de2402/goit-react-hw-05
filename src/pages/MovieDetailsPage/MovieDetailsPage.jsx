import { useEffect, useState, useRef, lazy, Suspense } from "react";
import {
  Link,
  Outlet,
  useParams,
  useLocation,
  Route,
  Routes,
} from "react-router-dom";
import { getMovieDetails } from "../../services/tmdbAPI";

const MovieCast = lazy(() => import("../../components/MovieCast/MovieCast"));
const MovieReviews = lazy(() =>
  import("../../components/MovieReviews/MovieReviews")
);

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const backLink = useRef(location.state?.from || "/");
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function fetchDetails() {
      try {
        const data = await getMovieDetails(movieId);
        setMovie(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchDetails();
  }, [movieId]);

  if (!movie) return <div>Loading movie details...</div>;

  return (
    <div>
      <Link to={backLink.current}>⬅ Back</Link>
      <h1>{movie.title}</h1>
      <p>User score: {movie.vote_average}</p>
      <p>Overview: {movie.overview}</p>
      <p>Genres: {movie.genres.map((g) => g.name).join(", ")}</p>

      <h3>Additional information</h3>
      <ul>
        <li>
          <Link to="cast">Cast</Link>
        </li>
        <li>
          <Link to="reviews">Reviews</Link>
        </li>
      </ul>

      <Suspense fallback={<div>Loading additional info...</div>}>
        <Routes>
          <Route path="cast" element={<MovieCast />} />
          <Route path="reviews" element={<MovieReviews />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default MovieDetailsPage;
