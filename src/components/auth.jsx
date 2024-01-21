import { auth, googleProvider } from '../config/firebase';
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { useState } from 'react';

export const Auth = () => {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    //console.log(auth?.currentUser?.photoUrl)

    const signIn = async () => {
        try{
            await createUserWithEmailAndPassword(auth, email, password);
        }  catch (err){
            console.error(err);
        }
    };

    const signInWithGoogle = async () => {
        try{
            await signInWithPopup(auth, googleProvider);
        }  catch (err){
            console.error(err);
        }
    };

    const logOut = async () => {
        try{
            await signOut(auth);
        }  catch (err){
            console.error(err);
        }
    };

    return (
        <div className='main'>
            <input 
                type='email'
                placeholder="Email..."
                onChange = {(e) => setEmail(e.target.value)}
            />

            <input 
                type='password'
                placeholder="Password..."
                onChange = {(e) => setPassword(e.target.value)}
            />

            <button onClick={signIn}> Sign In </button>

            <button onClick={signInWithGoogle}> Sign In With Google </button>

            <button onClick={logOut}> LogOut </button>
        </div>
    )
}