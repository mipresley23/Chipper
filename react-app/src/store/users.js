const GET_USERS = 'users/GET_USERS';
const EDIT_USER = 'users/EDIT_USER';
const ADD_FOLLOWER = 'users/ADD_FOLLOWER';
const REMOVE_FOLLOWER = 'users/REMOVE_FOLLOWER';

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
  console.log('thunk user prefetch: ', user)
  const res = await fetch(`/api/users/follows/${id}`, {
    method: "PUT",
    headers: {"Content-Type": "application/json"}
  })
  console.log('thunk res: ', res)
  if(res.ok){
    const user = await res.json()
    console.log('thunk user json: ', user)
    dispatch(actionAddFollower(user))
    return user;
  }
}

export const thunkRemoveFollow = (user) => async(dispatch) => {
  console.log('remove follow thunk user: ', user)
  const {id} = user;
  const res = await fetch(`/api/users/unfollow/${id}`, {
    method: "PUT",
    headers: {"Content-Type": "application/json"}
  })

  console.log('remove follow thunk res: ', res)
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
      console.log('action: ', action.user.followers[0].id)
      newState[action.user.id].followers = [action.user.followers[0]]
      return newState;

    case REMOVE_FOLLOWER:
      console.log('remove action: ', action)

    default:
      return state;
  }
}

export default userReducer;
