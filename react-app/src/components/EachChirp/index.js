import React, { useState, useEffect }from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import { thunkGetChirps, thunkEditChirp } from "../../store/chirp";
import { thunkAddComment, thunkDeleteComment, thunkGetComments } from "../../store/comment";
import './eachChirp.css';

export default function EachChirp() {
  const dispatch = useDispatch()

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
    await dispatch(thunkDeleteComment(e.target.value))
  }


  if(!thisChirp) return null;
  return(
    <div id="each-chirp-main-content">
      <h1>Each Chirp Page</h1>
      <div id="chirp-container">
        <h3>{thisChirp.user.username}</h3>
        <p>{thisChirp.body}</p>
      </div>
      {correctUser && <div id="edit-chirp-container">
      <button id='edit-chirp-button' type="button" onClick={() => setShowForm(true)}>Edit Chirp</button>
                {showForm && <form onSubmit={editChirp}>
                  <input
                    type="text"
                    value={chirpBody}
                    defaultValue={thisChirp.body}
                    onChange={(e) => setChirpBody(e.target.value)}
                  />
                  <button>Edit Chirp</button>
                  <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
                </form>}
      </div>}
      <div id="chirp-reply">
      <form onSubmit={addComment}>
        <input
            type="text"
            placeholder='Chirp Your Reply'
            value={commentBody}
            onChange={(e) => setCommentBody(e.target.value)}
        />
        <button type="submit">Reply</button>
      </form>
      </div>
      <div id="all-comments-container">
      {
        reverseComments && reverseComments.map(comment => (
          <div>
            <NavLink to={`/comments/${comment.id}`}>
              <h6>Replying to: {thisChirp.user.username}</h6>
              <h3>{comment.user.username}</h3>
              <p>{comment.body}</p>
              <button type="button" value={comment.id} onClick={handleDeleteComment}>Delete Comment</button>
            </NavLink>
          </div>
        ))
      }
      </div>
    </div>
  )
}
