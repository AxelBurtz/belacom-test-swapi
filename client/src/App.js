import './App.css';
import React from "react";
import { useState } from "react";
import Axios from "axios"

function App() {

  const [filmNumber, setFilmNumber] = useState(0);
  const [listFilm, setListFilm] = useState([]);

  // method to send film number to server
  const getFilmNumber = () => {
    Axios.post("http://localhost:8000/film_number/",
    {filmNumber: filmNumber},
    )
  }

  // method to get the data from the server
  const getData = () => {
    Axios.get("http://localhost:8000/films")
    .then((response) => {
      setListFilm(response.data.rows);
    })
  }


  return (
    <div className="App">
      <div className='interface'>
        <h1>From which movie do you want informations (1,2,3,4,5 or 6)</h1>
        <input type="integer"
        onChange={(event)  => {
          setFilmNumber(event.target.value);
        }}
        />
        <div className='app_button'>
          <button onClick={(getFilmNumber)}>Send Data</button>
          <button onClick={(getData)}>See data</button>
        </div>
        {listFilm.map((val, key) => {
          return <div className='films'>
            <h3>Title: {val.title}</h3>
            <h3>Episode: {val.episode_id}</h3>
            <p>Director: {val.director}</p>
            <p>Release date: {val.release_date}</p>
          </div>
        })}
      </div>
    </div>
  );
}

export default App;
