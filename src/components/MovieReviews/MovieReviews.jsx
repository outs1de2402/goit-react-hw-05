import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieReviews } from "../../services/tmdbAPI";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const data = await getMovieReviews(movieId);
        setReviews(data.results);
      } catch (error) {
        console.error(error);
      }
    }
    fetchReviews();
  }, [movieId]);

  return (
    <ul>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <li key={review.id}>
            <p>
              <b>{review.author}</b>: {review.content}
            </p>
          </li>
        ))
      ) : (
        <li>No reviews found.</li>
      )}
    </ul>
  );
};
export default MovieReviews;
