import React from 'react';
import './App.css';
import Row from './Row';
import requests from './requests';
import Banner from './Banner';
import Nav from './Nav';



function App() {
  return (
    <div className="App">
      <Nav/>
      <Banner/>
     <Row title="Netflix Originals" 
       fetchUrl={requests.fetchTrending}
       isLargeRow = {true}
     />
     <Row title="Popular Movies" fetchUrl={requests.fetchPopular}/>
     <Row title="Adult Movies" fetchUrl={requests.fetchAdult}/>
     <Row title="Drama Movies" fetchUrl={requests.fetchDrama}/>
     <Row title="This Year Movies" fetchUrl={requests.fetchCurrentYear}/>
     <Row title="Recommended Movies" fetchUrl={requests.fetchActor}/>
     
    </div>
  );
}

export default App;
