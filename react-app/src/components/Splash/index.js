import React, { useState, useEffect } from "react";
import { NavLink, Link, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { thunkGetChirps, thunkAddChirp, thunkDeleteChirp, thunkEditChirp } from "../../store/chirp";
import "./splash.css"

export default function Splash() {

  const dispatch = useDispatch()

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

  const getNews = async() => {
    const response = await fetch('https://bing-news-search1.p.rapidapi.com/news/trendingtopics?textFormat=Raw&safeSearch=Off', options)
      .then(response => response.json())
      .then(response => setNews(response));
  }

useEffect(() => {
  getNews()
}, [])

console.log('news: ', news)


console.log('news value: ', news.value)

const newsArray = news.value
console.log('newsArray: ', newsArray)

const firstFiveNews = newsArray && newsArray.slice(0, 5)
console.log('firstFive: ', firstFiveNews)


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
  }



  const handleDeleteChirp = async (e) => {
    e.preventDefault();
    await dispatch(thunkDeleteChirp(e.target.value))
  }

  if (!chirps) return null;
  if (!sessionUser) {

    return (
      <div>
        <h1>Welcome to Chipper</h1>
      </div>
    )
  } else {
    return (
      <div id="splash-main-content">
        <form id='add-chirp-form' onSubmit={addChirp}>
          <div id="chirp-input-button-contatiner">
            <input id="splash-chirp-input"
            type="text"
            placeholder="What's Chirpin'?"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            />
            <button type="submit">Chirp</button>
          </div>
        </form>
        <div id="all-chirps-container">
          {
            reverseChirps && reverseChirps.map(chirp => (
              <div id="each-chirp-container">
                <NavLink to={`/chirps/${chirp.id}`}>
                  <div>
                    <div id="chirp-user-container">
                      <img id='chirp-user-image' src={chirp.user.profile_pic} alt={chirp.user.username}></img>
                      <p id="chirp-user">{chirp.user.username}</p>
                    </div>
                    <p id="chirp-body">{chirp.body}</p>
                  </div>
                  <button type="button" value={chirp.id} onClick={handleDeleteChirp}>Delete</button>
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
