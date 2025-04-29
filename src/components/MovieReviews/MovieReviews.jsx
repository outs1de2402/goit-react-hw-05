import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./MovieReviews.module.css";
import { useParams } from "react-router-dom";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${movieId}/reviews`, {
        headers: {
          Authorization: "Bearer api_read_access_token",
        },
      })
      .then((response) => setReviews(response.data.results))
      .catch((error) => console.error(error));
  }, [movieId]);

  return (
    <div className={styles.container}>
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
