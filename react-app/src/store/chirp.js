const GET_CHIRPS = 'chirps/GET_CHIRPS';
const ADD_CHIRP = 'chirps/ADD_CHIRP';
const EDIT_CHIRP = 'chirps/EDIT_CHIRP';
const DELETE_CHIRP = 'chirps/DELETE_CHIRP';

const actionGetChirps = (chirps) => {
  return {
    type: GET_CHIRPS,
    chirps
  }
}

const actionAddChirp = (chirp) => {
  return {
    type: ADD_CHIRP,
    chirp
  }
}

const actionEditChirp = (chirp) => {
  return {
    type: EDIT_CHIRP,
    chirp
  }
}

const actionDeleteChirp = (chirpId) => {
  return {
    type: DELETE_CHIRP,
    chirpId
  }
}


export const thunkGetChirps = (chirps) => async(dispatch) => {
  const res = await fetch("/api/chirps/");
  const chirps = await res.json();
  dispatch(actionGetChirps(chirps))
  return res;
}

export const thunkAddChirp = (chirp) => async(dispatch) => {
  const res = await fetch('/api/chirps/', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(chirp)
  })
  const data = await res.json()
  dispatch(actionAddChirp(data));
  return data;
}

export const thunkEditChirp = (chirp) => async (dispatch) => {
  const res = await fetch(`/api/chirps/${chirp.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json"},
    body: JSON.stringify(chirp)
  })
  const data = await res.json()
  dispatch(actionEditChirp(data));
  return data;
}

export const thunkDeleteChirp = (chirpId) => async(dispatch) => {
  const res = await fetch(`/api/chirps/${chirpId}`, {
    method: "DELETE",
  })
  dispatch(actionDeleteChirp(chirpId));
  return res;
}

const chirpReducer = (state = {}, action) => {
	const newState = { ...state };
	switch (action.type) {
		case GET_CHIRPS:
      console.log('action chirps: ', action)
			action.chirps.forEach((chirp) => {
				newState[chirp.id] = chirp;
			});
			return newState;

		case ADD_CHIRP:
			newState[action.chirp.id] = action.chirp;
			return newState;

    case EDIT_CHIRP:
      newState[action.chirp.id] = action.chirp;
      return newState;

		case DELETE_CHIRP:
			delete newState[action.chirpId];
			return newState;

		default:
			return state;
	}
};

export default chirpReducer;
