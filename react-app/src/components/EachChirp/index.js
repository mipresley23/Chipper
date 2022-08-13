import React, { useState, useEffect }from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink, useHistory } from "react-router-dom";
import { thunkGetChirps, thunkEditChirp, thunkAddLike, thunkDeleteLike } from "../../store/chirp";
import { thunkAddComment, thunkDeleteComment, thunkGetComments } from "../../store/comment";
import EditChirpModal from "../editChirp/editChirpModal";
import EditCommentModal from "../editComment/editCommentModal";
import NavBar from "../NavBar";
import EmptyLikeHeart from '../assets/chipper_like_empty.png'
import FilledLikeHeart from '../assets/chipper_like_filled.png'
import TrendingTopics from "../trendingTopics";
import './eachChirp.css';

export default function EachChirp() {
  const dispatch = useDispatch()
  const history = useHistory();

  const {chirpId} = useParams();

  const [chirps, setChirps] = useState([])
  const [comments, setComments] = useState([])
  const [chirpBody, setChirpBody] = useState('');
  const [commentBody, setCommentBody] = useState('');
  const [media, setMedia] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [liked, setLiked] = useState(false)


  const chirpSelector = useSelector(state => state.chirps)
  const commentSelector = useSelector(state => state.comments)
  const sessionUser = useSelector(state => state.session.user)

  const thisChirpsComments = comments && comments.filter(comment => comment.chirpId === +chirpId)

  const reverseComments = []
  if(thisChirpsComments){
    for(let i = thisChirpsComments.length - 1; i >= 0; i --){
      const comment = thisChirpsComments[i];
      reverseComments.push(comment)
    }
  }

  const thisChirp = chirps && chirps.find(chirp => chirp.id === +chirpId)

  let correctUser;
  if(thisChirp){
    correctUser = sessionUser && sessionUser.id === thisChirp.user.id;
  }

useEffect(() => {
  if(thisChirp){
    setChirpBody(thisChirp.body)
  }
}, [thisChirp])

useEffect(() => {
  if(thisChirp){
    if(thisChirp.likes.find(like => like.id === sessionUser.id)){
      setLiked(true)
    }
  }
}, [thisChirp, sessionUser])



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

  const addComment = async(e) => {
    e.preventDefault();
    const comment = {
      body: commentBody,
      media,
      userId: sessionUser.id,
      chirpId: +chirpId
    }
    await dispatch(thunkAddComment(comment))
    await setCommentBody('')
  }



  const handleDeleteComment = async (e) => {
    e.preventDefault();

    await dispatch(thunkDeleteComment(e.target.value))
    // await setComments(Object.values(commentSelector))
  }

  const handleGoBackToSplash = (e) => {
    e.preventDefault();
    history.push('/')
  }

  const handleLikeChirp = async(e) => {
    e.preventDefault();
    setLiked(true)
    await dispatch(thunkAddLike(chirpId))
  }

  const handleUnlikeChirp = async(e) => {
    e.preventDefault();
    setLiked(false)
    await dispatch(thunkDeleteLike(chirpId))
  }

  console.log('this chirp: ', thisChirp)



  if(!thisChirp) return null;
  return(
  <>
    <NavBar params={chirpId}/>
    <div id="each-chirp-main-content">
      <div id="title-back-button-container">
        <h3 id="each-main-title">Chirp</h3>
        <button id='each-chirp-go-back-button' type="button" onClick={handleGoBackToSplash}>
          <img id="each-chirp-go-back-button-image" src={require('../assets/back-arrow.png')} alt='Back'/>
        </button>
      </div>
      <div id="chirp-and-comments-container">
        <div id="chirp-container">
       {correctUser && <div id="edit-chirp-container">
        <EditChirpModal chirp={thisChirp}/>
        </div>}
          <div id="each-chirp-user-container">
            <img id='chirp-profile-pic' src={thisChirp.user.profile_pic ? thisChirp.user.profile_pic : 'https://as1.ftcdn.net/jpg/03/46/83/96/240_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg'} alt={thisChirp.user.username}/>
            <p id="each-chirp-user">{thisChirp.user.username}</p>
          </div>
          <p id="each-chirp-body">{thisChirp.body}</p>
          <div className='like-button-containers'>
          {!liked && <button className='like-buttons' type="button" onClick={handleLikeChirp}>
              <img className="like-heart-icons" src={EmptyLikeHeart}/>
            </button>}
          {liked && <button className='like-buttons' type="button" onClick={handleUnlikeChirp}>
              <img className="like-heart-icons" src={FilledLikeHeart}/>
            </button>}
          <p>{thisChirp.likes.length}</p>
          </div>
        </div>
        <form id='chirp-reply-form' onSubmit={addComment}>
          <img id="chirp-reply-profile-pic" className="chirp-form-profile-pics" src={sessionUser.profile_pic ? sessionUser.profile_pic : 'https://as1.ftcdn.net/jpg/03/46/83/96/240_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg'} alt='' />
          <textarea id='chirp-reply-input'
          cols={60}
          type="text"
          placeholder='Chirp Your Reply'
          value={commentBody}
          onChange={(e) => setCommentBody(e.target.value)}
          />
          {commentBody.length === 0 ? <p id="comment-counter-zero">Comments must be at least 1 character. {commentBody.length}/300</p> :
          commentBody.length > 0 & commentBody.length <= 290 ? <p id="comment-counter">{commentBody.length}/300</p> :
          commentBody.length <= 300 ? <p id="comment-counter-close-to-limit">{commentBody.length}/300</p> :
          <p id="comment-over-limit">Comments Must Be 300 Characters Or Less. {commentBody.length}/300</p>}
          {commentBody.length > 0 & commentBody.length <= 300 ? <button className='chirp-submit-buttons' id='chirp-reply-button'  type="submit">Reply</button> :
          <button className='chirp-submit-buttons' id="chirp-reply-button-disabled" type="button">Reply</button>}
        </form>
        {/* <div id="all-comments">
          {
            reverseComments && reverseComments.map(comment => (
              <div id='each-comment-container'>
                <NavLink to={`/comments/${comment.id}`}>
                  <h6 id="replying-to">Replying to: {thisChirp.user.username}</h6>
                  <div id="comment-user-info">
                    <img id='comment-user-pic' src={comment.user.profile_pic} alt='' />
                    <p id="comment-user">{comment.user.username}</p>
                  </div>
                  <p id="comment-body">{comment.body}</p>
                  <button className='chirp-submit-buttons' type="button" value={comment.id} onClick={handleDeleteComment}>Delete Comment</button>
                </NavLink>
              </div>
            ))
          }
         </div> */}
         <div id="comment-container">
          <ul id="comment-list">
            {
              reverseComments && reverseComments.map(comment => (
                  <div id="each-comment">
                    <div id="comment-user-container">
                      <img id="comment-user-pic" src={comment.user.profile_pic ? comment.user.profile_pic : 'https://as1.ftcdn.net/jpg/03/46/83/96/240_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg'} alt=''/>
                      <li id="comment-username">{comment.user.username}</li>
                    </div>
                    <li id='comment-body' key={comment.id}>{comment.body}</li>
                    <li>
                    {sessionUser.id === comment.user.id ? <button id='comment-delete-button' value={comment.id} onClick={handleDeleteComment} type="button">Delete</button> : null}
                    {sessionUser.id === comment.user.id ? <EditCommentModal comment={comment}/> : null}
                    </li>
                  </div>
              ))
            }
          </ul>
         </div>
      </div>
    </div>
    {/* <TrendingTopics /> */}
  </>
  )
}
