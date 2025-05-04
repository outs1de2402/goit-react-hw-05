import axios from "axios";

const API_KEY = "beb892996aa24dbbf9b3abf36c9ff702";
const BASE_URL = "https://api.themoviedb.org/3";

export async function getTrendingMovies() {
  const { data } = await axios.get(`${BASE_URL}/trending/movie/day`, {
    params: { api_key: API_KEY },
  });
  return data;
}

export async function searchMovies(query) {
  const { data } = await axios.get(`${BASE_URL}/search/movie`, {
    params: { api_key: API_KEY, query },
  });
  return data;
}

export async function getMovieDetails(id) {
  const { data } = await axios.get(`${BASE_URL}/movie/${id}`, {
    params: { api_key: API_KEY },
  });
  return data;
}

export async function getMovieCredits(id) {
  const { data } = await axios.get(`${BASE_URL}/movie/${id}/credits`, {
    params: { api_key: API_KEY },
  });
  return data;
}

export async function getMovieReviews(id) {
  const { data } = await axios.get(`${BASE_URL}/movie/${id}/reviews`, {
    params: { api_key: API_KEY },
  });
  return data;
}
