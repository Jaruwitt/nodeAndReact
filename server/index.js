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

app.get("/api/movies", (req,res) => {
    const sql = "select * from MOVIE";
    db.query(sql, (err, result) => {
        res.send(result);
    }); 
})

app.post("/api/movies", (req,res) => {

    const movieName = req.body.name;
    const movieReview = req.body.review;
    const sql = "insert into MOVIE(NAME,REVIEW) values (?,?)";
    db.query(sql, [movieName, movieReview], (err, result) => {
        res.send("Insert Success");
    });
})

app.put("/api/movies/:id", (req,res) => {

    const id = req.params.id;
    const movieReview = req.body.review;
    const sql = "update MOVIE set REVIEW = ? where ID = ?";
    db.query(sql, [movieReview, id], (err, result) => {
        if (err) {
            console.error(err);
        } else 
            res.send(result);
    });
})

app.delete("/api/movies/:id", (req,res) => {
    const id = req.params.id;
    const sql = "delete from MOVIE where ID = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error(err);
        } else 
            res.send("Delete Success");
    });
})

app.listen(3001, () => {
    console.log("running on port 3001");
});