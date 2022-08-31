import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, NavLink } from "react-router-dom";
import NavBar from "../NavBar";
import { thunkGetChirps, thunkDeleteChirp, thunkAddLike, thunkDeleteLike } from "../../store/chirp";
import { thunkGetComments } from "../../store/comment";
import { thunkGetUsers } from "../../store/users";
import EditChirpModal from "../editChirp/editChirpModal";
import blueHeader from '../assets/blue-gradient-header.jpg';
import EmptyLikeHeart from '../assets/chipper_like_empty.png'
import FilledLikeHeart from '../assets/chipper_like_filled.png'
import commentBubble from '../assets/comment-bubble.png';
import './userProfile.css';

export default function UserProfile() {

  const dispatch = useDispatch();
  const history = useHistory();

  const {userId} = useParams();

  const [chirps, setChirps] = useState([])
  const [comments, setComments] = useState([])
  const [users, setUsers] = useState([])
  const [liked, setLiked] = useState(false)
  const [showLiked, setShowLiked] = useState(false);

  const usersSelector = useSelector(state => state.users)
  const sessionUser = useSelector(state => state.session.user)
  const chirpSelector = useSelector(state => state.chirps)
  const commentSelector = useSelector(state => state.comments)

  const thisUser = users && users.find(user => user.id === +userId)
  console.log('thisUser: ', thisUser)

  const usersChirps = chirps && chirps.filter(chirp => chirp.user.id === +userId)

  const reverseUsersChirps = []
  for(let i = usersChirps.length - 1; i >= 0; i--){
    reverseUsersChirps.push(usersChirps[i])
  }

  const chirpsWithLikes = chirps && chirps.filter(chirp => chirp.likes.length)

  const thisUsersLikes = thisUser && (function findUsersLikes() {
    const usersLikes = []
    for(let i = 0; i < chirpsWithLikes.length; i++){
      let chirp = chirpsWithLikes[i];
      let userschirp =  chirp.likes.find(user => user.id === thisUser.id)
      if(userschirp) usersLikes.push(chirp)
    }
    return usersLikes
  })()



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

  useEffect(() => {
    dispatch(thunkGetUsers())
  }, [dispatch])

  useEffect(() => {
    setUsers(Object.values(usersSelector))
  }, [usersSelector])

  const handleDeleteChirp = async (e) => {
    e.preventDefault();
      await dispatch(thunkDeleteLike(e.target.value))
      await dispatch(thunkDeleteChirp(e.target.value))
  }

  const handleGoBackToSplash = (e) => {
    e.preventDefault();
    history.push('/')
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

  if(!thisUser) return null;
  return(
    <>
      <NavBar params={userId}/>
      <div id="profile-page-main-content">
        <div id="profile-header-content">
          <div id="header-chirps-container">
            <h3>{thisUser.name}</h3>
            {!showLiked ? <p id="profile-chirp-count">{usersChirps.length} chirps</p> : <p id="profile-chirp-count">{thisUsersLikes.length} likes</p>}
          </div>
          <button id='profile-go-back-button' type="button" onClick={handleGoBackToSplash}>
            <img id="profile-go-back-button-image" src={require('../assets/back-arrow.png')} alt='Back'/>
          </button>
        </div>
        <div id="profile-images-container">
          <img id='profile-header-image' src={blueHeader} alt=''/>
          <img id="user-profile-picture" src={thisUser.profile_pic ? thisUser.profile_pic : 'https://as1.ftcdn.net/jpg/03/46/83/96/240_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg'} />
          <div id="user-profile-names">
            <h3 id="user-profile-name">{thisUser.name}</h3>
            <p id='user-profile-username'>{thisUser.username}</p>
          </div>
        </div>
        <div id="users-chirps-container">
          <div id="profile-tabs-container">
            {showLiked ? <button className='profile-tabs' type="button" onClick={() => setShowLiked(false)}>Chirps</button> : <button className='profile-tabs-disabled' type="button">Chirps</button>}
            {!showLiked ? <button className='profile-tabs' type="button" onClick={() => setShowLiked(true)}>Likes</button> : <button className='profile-tabs-disabled' type="button">Likes</button>}
          </div>
          {
            !showLiked && reverseUsersChirps && reverseUsersChirps.map(chirp => (
              <div id="each-chirp-container">
                <NavLink to={`/chirps/${chirp.id}`}>
                  <div id="main-chirp-content">
                    <div id="chirp-user-container">
                      <img id='chirp-user-image' src={chirp.user.profile_pic ? chirp.user.profile_pic : "https://as1.ftcdn.net/jpg/03/46/83/96/240_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"} alt={chirp.user.username}></img>
                      <p id="chirp-user">{chirp.user.username}</p>
                    </div>
                    <p id="chirp-body">{chirp.body}</p>
                    <img id="chirp-media" src={chirp.media} alt="" />
                  </div>
                  {sessionUser.id === chirp.user.id ? <button id='delete-chirp-button' type="button" value={chirp.id} onClick={handleDeleteChirp}>Delete</button> : null}
                </NavLink>
                {sessionUser.id === chirp.user.id ? <div id="profile-edit-chirp-container">
                  <EditChirpModal chirp={chirp} />
                  </div> : null}
                    <div className="like-button-containers">
                    {!chirp.likes.find(user => user.id === sessionUser.id) ? <div className="like-buttons-divs"><input className='like-buttons' type="image" src={EmptyLikeHeart} value={chirp.id} onClick={handleLikeChirp}/></div> :
                    <div className="like-buttons-divs"><input className='like-buttons' type="image" src={FilledLikeHeart} value={chirp.id} onClick={handleUnlikeChirp}/></div>}
                    {!chirp.likes.find(user => user.id === sessionUser.id) ? <p id="like-count-not-liked">{chirp.likes.length}</p> :
                    <p id="like-count-liked">{chirp.likes.length}</p>}
                </div>
                <div className="comment-count-container">
                  <img className="comment-count-image" src={commentBubble} alt='Comments:'/>
                  {comments && <p>{comments.filter(comment => comment.chirpId === chirp.id).length}</p>}
                </div>
            </div>
            ))
          }
          {
            showLiked && thisUsersLikes && thisUsersLikes.map(chirp => (
              <div id="each-chirp-container">
                <NavLink to={`/chirps/${chirp.id}`}>
                  <div id="main-chirp-content">
                    <div id="chirp-user-container">
                      <img id='chirp-user-image' src={chirp.user.profile_pic ? chirp.user.profile_pic : "https://as1.ftcdn.net/jpg/03/46/83/96/240_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"} alt={chirp.user.username}></img>
                      <p id="chirp-user">{chirp.user.username}</p>
                    </div>
                    <p id="chirp-body">{chirp.body}</p>
                    <img id="chirp-media" src={chirp.media} alt="" />
                  </div>
                  {sessionUser.id === chirp.user.id ? <button id='delete-chirp-button' type="button" value={chirp.id} onClick={handleDeleteChirp}>Delete</button> : null}
                </NavLink>
                {sessionUser.id === chirp.user.id ? <div id="profile-edit-chirp-container">
                  <EditChirpModal chirp={chirp} />
                  </div> : null}
                    <div className="like-button-containers">
                    {!chirp.likes.find(user => user.id === sessionUser.id) ? <div className="like-buttons-divs"><input className='like-buttons' type="image" src={EmptyLikeHeart} value={chirp.id} onClick={handleLikeChirp}/></div> :
                    <div className="like-buttons-divs"><input className='like-buttons' type="image" src={FilledLikeHeart} value={chirp.id} onClick={handleUnlikeChirp}/></div>}
                    {!chirp.likes.find(user => user.id === sessionUser.id) ? <p id="like-count-not-liked">{chirp.likes.length}</p> :
                    <p id="like-count-liked">{chirp.likes.length}</p>}
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
    </>
  )
}
