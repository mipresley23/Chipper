import React, { useState, useEffect} from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";



export default function TrendingTopics() {

  const [news, setNews] = useState([]);
  const [showMore, setShowMore] = useState(false)

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
        // .catch(err => console.log(err));
    }


    useEffect(() => {
      getNews()
    }, [])


  const newsArray = news.value;

  const firstFiveNews = newsArray && newsArray.slice(0, 5);

  if(!sessionUser) return null
    return(
      <div id="all-news-container">
    <h2>Trending Topics</h2>
  {
    !showMore && firstFiveNews && firstFiveNews.map(article => (
        <Link className="news-links" to={article.webSearchUrl.slice(article.webSearchUrl.indexOf('/'))} target="_blank" rel="noopener noreferrer">
      <div id="each-news-container">
          <div id="news-text">
            <h4 id="news-headline">{article.name}</h4>
            <div id="news-image-info">
            <p id="news-sub-header">{article.query.text}</p>
              <img id='news-image' src={article.image.url} alt={article.name}/>
            </div>
          </div>
      </div>
        </Link>
    ))
  }
  {!showMore && <button className='news-buttons' type="button" onClick={() => setShowMore(true)}>Show More</button>}
  {
    showMore && newsArray && newsArray.map(article => (
      <Link className="news-links" to={article.webSearchUrl.slice(article.webSearchUrl.indexOf('/'))} target="_blank" rel="noopener noreferrer">
    <div id="each-news-container">
        <div id="news-text">
          <h4 id="news-headline">{article.name}</h4>
          <div id="news-image-info">
          <p id="news-sub-header">{article.query.text}</p>
            <img id='news-image' src={article.image.url} alt={article.name}/>
          </div>
        </div>
    </div>
      </Link>
  ))
  }
  {showMore && <button className='news-buttons' type="button" onClick={() => setShowMore(false)}>Show Less</button>}
  </div>
  )
}
