const GET_COMMENTS = 'comments/GET_COMMENTS';
const ADD_COMMENT = 'comments/ADD_COMMENT';
const EDIT_COMMENT = 'comments/EDIT_COMMENT';
const DELETE_COMMENT = 'commentss/DELETE_COMMENT';

const actionGetComments = (comments) => {
  return {
    type: GET_COMMENTS,
    comments
  }
}

const actionAddComment = (comment) => {
  return {
    type: ADD_COMMENT,
    comment
  }
}

const actionEditComment = (comment) => {
  return {
    type: EDIT_COMMENT,
    comment
  }
}

const actionDeleteComment = (commentId) => {
  return {
    type: DELETE_COMMENT,
    commentId
  }
}


export const thunkGetComments = (comments) => async(dispatch) => {
  const res = await fetch("/api/comments/");
  const comments = await res.json();
  dispatch(actionGetComments(comments))
  return res;
}

export const thunkAddComment = (comment) => async(dispatch) => {
  const res = await fetch('/api/comments/', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(comment)
  })
  const data = await res.json()
  dispatch(actionAddComment(data));
  return data;
}

export const thunkEditComment = (comment) => async(dispatch) => {
  const res = await fetch(`/api/comments/${comment.id}`, {
  method: "PUT",
  headers: {"Content-Type": "application/json"},
  body: JSON.stringify(comment)
  })
  const data = await res.json()
  dispatch(actionEditComment(data));
  return data;
}

export const thunkDeleteComment = (commentId) => async(dispatch) => {
  const res = await fetch(`/api/comments/${commentId}`, {
    method: "DELETE",
  })
  dispatch(actionDeleteComment(commentId));
  return res;
}


const commentReducer = (state = {}, action) => {
	const newState = { ...state };
	switch (action.type) {
		case GET_COMMENTS:
			action.comments.forEach((comment) => {
				newState[comment.id] = comment;
			});
			return newState;

		case ADD_COMMENT:
			newState[action.comment.id] = action.comment;
			return newState;

    case EDIT_COMMENT:
      newState[action.comment.id] = action.comment;
      return newState;

		case DELETE_COMMENT:
			delete newState[action.commentId];
			return newState;

		default:
			return state;
	}
};

export default commentReducer;
