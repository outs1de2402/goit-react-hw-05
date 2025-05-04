import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieCredits } from "../../services/tmdbAPI";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    async function fetchCast() {
      try {
        const data = await getMovieCredits(movieId);
        setCast(data.cast);
      } catch (error) {
        console.error(error);
      }
    }
    fetchCast();
  }, [movieId]);

  return (
    <ul>
      {cast.map((member) => (
        <li key={member.id}>
          <p>
            {member.name} as {member.character}
          </p>
        </li>
      ))}
    </ul>
  );
};

export default MovieCast;
