const express = require("express");
const sqlite3 = require("sqlite3");
var app = express();
const cors = require("cors");
const Axios = require("axios");
const { response } = require("express");

// add to use the json in the front
app.use(express.json());
// add to connect the server with the client
app.use(cors());


// create db
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error("Error opening database " + err.message);
  } else {
    // creation of the table for sqlite3
    db.run('CREATE TABLE films( \
            id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,\
            title NVARCHAR(20)  NOT NULL,\
            episode_id INTEGER,\
            director NVARCHAR(150),\
            release_date TEXT\
        )', (err) => {
      if (err) {
        console.log("Table already exists.");
      }
    });
  }
});

// route to get which film to get the information
app.post("/film_number", (req, res) => {
  getData(req.body.filmNumber)
  .then(response => {
  db.run("INSERT INTO films (title, episode_id, director, release_date) VALUES (?,?,?,?)",
    [response.title, response.episode_id, response.director, response.release_date]
 )
  })
});

// method async to wait for the api response and send data for the db
async function getData(num) {
    const api_url = `https://swapi.dev/api/films/${num}/`
    const result = await Axios.get(api_url)
    .then(response => {return response.data});
    return result
};



// route all
app.get("/films", (req, res) => {
  db.all("SELECT * FROM films", [], (err, rows) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.status(200).json({ rows });
  });
});

// route show
app.get("/films/:id", (req, res) => {
  db.get("SELECT * FROM films where id = ?", [req.params.id], (err, row) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.status(200).json(row);
  });
});

// port
const HTTP_PORT = 8000
app.listen(HTTP_PORT, () => {
  console.log("Server is listening on port " + HTTP_PORT);
});
