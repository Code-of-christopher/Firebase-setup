/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { Auth } from "./components/auth";
import { db, auth, storage } from './config/firebase';
import { getDocs, 
  collection, 
  addDoc, 
  deleteDoc, 
  doc, 
  updateDoc } from 'firebase/firestore';
import { ref, uploadBytes } from "firebase/storage";

export default function App(){
  const [movieList, setMovieList] = useState([]);

  //New Movie State
  const [newMovieTitle, setNewMovieTitle] = useState('');
  const [newReleaseDate, setNewReleaseDate] = useState(0);
  const [isNewMovieAward, setIsNewMovieAward] = useState(false);

  //Update Movie Title State
  const [ updatedTitle, setUpdatedTitle ] = useState('');

  //file upload state
  const [ fileUpload, setFileUpload] = useState(null);

  const moviesCollectionRef = collection(db, 'movies');

  const onSubmitMovie = async() => {
    try{
      await addDoc(moviesCollectionRef, {
        title: newMovieTitle, 
        releaseDate: newReleaseDate,
        awardReceived: isNewMovieAward,
        userId: auth?.currentUser?.uid
      });
    } catch (err){
      console.error(err);
    }
  };

  const deleteMovie = async(id) => {
    const movieDoc = doc(db, 'movies', id);
    await deleteDoc(movieDoc);
  }

  const updateMovieTitle = async(id) => {
    const movieDoc = doc(db, 'movies', id);
    await updateDoc(movieDoc, { title: updatedTitle });
  }

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


  useEffect(() => {
    
    getMovieList();
  }, [onSubmitMovie]);

  const uploadFile = async() => {
    if (!fileUpload) return;
    const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);
    try {
      await uploadBytes(filesFolderRef, fileUpload);
    } catch (err) {
      console.error(err);
    }
  }
  
  return (
    <div className="app">
      <Auth />

      <div className="main">
        <input 
          placeholder="Movie title..." 
          onChange={(e) => setNewMovieTitle(e.target.value)}
        />
        <input 
          placeholder="Release Date..." 
          type="number" 
          onChange={(e) => setNewReleaseDate(Number(e.target.value))}
        />
        <input 
          type="checkbox" 
          checked={isNewMovieAward}
          onChange={(e) => setIsNewMovieAward(e.target.checked)}
        />
        <label> Received an Award </label>
        <button onClick={onSubmitMovie}> Submit Movie </button>
      </div>

      <div className="main">
        {movieList.map((movie) => (
          <div key={movie.id}>
            <h1 style={{color: movie.awardReceived ? 'green' : 'red'}}> {movie.title} </h1>
            
            <p>Date: {movie.releaseDate} </p>

            <button onClick={() => deleteMovie(movie.id)}> Delete Movie </button>

            <input 
              placeholder="New Title..."
              onChange={(e) => setUpdatedTitle(e.target.value)}
            />
            <button onClick={() => updateMovieTitle(movie.id)}> Update Title </button>
          </div>
        ))}
      </div>

      <div className="main">
          <input 
            type="file" 
            onChange={(e) => setFileUpload(e.target.files[0])}
          />
          <button onClick={uploadFile}> Upload File </button>
      </div>
    </div>
  )
}