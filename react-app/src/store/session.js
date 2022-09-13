// constants
const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';
const ADD_FOLLOWER = 'session/ADD_FOLLOWER';
const REMOVE_FOLLOWER = 'session/REMOVE_FOLLOWER';

const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const removeUser = () => ({
  type: REMOVE_USER,
})

export const actionAddFollower = (user) => {
  return {
    type: ADD_FOLLOWER,
    user
  }
}

export const actionRemoveFollower = (user) => {
  return {
    type: REMOVE_FOLLOWER,
    user
  }
}

const initialState = { user: null };

export const authenticate = () => async (dispatch) => {
  const response = await fetch('/api/auth/', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(setUser(data));
  }
}

export const demoLogin = (email= 'demo@aa.io', password= 'password') => async (dispatch) => {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  });
  const data = await res.json();
  dispatch(setUser(data))
  return null;
}

export const login = (email, password) => async (dispatch) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  });


  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }

}

export const logout = () => async (dispatch) => {
  const response = await fetch('/api/auth/logout', {
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (response.ok) {
    dispatch(removeUser());
  }
};


export const signUp = (user) => async (dispatch) => {
  const {name, username, email, password, profile_pic, bio} = user;
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });

  if (response.ok) {
    const data = await response.json();

    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { user: action.payload }
    case REMOVE_USER:
      return { user: null }

    case ADD_FOLLOWER:
      const newState1 = {...state}
      newState1.user.followings.push(action.user)
      return newState1;

    case REMOVE_FOLLOWER:
      const newState2 = {...state}
      const userIndex = newState2.user.followings.findIndex(user => user.id === action.user.id)
      newState2.user.followings.splice(userIndex, 1)
      return newState2;
    default:
      return state;
  }
}
