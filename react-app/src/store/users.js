const GET_USERS = 'users/GET_USERS';

const actionGetUsers = (users) => {
  return {
    type: GET_USERS,
    users
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
