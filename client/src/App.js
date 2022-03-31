import './App.css';
import React, { useState, useEffect } from 'react';
import Axios from 'axios';

function App() {

  const [movieName, setMovieName] = useState('');
  const [movieReview, setReview] = useState('');
  const [movieReviewList, setMovieReviewList] = useState([]);
  const [newReview, setNewReview] = useState('');

  useEffect(() => {
    Axios.get('http://localhost:3001/api/movies').then((res) => {
      setMovieReviewList(res.data);
    });
  }, []);

  const create = () => {
    Axios.post('http://localhost:3001/api/movies', {
      name: movieName,
      review: movieReview
    });

    setMovieReviewList([...movieReviewList, {
      NAME: movieName,
      REVIEW: movieReview
    },]);

  };

  const update = (movieId) => {
    Axios.put(`http://localhost:3001/api/movies/${movieId}`, {
      review: newReview
    });
    setNewReview('');
  };

  const deleteReview = (movieId) => {
    Axios.delete(`http://localhost:3001/api/movies/${movieId}`);
  };

  return (
    <div className="App">
      
      <h1>CRUD APPLICATION</h1>
      <div className="form">
        <label>Movie Name:</label>
        <input type="text" name="movieName" onChange={(e) => {
          setMovieName(e.target.value)
        }} />
        <label>Review:</label>
        <input type="text" name="movieReview" onChange={(e) => {
          setReview(e.target.value)
        }}/>
        
        <button onClick={create}>Submit</button>

        {movieReviewList.map((val) => {
          return (
            <div className="card">
              <h1>{val.NAME}</h1>
              <p>{val.REVIEW}</p>

              <button onClick={() => deleteReview(val.ID)}>Delete</button>
              <input type="text" id="updateButton" onChange={(e) => {
                setNewReview(e.target.value)
              }}/>
              <button onClick={() => update(val.ID)}>Update</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
