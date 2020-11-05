const API_KEY = "99b96f6f6db95c35d56bae850645b829";
 const  requests =  {
    fetchTrending: `/trending/all/day?api_key=${API_KEY}&language=en-US`,
    fetchPopular:`/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=true&page=1`,
    fetchAdult:`/discover/movie?api_key=${API_KEY}&certification_country=US&certification=R`,
    fetchDrama: `/discover/movie?api_key=${API_KEY}&with_genres=18`,
    fetchCurrentYear: `/discover/movie?api_key=${API_KEY}&with_genres=18&primary_release_year=2014`,
    fetchActor: `/discover/movie?api_key=${API_KEY}&with_genres=878`,
}

export default requests;
