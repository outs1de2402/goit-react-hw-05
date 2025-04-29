import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${movieId}/reviews`, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZWI4OTI5OTZhYTI0ZGJiZjliM2FiZjM2YzlmZjcwMiIsIm5iZiI6MTc0NTY5MjY3MC4yNjEsInN1YiI6IjY4MGQyN2ZlZjc2OWYwYWY2YTgwZjAyZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8phHT-NYpX440NI5MyQx5lDBcX7KsA9tNYXCffrUp9w",
        },
      })
      .then((response) => setReviews(response.data.results))
      .catch((error) => console.error(error));
  }, [movieId]);

  return (
    <div>
      <h2>Reviews</h2>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            <p>{review.content}</p>
            <p>- {review.author}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieReviews;
