const GET_USERS = 'users/GET_USERS';
const ADD_FOLLOWER = 'users/ADD_FOLLOWER';
const REMOVE_FOLLOWER = 'users/REMOVE_FOLLOWER';

const actionGetUsers = (users) => {
  return {
    type: GET_USERS,
    users
  }
}

const actionAddFollower = (user) => {
  return {
    type: ADD_FOLLOWER,
    user
  }
}

const actionRemoveFollower = (user) => {
  return {
    type: REMOVE_FOLLOWER,
    user
  }
}

export const thunkAddFollow = (user) => async(dispatch) => {
  const {id} = user
  console.log('thunk user: ', user)
  const res = await fetch(`/api/users/follows/${id}`, {
    method: "PUT",
    headers: {"Content-Type": "application/json"}
  })
  console.log('thunk res: ', res)
  if(res.ok){
    const user = await res.json()
    console.log('thunk user: ', user)
    dispatch(actionAddFollower(user))
    return user;
  }
}

export const thunkRemoveFollow = (user) => async(dispatch) => {
  const {id} = user;
  const res = await fetch(`/api/users/follows/${id}`, {
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

    case ADD_FOLLOWER:
      console.log('add follow action', action)

    default:
      return state;
  }
}

export default userReducer;
