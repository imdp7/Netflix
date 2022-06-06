import React,{useEffect} from 'react'
import Row from './Row';
import requests from './requests';
import Banner from './Banner'

function Main() {

  useEffect(() => {
    document.title = `Netflix | Watch Favourite Movie`;
  },[],6000);

  return (
    <div>
      <Banner/>
        <Row title="Netflix Originals" 
       fetchUrl={requests.fetchNetflixOriginals}
       isLargeRow = {true}
       props="movie"
     />
      <Row title="Trending Now" fetchUrl={requests.fetchTrending} props="movie"/>
      <Row title="Top Rated" fetchUrl={requests.fetchTopRated} props="movie"/>
      <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} props="movie"/>
      <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} props="movie"/>
      <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} props="movie"/>
      <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} props="movie"/>
      <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} props="movie"/>
    </div>
  )
}

export default Main