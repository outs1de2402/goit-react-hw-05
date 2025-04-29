import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "beb892996aa24dbbf9b3abf36c9ff702";

const fetchMovies = async (query) => {
  try {
    const response = await axios.get(
      `${BASE_URL}search/movie?api_key=${API_KEY}&query=${query}&language=en-US&page=1&include_adult=false`
    );
    return response.data.results;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};

export default fetchMovies;
