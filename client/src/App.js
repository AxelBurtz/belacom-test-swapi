import './App.css';
import React from "react";
import { useState } from "react";
import Axios from "axios"

function App() {

  const [filmNumber, setFilmNumber] = useState(0);
  const [listFilm, setListFilm] = useState([]);

  const getFilmNumber = () => {
    Axios.post("http://localhost:8000/film_number/",
    {filmNumber: filmNumber},
    )
  }

  const getData = () => {
    Axios.get("http://localhost:8000/films")
    .then((response) => {
      setListFilm(response.data.rows);
    })
  }


  return (
    <div className="App">
      <h1>From which movie do you want information (1,2,3,4,5,6)</h1>
      <input type="integer"
      onChange={(event)  => {
        setFilmNumber(event.target.value);
      }}
      />
      <button onClick={(getFilmNumber)}>Send Data</button>
      <button onClick={(getData)}>See data</button>
      {listFilm.map((val, key) => {
        return <div>
          <p>Title: {val.title}</p>
          <p>Episode: {val.episode_id}</p>
          <p>Director: {val.director}</p>
          <p>Release date: {val.release_date}</p>
          </div>
      })}
    </div>
  );
}

export default App;
