import React, { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { thunkGetChirps, thunkAddChirp, thunkDeleteChirp, thunkEditChirp } from "../../store/chirp";
import "./splash.css"

export default function Splash() {

  const dispatch = useDispatch()

  const [chirps, setChirps] = useState([])
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('');
  const [media, setMedia] = useState('');
  const [showForm, setShowForm] = useState(false)

  const reverseChirps = []
  if(chirps){
    for(let i = chirps.length - 1; i >= 0; i --){
      const chirp = chirps[i];
      reverseChirps.push(chirp)
    }
  }

  const chirpSelector = useSelector(state => state.chirps)
  const sessionUser = useSelector(state => state.session.user)



  useEffect(() => {
    dispatch(thunkGetChirps())
  }, [dispatch])

  useEffect(() => {
    setChirps(Object.values(chirpSelector))
  }, [chirpSelector])

  const addChirp = async (e) => {
    e.preventDefault();
    const chirp = {
      body,
      media,
      userId: sessionUser.id
    }
    await dispatch(thunkAddChirp(chirp))
  }



  const handleDeleteChirp = async (e) => {
    e.preventDefault();
    await dispatch(thunkDeleteChirp(e.target.value))
  }

  if (!chirps) return null;
  if (!sessionUser) {

    return (
      <div>
        <h1>Welcome to Chipper</h1>
      </div>
    )
  } else {
    return (
      <div id="splash-main-content">
        <h1>Welcome Back to Chipper</h1>
        <form onSubmit={addChirp}>
          <div id="chirp-input-button-contatiner">
            <input id="splash-chirp-input"
            type="text"
            placeholder="What's Chirpin'?"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            />
            <button type="submit">Chirp</button>
          </div>
        </form>
        <div id="all-chirps-container">
          {
            reverseChirps && reverseChirps.map(chirp => (
              <div id="each-chirp-container">
                <NavLink to={`/chirps/${chirp.id}`}>
                  <div>
                    <div id="chirp-user-container">
                      <img id='chirp-user-image' src={chirp.user.profile_pic} alt={chirp.user.username}></img>
                      <p id="chirp-user">{chirp.user.username}</p>
                    </div>
                    <p id="chirp-body">{chirp.body}</p>
                  </div>
                  <button type="button" value={chirp.id} onClick={handleDeleteChirp}>Delete</button>
                </NavLink>
            </div>
            ))
          }
        </div>
      </div>
    )
  }
}
