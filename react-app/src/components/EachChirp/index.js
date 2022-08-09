import React, { useState, useEffect }from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink, useHistory } from "react-router-dom";
import { thunkGetChirps, thunkEditChirp } from "../../store/chirp";
import { thunkAddComment, thunkDeleteComment, thunkGetComments } from "../../store/comment";
import NavBar from "../NavBar";
import './eachChirp.css';

export default function EachChirp() {
  const dispatch = useDispatch()
  const history = useHistory();

  const {chirpId} = useParams();

  const [chirps, setChirps] = useState([])
  const [comments, setComments] = useState([])
  const [chirpTitle, setChirpTitle] = useState('')
  const [commentTitle, setCommentTitle] = useState('')
  const [chirpBody, setChirpBody] = useState('');
  const [commentBody, setCommentBody] = useState('');
  const [media, setMedia] = useState('');
  const [showForm, setShowForm] = useState(false);


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
  console.log('thsChirp: ', thisChirp)

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

  const editChirp = async (e) => {
    e.preventDefault();
    const chirp = {
      id: +chirpId,
      body: chirpBody,
      media,
      userId: sessionUser.id
    }
    await dispatch(thunkEditChirp(chirp))
    setShowForm(false)
  }

  const handleDeleteComment = async (e) => {
    e.preventDefault();
    console.log(e.target.value)
    await dispatch(thunkDeleteComment(e.target.value))
    // await setComments(Object.values(commentSelector))
  }

  const handleGoBackToSplash = (e) => {
    e.preventDefault();
    history.push('/')
  }

  const handleCancelForm = (e) => {
    e.preventDefault();
    setShowForm(false)
    setChirpBody(thisChirp.body)
  }

  if(!thisChirp) return null;
  return(
  <>
    <NavBar />
    <div id="each-chirp-main-content">
      <div id="title-back-button-container">
        <h3 id="each-main-title">Chirp</h3>
        <button id='each-chirp-go-back-button' type="button" onClick={handleGoBackToSplash}>
          <img id="each-chirp-go-back-button-image" src={require('../assets/back-arrow.png')} alt='Back'/>
        </button>
      </div>
      {correctUser && <div id="edit-chirp-container">
      { !showForm && <button id='edit-chirp-button' type="button" onClick={() => setShowForm(true)}>Edit Chirp</button>}
                {showForm && <form id="edit-chirp-form" onSubmit={editChirp}>
                  <img id="edit-chirp-profile-pic" className="chirp-form-profile-pics" src={sessionUser.profile_pic} alt='' />
                  <textarea id='edit-chirp-input'
                    type="text"
                    value={chirpBody}
                    onChange={(e) => setChirpBody(e.target.value)}
                    />
                  {chirpBody.length === 0 ? <p id="edit-chirp-counter-zero">Chirps must be at least 1 character. {chirpBody.length}/300</p> : chirpBody.length <= 290 ? <p id="edit-chirp-counter">{chirpBody.length}/300</p> :
                  chirpBody.length <= 300 ? <p id="edit-chirp-counter-close-to-limit">{chirpBody.length}/300</p> : <p id="edit-chirp-over-limit">Chirp Must Be 300 Characters Or Less. {chirpBody.length}/300</p>}
                  {chirpBody.length <= 300 & chirpBody.length > 0 ? <button className='chirp-submit-buttons' id="edit-chirp-submit-button">Confirm</button> : <button id='edit-chirp-button-disabled' type="button">Confirm</button>}
                  <button id='edit-chirp-cancel-button' type="button" onClick={handleCancelForm}>Cancel</button>
                </form>}
      </div>}
      <div id="chirp-and-comments-container">
        <div id="chirp-container">
          <div id="each-chirp-user-container">
            <img id='chirp-profile-pic' src={thisChirp.user.profile_pic} alt={thisChirp.user.username}/>
            <p id="each-chirp-user">{thisChirp.user.username}</p>
          </div>
          <p id="each-chirp-body">{thisChirp.body}</p>
        </div>
        <form id='chirp-reply-form' onSubmit={addComment}>
          <img id="chirp-reply-profile-pic" className="chirp-form-profile-pics" src={sessionUser.profile_pic} alt='' />
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
          {commentBody.length > 0 & commentBody.length <= 300 ? <button className='chirp-submit-buttons' id='chirp-reply-button' onCLick={() => setCommentBody('')} type="submit">Reply</button> :
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
                    <img id="comment-user-pic" src={comment.user.profile_pic} alt=''/>
                    <li id="comment-username">{comment.user.username}</li>
                  </div>
                  <li id='comment-body' key={comment.id}>{comment.body}</li>
                  {sessionUser.id === comment.user.id ? <button id='comment-delete-button' value={comment.id} onClick={handleDeleteComment} type="button">Delete</button> : null}
                </div>
              ))
            }
          </ul>
         </div>
      </div>
    </div>
  </>
  )
}
