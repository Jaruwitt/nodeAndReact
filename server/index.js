const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require('body-parser');
const cors = require('cors');

const db = mysql.createPool({
    host: '0.0.0.0',
    user: 'root',
    password: 'password',
    database: 'CRUD'
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(express.json());

app.get("/api/get", (req,res) => {
    const sql = "select * from MOVIE";
    db.query(sql, (err, result) => {
        res.send(result);
    }); 
})

app.post("/api/insert", (req,res) => {

    const movieName = req.body.movieName;
    const movieReview = req.body.movieReview;

    const sql = "insert into MOVIE(NAME,REVIEW) values (?,?)";
    db.query(sql, [movieName, movieReview], (err, result) => {
        res.send("Insert Success");
    });
    
})

app.listen(3001, () => {
    console.log("running on port 3001");
});