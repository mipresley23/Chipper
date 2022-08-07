import React, { useState, useEffect } from "react";
import { NavLink, Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../NavBar";
import { demoLogin } from "../../store/session";
import { thunkGetChirps, thunkAddChirp, thunkDeleteChirp, thunkEditChirp } from "../../store/chirp";
import SignupModal from "../auth/SignupModal";
import birdLogoWhite from '../assets/birdLogo-white.png';
import birdLogoBlue from '../assets/birdLogo.png';
import splashGraffiti from '../assets/graffiti-background-vertical.jpg';
import "./splash.css"

export default function Splash() {

  const dispatch = useDispatch()
  const history = useHistory();

  const [chirps, setChirps] = useState([])
  const [body, setBody] = useState('');
  const [media, setMedia] = useState('');
  const [news, setNews] = useState([]);
  const [showMore, setShowMore] = useState(false)

  const reverseChirps = []
  if(chirps){
    for(let i = chirps.length - 1; i >= 0; i --){
      const chirp = chirps[i];
      reverseChirps.push(chirp)
    }
  }

  const chirpSelector = useSelector(state => state.chirps)
  const sessionUser = useSelector(state => state.session.user)

  const options = {
    method: 'GET',
    headers: {
      'X-BingApis-SDK': 'true',
      'X-RapidAPI-Key': '063bad3f64msh1af9bb8147faf8dp1e0680jsn9d6abba6e550',
      'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
    }
  };

//   const getNews = async() => {
//     const response = await fetch('https://bing-news-search1.p.rapidapi.com/news/trendingtopics?textFormat=Raw&safeSearch=Off', options)
//       .then(response => response.json())
//       .then(response => setNews(response));
//   }

// useEffect(() => {
//   getNews()
// }, [])

const newsArray = news.value;
const firstFiveNews = newsArray && newsArray.slice(0, 5);




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
            <div id="sign-up-demo-container">
              <h2>Join Chipper Today!</h2>
              <SignupModal />
              <button id='demo-button' type='button' onClick={handleDemo}>Demo</button>
            </div>
            <div id="login-section">
              <h4>Already Have An Account?</h4>
              <button id="login-button" onClick={() => history.push('/login')}>
                  Login
              </button>
            </div>
          </div>
      </div>
    )
  } else {
    return (
      <div id="splash-main-content">
        <NavBar />
        <div id="splash-header-form-conatiner">
          <h3 id="splash-logged-in-header">Home</h3>
          <form id='add-chirp-form' onSubmit={addChirp}>
            <img id="add-chirp-profile-pic" src={sessionUser.profile_pic ? sessionUser.profile_pic : "https://as1.ftcdn.net/jpg/03/46/83/96/240_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"} alt=''/>
            <div id="chirp-input-button-contatiner">
              <textarea id="splash-chirp-input"
              type="text"
              placeholder="What's Chirpin'?"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              />
            </div>
              {body.length <= 290 ? <p id="chirp-counter">{body.length}/300</p> :
              body.length <= 300 ? <p id="chirp-counter-close-to-limit">{body.length}/300</p> :
              <p id="chirp-counter-over-limit">Chirp Must Be 300 Characters Or Less. {body.length}/300</p>}
              {body.length <= 300 & body.length > 0 ? <button id='add-chirp-button' type="submit">Chirp</button> :
              <button id="add-chirp-button-disabled" type="button">Chirp</button>}
          </form>
        </div>
        <div id="all-chirps-container">
          {
            reverseChirps && reverseChirps.map(chirp => (
              <div id="each-chirp-container">
                <NavLink to={`/chirps/${chirp.id}`}>
                  <div>
                    <div id="chirp-user-container">
                      <img id='chirp-user-image' src={chirp.user.profile_pic ? chirp.user.profile_pic : "https://as1.ftcdn.net/jpg/03/46/83/96/240_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"} alt={chirp.user.username}></img>
                      <p id="chirp-user">{chirp.user.username}</p>
                    </div>
                    <p id="chirp-body">{chirp.body}</p>
                  </div>
                  {sessionUser.id === chirp.user.id ? <button id='delete-chirp-button' type="button" value={chirp.id} onClick={handleDeleteChirp}>Delete</button> : null}
                </NavLink>
            </div>
            ))

          }
        </div>
        <div id="all-news-container">
          <h2>Trending Topics</h2>
        {
          !showMore && firstFiveNews && firstFiveNews.map(article => (
            <div id="each-news-container">
              <Link to={article.webSearchUrl.slice(article.webSearchUrl.indexOf('/'))} target="_blank" rel="noopener noreferrer">
                <div id="news-text">
                  <h4 id="news-headline">{article.name}</h4>
                  <div id="news-image-info">
                    <img id='news-image' src={article.image.url} alt={article.name}/>
                  </div>
                </div>
              </Link>
            </div>
          ))
        }
        {!showMore && <button className='news-buttons' type="button" onClick={() => setShowMore(true)}>Show More</button>}
        {
          showMore && newsArray && newsArray.map(article => (
            <div id="each-news-container">
              <Link to={article.webSearchUrl.slice(article.webSearchUrl.indexOf('/'))} target="_blank" rel="noopener noreferrer">
                <div id="news-text">
                  <h4 id="news-headline">{article.name}</h4>
                  <div id="news-image-info">
                    <img id='news-image' src={article.image.url} alt={article.name}/>
                  </div>
                </div>
              </Link>
            </div>
          ))
        }
        {showMore && <button className='news-buttons' type="button" onClick={() => setShowMore(false)}>Show Less</button>}
        </div>
    </div>
    )
  }
}
