import React, { useState, useEffect }from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import { thunkEditComment, thunkGetComments } from "../../store/comment";
import './eachComment.css';


export default function EachComment() {
  const dispatch = useDispatch()

  const {commentId} = useParams()

  const [comments, setComments] = useState([])
  const [commentBody, setCommentBody] = useState('');
  const [media, setMedia] = useState('');
  const [showForm, setShowForm] = useState(false);

  const commentSelector = useSelector(state => state.comments)
  const sessionUser = useSelector(state => state.session.user)

  const thisComment = comments && comments.find(comment => comment.id === +commentId)

  const chirpId = thisComment && thisComment.chirpId;


  useEffect(() => {
    dispatch(thunkGetComments())
  }, [dispatch])

  useEffect(() => {
    setComments(Object.values(commentSelector))
  }, [commentSelector])

  useEffect(() => {
    if(thisComment){
      setCommentBody(thisComment.body)
    }
  }, [thisComment])

  const editComment = async (e) => {
    e.preventDefault();
    const comment = {
      id: +commentId,
      body: commentBody,
      media,
      userId: sessionUser.id,
      chirpId
    }
    await dispatch(thunkEditComment(comment))
    setShowForm(false)
  }

  if(!thisComment) return null;
  return(
    <div id="comment-page-main-content">
      <h1>Comment</h1>
      <div id="all-comments-container">
        <div id="each-comment-container">
          <h3>{thisComment.title}</h3>
          <p>{thisComment.body}</p>
        <button type="button" onClick={() => setShowForm(true)}>Edit Comment</button>
        </div>
        {showForm && <form onSubmit={editComment}>
                  <input
                    type="text"
                    value={commentBody}
                    defaultValue={thisComment.body}
                    onChange={(e) => setCommentBody(e.target.value)}
                  />
                  <button>Edit Comment</button>
                </form>}
      </div>
    </div>
  )
}
