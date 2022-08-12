import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, NavLink } from "react-router-dom";
import NavBar from "../NavBar";
import { thunkGetChirps, thunkAddChirp, thunkDeleteChirp, thunkEditChirp } from "../../store/chirp";
import { thunkGetUsers } from "../../store/users";
import EditChirpModal from "../editChirp/editChirpModal";
import blueHeader from '../assets/blue-gradient-header.jpg';
import './userProfile.css';

export default function UserProfile() {

  const dispatch = useDispatch();
  const history = useHistory();

  const {userId} = useParams();

  const [chirps, setChirps] = useState([])
  const [users, setUsers] = useState([])

  const usersSelector = useSelector(state => state.users)
  const sessionUser = useSelector(state => state.session.user)
  const chirpSelector = useSelector(state => state.chirps)

  const thisUser = users && users.find(user => user.id === +userId)

  const usersChirps = chirps && chirps.filter(chirp => chirp.user.id === +userId)
  console.log('users chirps: ', usersChirps)

  const reverseUsersChirps = []
  for(let i = usersChirps.length - 1; i >= 0; i--){
    reverseUsersChirps.push(usersChirps[i])
  }

  console.log('reverse user chirps: ', reverseUsersChirps)

  useEffect(() => {
    dispatch(thunkGetChirps())
  }, [dispatch])

  useEffect(() => {
    setChirps(Object.values(chirpSelector))
  }, [chirpSelector])

  useEffect(() => {
    dispatch(thunkGetUsers())
  }, [dispatch])

  useEffect(() => {
    setUsers(Object.values(usersSelector))
  }, [usersSelector])

  const handleDeleteChirp = async (e) => {
    e.preventDefault();
      await dispatch(thunkDeleteChirp(e.target.value))
  }

  const handleGoBackToSplash = (e) => {
    e.preventDefault();
    history.push('/')
  }

  if(!thisUser) return null;
  return(
    <>
      <NavBar />
      <div id="profile-page-main-content">
        <div id="profile-header-content">
          <div id="header-chirps-container">
            <h3>{thisUser.username}</h3>
            <p id="profile-chirp-count">{usersChirps.length} chirps</p>
          </div>
          <button id='profile-go-back-button' type="button" onClick={handleGoBackToSplash}>
            <img id="profile-go-back-button-image" src={require('../assets/back-arrow.png')} alt='Back'/>
          </button>
        </div>
        <div id="profile-images-container">
          <img id='profile-header-image' src={blueHeader} alt=''/>
          <img id="user-profile-picture" src={thisUser.profile_pic ? thisUser.profile_pic : 'https://as1.ftcdn.net/jpg/03/46/83/96/240_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg'} />
          <h3 id="user-profile-name">{thisUser.username}</h3>
        </div>
        <div id="users-chirps-container">
          {
            reverseUsersChirps && reverseUsersChirps.map(chirp => (
              <div id="each-chirp-container">
                <NavLink to={`/chirps/${chirp.id}`}>
                  <div>
                    <div id="chirp-user-container">
                      <img id='chirp-user-image' src={chirp.user.profile_pic ? chirp.user.profile_pic : "https://as1.ftcdn.net/jpg/03/46/83/96/240_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"} alt={chirp.user.username}></img>
                      <p id="chirp-user">{chirp.user.username}</p>
                    </div>
                    <p id="chirp-body">{chirp.body}</p>
                  </div>
                  {sessionUser.id === chirp.user.id ? <button id='delete-chirp-button' type="button" value={chirp.id} onClick={handleDeleteChirp}>Delete</button> : null}
                </NavLink>
                {sessionUser.id === chirp.user.id ? <div id="profile-edit-chirp-container">
                  <EditChirpModal chirp={chirp} />
                  </div> : null}
            </div>
            ))
          }
        </div>
      </div>
    </>
  )
}
