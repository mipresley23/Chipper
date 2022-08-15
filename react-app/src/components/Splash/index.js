import React, { useState, useEffect } from "react";
import { NavLink, Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../NavBar";
import { demoLogin } from "../../store/session";
import { thunkGetChirps, thunkAddChirp, thunkDeleteChirp } from "../../store/chirp";
import SignupModal from "../auth/SignupModal";
import LoginModal from "../auth/LoginModal";
import birdLogoWhite from '../assets/birdLogo-white.png';
import birdLogoBlue from '../assets/birdLogo.png';
import splashGraffiti from '../assets/graffiti-background-vertical.jpg';
import "./splash.css"
import AllChirps from "../allChirps";

export default function Splash() {

  const dispatch = useDispatch()
  const history = useHistory();

  const [chirps, setChirps] = useState([])
  const [body, setBody] = useState('');
  const [media, setMedia] = useState('');



  const reverseChirps = []
  if(chirps){
    for(let i = chirps.length - 1; i >= 0; i --){
      const chirp = chirps[i];
      reverseChirps.push(chirp)
    }
  }

  const chirpSelector = useSelector(state => state.chirps)
  const sessionUser = useSelector(state => state.session.user)


  useEffect(() => {
    dispatch(thunkGetChirps())
  }, [dispatch])

  useEffect(() => {
    setChirps(Object.values(chirpSelector))
  }, [chirpSelector])

  const addChirp = async (e) => {
    e.preventDefault();
    const chirp = {
      body,
      media,
      userId: sessionUser.id
    }
    await dispatch(thunkAddChirp(chirp))
    await setBody('')
  }

  const handleDemo = () => {
    dispatch(demoLogin())
  }





  const handleDeleteChirp = async (e) => {
    e.preventDefault();
      await dispatch(thunkDeleteChirp(e.target.value))
  }

  if (!chirps) return null;
  if (!sessionUser) {

    return (
      <div>
        <img id='splash-graffiti-logo' src={splashGraffiti} alt=''/>
        <img id='white-bird-logo' src={birdLogoWhite} alt=''/>
        <div id="user-auth-side">
            <div>
              <img id='user-auth-home-logo' src={birdLogoBlue} alt=''/>
            </div>
            <div id="user-auth-section-headers">
              <h1 id="chipper-main-logo">Welcome to Chipper</h1>
            </div>
            <div id="whats-chirpin-container">
              <p id="what-chirpin">What's Chirpin'?</p>
              <p id="tell-the-world">Tell The World!</p>
            </div>
            <div id="sign-up-demo-container">
              <h2>Join Chipper Today!</h2>
              <SignupModal />
              <p id="signup-demo-sep">----------or----------</p>
              <button id='demo-button' type='button' onClick={handleDemo}>Demo</button>
            </div>
            <div id="login-section">
              <h4 id="splash-login-header">Already Have An Account?</h4>
              <LoginModal />
            </div>
          </div>
      </div>
    )
  } else {
    return (
      <AllChirps />
    )
  }
}
