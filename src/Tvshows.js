import React,{useEffect} from 'react'
import Row from './Row';
import requests from './requests';
import Banner from './Banner'

function Tvshows() {

  useEffect(() => {
    document.title = `Netflix | Watch Favourite TV`;
  },[],6000);

  return (
    <div>
      <Banner banner="fetchTvPopular"/>
      <Row title="Popular TV Shows" fetchUrl={requests.fetchTvPopular} props="tv"/>
      <Row title="Top TV Shows" fetchUrl={requests.fetchTvTop} props="tv"/>
      <Row title="TV on Air" fetchUrl={requests.fetchTvToday} props="tv"/>
      <Row title="TV on Air Today" fetchUrl={requests.fetchTvOnAir} props="tv"/>
    </div>
  )
}

export default Tvshows