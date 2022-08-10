import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { thunkEditComment, thunkGetComments } from "../../store/comment";
import '../editChirp/editChirpModal.css';

export default function EditComment({comment, setShowModal}) {

  const dispatch = useDispatch()

  const {chirpId} = useParams()
  console.log('modal chirpId: ', chirpId)

  const [comments, setComments] = useState([])
  const [commentId, setCommentId] = useState(comment?.id)
  const [media, setMedia] = useState('');
  const [commentBody, setCommentBody] = useState(comment?.body);

  const commentSelector = useSelector(state => state.comments)
  const sessionUser = useSelector(state => state.session.user)

  // const thisComment = comments && comments.find(comment => comment.id === +commentId)






  useEffect(() => {
    dispatch(thunkGetComments())
  }, [dispatch])

  useEffect(() => {
    setComments(Object.values(commentSelector))
  }, [commentSelector])

  // useEffect(() => {
  //   if(thisComment){
  //     setCommentBody(thisComment.body)
  //   }
  // }, [thisComment])



  const editComment = async (e) => {
    e.preventDefault();
    const comment = {
      id: commentId,
      body: commentBody,
      media,
      userId: sessionUser.id,
      chirpId
    }
    await dispatch(thunkEditComment(comment))
    setShowModal(false)
  }

  const handleCancelForm = (e) => {
    e.preventDefault();
    setShowModal(false)
    setCommentBody(comment.body)
  }

  return(
    <>
      <button className="modal-cancel-buttons" onClick={() => setShowModal(false)}>x</button>
      <h3 id="edit-comment-header">Edit Comment</h3>
        <form id="edit-comment-form" onSubmit={editComment}>
          <img id="edit-comment-profile-pic" className="chirp-form-profile-pics" src={sessionUser.profile_pic ? sessionUser.profile_pic : 'https://as1.ftcdn.net/jpg/03/46/83/96/240_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg'} alt='' />
          <textarea id="edit-comment-input"
                  type="text"
                  value={commentBody}
                  onChange={(e) => setCommentBody(e.target.value)}/>
                  {commentBody.length === 0 ? <p id="edit-comment-counter-zero">Comments must be at least 1 character. {commentBody.length}/300</p> :
                  commentBody.length > 0 & commentBody.length <= 290 ? <p id="edit-comment-counter">{commentBody.length}/300</p> :
                  commentBody.length <= 300 ? <p id="edit-comment-counter-close-to-limit">{commentBody.length}/300</p> : <p id="edit-comment-over-limit">Comments Must Be 300 Characters Or Less. {commentBody.length}/300</p>}
                  {commentBody.length <= 300 & commentBody.length > 0 ? <button className="chirp-submit-buttons">Edit Comment</button> : <button className='chirp-submit-buttons' id='edit-comment-button-disabled' type="button">Edit Comment</button>}
                  <button id='edit-comment-cancel-button' type="button" onClick={handleCancelForm}>Cancel</button>
        </form>
    </>
  )
}
