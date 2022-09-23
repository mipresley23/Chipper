import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, NavLink } from "react-router-dom";
import NavBar from "../NavBar";
import { thunkGetChirps, thunkDeleteChirp, thunkAddLike, thunkDeleteLike } from "../../store/chirp";
import { thunkGetComments } from "../../store/comment";
import { thunkGetUsers } from "../../store/users";
import { thunkAddFollow, thunkRemoveFollow } from "../../store/users";
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
  const [showChirps, setShowChirps] = useState(true);
  const [showLiked, setShowLiked] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);
  const [followed, setFollowed] = useState(false);
  const [usersFollowed, setUsersFollowed] = useState([])
  const [followers, setFollowers] = useState([]);

  const usersSelector = useSelector(state => state.users)
  const sessionUser = useSelector(state => state.session.user)
  const chirpSelector = useSelector(state => state.chirps)
  const commentSelector = useSelector(state => state.comments)
  const followingSelector = useSelector(state => state.session.user.followings)

  const thisUser = users && users.find(user => user.id === +userId)




  useEffect(() => {
    if(thisUser){
      const followingFilter = sessionUser && sessionUser.followings.find(user => user.id === thisUser.id)
      if (followingFilter){
        setFollowed(true)
      }
    }
  }, [thisUser])

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
    setShowChirps(true);
    setShowFollowers(false);
    setShowFollowing(false);
    setShowLiked(false)
  }, [thisUser])


  useEffect(() => {
    if(thisUser?.id === sessionUser?.id) setUsersFollowed(followingSelector)
    else setUsersFollowed(thisUser?.followings)
  }, [sessionUser, thisUser, followingSelector])

  useEffect(() => {
    setFollowers(thisUser?.followers)
  }, [thisUser?.followers])

  // useEffect(() => {
  //   setUsersFollowed(followingSelector)
  // }, [thisUser, followingSelector])

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

  const handleFollowUser = async(e) => {
    await dispatch(thunkAddFollow(thisUser))
    await setUsersFollowed(sessionUser?.followings)
    await setFollowers([...followers, sessionUser])
    setFollowed(true);
  }

  const handleUnfollowUser = async(e) => {
    await dispatch(thunkRemoveFollow(thisUser))
    await setUsersFollowed(sessionUser?.followings)
    followers.splice(followers.indexOf(sessionUser), 1)
    setFollowed(false)
  }

  const handleShowChirps = (e) => {
    e.preventDefault()
    setShowChirps(true);
    setShowLiked(false)
    setShowFollowers(false)
    setShowFollowing(false);
  }

  const handleShowLikes = (e) => {
    e.preventDefault()
    setShowLiked(true);
    setShowChirps(false);
    setShowFollowers(false);
    setShowFollowing(false);
  }

  const handleShowFollowers = (e) => {
    e.preventDefault()
    setShowFollowers(true);
    setShowChirps(false);
    setShowLiked(false);
    setShowFollowing(false);
  }

  const handleShowFollowing = (e) => {
    e.preventDefault();
    setShowFollowing(true);
    setShowChirps(false);
    setShowFollowers(false);
    setShowLiked(false);
  }

  if(!thisUser) return null;
  return(
    <>
      <NavBar params={userId}/>
      <div id="profile-page-main-content">
        <div id="profile-header-content">
          <div id="header-chirps-container">
            <h3>{thisUser.name}</h3>
            {showChirps ? <p id="profile-chirp-count">{usersChirps.length} chirps</p> : showLiked ? <p id="profile-chirp-count">{thisUsersLikes.length} likes</p> : followers && showFollowers ? <p id="profile-chirp-count">{followers.length} followers</p> : thisUser.followings && showFollowing ? <p id="profile-chirp-count">{usersFollowed.length} following</p> : null}
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
            <p id="user-profile-bio">{thisUser.bio}</p>
          </div>
            {sessionUser.id !== thisUser.id && !followed ? <button id="follow-user-button" type="button" onClick={handleFollowUser}>Follow</button> :
            sessionUser.id !== thisUser.id && followed ? <button id="unfollow-user-button" type="button" onClick={handleUnfollowUser}>Unfollow</button> : null}
        </div>
        <div id="users-chirps-container">
          <div id="profile-tabs-container">
            {!showChirps ? <button className='profile-tabs' type="button" onClick={handleShowChirps}>Chirps</button> : <button className='profile-tabs-disabled' type="button">Chirps</button>}
            {!showLiked ? <button className='profile-tabs' type="button" onClick={handleShowLikes}>Likes</button> : <button className='profile-tabs-disabled' type="button">Likes</button>}
            {!showFollowers ? <button className='profile-tabs' type="button" onClick={handleShowFollowers}>Followers</button> : <button className='profile-tabs-disabled' type="button">Followers</button>}
            {!showFollowing ? <button className='profile-tabs' type="button" onClick={handleShowFollowing}>Following</button> : <button className='profile-tabs-disabled' type="button">Following</button>}

          </div>
          {
            showChirps && reverseUsersChirps && reverseUsersChirps.map(chirp => (
              <div id="each-chirp-container">
                <NavLink to={`/chirps/${chirp.id}`}>
                  <div id="main-chirp-content">
                    <div id="chirp-user-container">
                      <img id='chirp-user-image' src={chirp.user.profile_pic ? chirp.user.profile_pic : "https://as1.ftcdn.net/jpg/03/46/83/96/240_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"} alt={chirp.user.username}></img>
                      <h4 id="chirp-user-name">{chirp.user.name}</h4>
                      <p id="chirp-user-username">{chirp.user.username}</p>
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
                      <h4 id="chirp-user-name">{chirp.user.name}</h4>
                      <p id="chirp-user-username">{chirp.user.username}</p>
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
            showFollowers && followers && followers.map(follower => (
              <div id="profile-follow-container">
              <NavLink to={`/users/${follower.id}`}>
                <div id='profile-follower-names'>
                  <img id='profile-follower-image' src={follower.profile_pic} alt=''/>
                  <h4 id="profile-follower-user-name">{follower.name}</h4>
                  <p id="profile-follower-user-username">{follower.username}</p>
                </div>
                <p id="profile-follower-bio">{follower.bio}</p>
              </NavLink>
              </div>
            ))
          }
          {
            showFollowing && usersFollowed && usersFollowed.map(followed => (
              <div id="profile-follow-container">
              <NavLink to={`/users/${followed.id}`}>
              <div id='profile-follower-names'>
                <img id='profile-follower-image' src={followed.profile_pic} alt=''/>
                <h4 id="profile-follower-user-name">{followed.name}</h4>
                <p id="profile-follower-user-username">{followed.username}</p>
              </div>
              <p id="profile-follower-bio">{followed.bio}</p>
            </NavLink>
            </div>
            ))
          }
        </div>
      </div>
    </>
  )
}
