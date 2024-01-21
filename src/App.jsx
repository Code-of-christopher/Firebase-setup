import { useState, useEffect } from "react";
import { Auth } from "./components/auth";
import { db } from './config/firebase';
import { getDocs, collection } from 'firebase/firestore';

export default function App(){
  const [movieList, setMovieList] = useState([]);

  const moviesCollectionRef = collection(db, 'movies');

  useEffect(() => {
    const getMovieList = async() => {

      try{
        const data = await getDocs(moviesCollectionRef);
        const filteredData = data.docs.map((doc)=> ({
          ...doc.data(), 
          id: doc.id
        }))
        //console.log(filteredData);
        setMovieList(filteredData);
      } catch(err){
        console.error(err);
      }
    };
    getMovieList();
  }, []);
  
  return (
    <div className="app">
      <Auth />

      <div>
        {movieList.map((movie) => (
          <div key={movie.id}>
            <h1 style={{color: movie.awardReceived ? 'green' : 'red'}}> {movie.title} </h1>
            <p>Date: {movie.releaseDate} </p>
          </div>
        ))}
      </div>
    </div>
  )
}