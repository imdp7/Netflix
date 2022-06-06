export const API_KEY = "99b96f6f6db95c35d56bae850645b829";
const requests = {
    fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
    fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
    fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
    fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
    fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
    fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
    fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
    fetchTvPopular : `/tv/popular?api_key=${API_KEY}&language=en-US&page=1`,
    fetchTvToday: `tv/airing_today?api_key=${API_KEY}&language=en-US&page=1`,
    fetchTvTop: `tv/top_rated?api_key=${API_KEY}&language=en-US&page=1`,
    fetchTvOnAir: `tv/on_the_air?api_key=${API_KEY}&language=en-US&page=1`,

}

export default requests;
