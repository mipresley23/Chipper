import { actionAddFollower, actionRemoveFollower } from "./session";

const GET_USERS = 'users/GET_USERS';
const EDIT_USER = 'users/EDIT_USER';


const actionGetUsers = (users) => {
  return {
    type: GET_USERS,
    users
  }
}

const actionEditUser = (user) => {
  return {
    type: EDIT_USER,
    user
  }
}


export const thunkAddFollow = (user) => async(dispatch) => {
  const {id} = user
  const res = await fetch(`/api/users/follows/${id}`, {
    method: "PUT",
    headers: {"Content-Type": "application/json"}
  })
  if(res.ok){
    const user = await res.json()
    dispatch(actionAddFollower(user))
    return user;
  }
}

export const thunkRemoveFollow = (user) => async(dispatch) => {
  const {id} = user;
  const res = await fetch(`/api/users/unfollow/${id}`, {
    method: "PUT",
    headers: {"Content-Type": "application/json"}
  })
  if(res.ok){
    const user = await res.json()
    dispatch(actionRemoveFollower(user))
    return user;
  }
}

export const thunkGetUsers = (users) => async(dispatch) => {
  const res = await fetch('/api/users/');
  const data = await res.json();
  dispatch(actionGetUsers(data))
  return data;
}

const userReducer = (state = {}, action) => {
  const newState = { ...state };
  switch (action.type) {
    case GET_USERS:
      action.users.forEach((user) => {
        newState[user.id] = user;
      });
      return newState;

    default:
      return state;
  }
}

export default userReducer;
