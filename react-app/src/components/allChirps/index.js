import React, { useState, useEffect } from "react";
import { NavLink, Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../NavBar";
import AddChirp from "../addChirp";
import { thunkGetChirps, thunkAddChirp, thunkDeleteChirp, thunkEditChirp, thunkAddLike, thunkDeleteLike } from "../../store/chirp";
import { thunkGetComments } from "../../store/comment";
import EmptyLikeHeart from '../assets/chipper_like_empty.png'
import FilledLikeHeart from '../assets/chipper_like_filled.png'
import commentBubble from '../assets/comment-bubble.png';


import "../Splash/splash.css";


export default function AllChirps() {
  const dispatch = useDispatch()
  const history = useHistory();

  const [chirps, setChirps] = useState([])
  const [comments, setComments] = useState([])
  const [body, setBody] = useState('');
  const [media, setMedia] = useState('');
  const [mediaLoading, setMediaLoading] = useState(false);
  const [errors, setErrors] = useState([])


  const [liked, setLiked] = useState(false)


  const reverseChirps = []
  if(chirps){
    for(let i = chirps.length - 1; i >= 0; i --){
      const chirp = chirps[i];
      reverseChirps.push(chirp)
    }
  }


  const chirpSelector = useSelector(state => state.chirps)
  const sessionUser = useSelector(state => state.session.user)
  const commentSelector = useSelector(state => state.comments)


  useEffect(() => {
    dispatch(thunkGetChirps())
  }, [dispatch])

  useEffect(() => {
    setChirps(Object.values(chirpSelector))
  }, [chirpSelector])

  useEffect(() => {
    dispatch(thunkGetComments())
  }, [dispatch])

  useEffect(() => {
    setComments(Object.values(commentSelector))
  }, [commentSelector])





  const handleDeleteChirp = async (e) => {
    e.preventDefault();

      await dispatch(thunkDeleteLike(e.target.value))
      await dispatch(thunkDeleteChirp(e.target.value))
  }

  const handleLikeChirp = async(e) => {
    e.preventDefault();
    setLiked(true)
    await dispatch(thunkAddLike(e.target.value))
    // console.log('chirp like value: ', e.target.value)
  }

  const handleUnlikeChirp = async(e) => {
    e.preventDefault();
    setLiked(false)
    await dispatch(thunkDeleteLike(e.target.value))
  }


  if(!chirps) return null;
  if(!reverseChirps) return null;
  return (
    <div id="splash-main-content">
    <NavBar />
    <div id="splash-header-form-conatiner">
      <h3 id="splash-logged-in-header">Home</h3>
      {/* <AddChirp /> */}
    </div>
    <div id="all-chirps-container">
      {
        reverseChirps && reverseChirps.map(chirp => (
          <div id="each-chirp-container">
            <NavLink to={`/chirps/${chirp.id}`}>
              <div id="main-chirp-content">
                <div id="chirp-user-container">
                  <img id='chirp-user-image' src={chirp.user.profile_pic ? chirp.user.profile_pic : "https://as1.ftcdn.net/jpg/03/46/83/96/240_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"} alt={chirp.user.username}></img>
                  <NavLink to={`/users/${chirp.user.id}`} id="chirp-user">{chirp.user.username}</NavLink>
                </div>
                <p id="chirp-body">{chirp.body}</p>
                <img id="chirp-media" src={chirp.media} alt="" />
              </div>
              {sessionUser.id === chirp.user.id ? <button id='delete-chirp-button' type="button" value={chirp.id} onClick={handleDeleteChirp}>Delete</button> : null}
            </NavLink>
                <div className="like-button-containers">
                  {!chirp.likes.find(user => user.id === sessionUser.id) ? <input className='like-buttons' type="image" src={EmptyLikeHeart} value={chirp.id} onClick={handleLikeChirp}/> :
                    <input className='like-buttons' type="image" src={FilledLikeHeart} value={chirp.id} onClick={handleUnlikeChirp}/>}
                    <p>{chirp.likes.length}</p>
                </div>
                <div className="comment-count-container">
                  <img className="comment-count-image" src={commentBubble} alt='Comments:'/>
                  {comments && <p>{comments.filter(comment => comment.chirpId === chirp.id).length}</p>}
                </div>
          </div>
        ))

      }
    </div>

</div>
  )
}
