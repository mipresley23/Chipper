import React, { useState, useEffect }from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { thunkGetChirps, thunkEditChirp } from "../../store/chirp";
import './editChirpModal.css'

export default function EditChirp({chirp, setShowModal}) {
  const dispatch = useDispatch();
  const history = useHistory();
  // console.log(chirp)
  // const {chirpId} = useParams();

  const [chirps, setChirps] = useState([])
  const [chirpId, setChirpId] = useState(chirp?.id)
  const [chirpBody, setChirpBody] = useState(chirp?.body);
  const [media, setMedia] = useState('');

  const sessionUser = useSelector(state => state.session.user)
  const chirpSelector = useSelector(state => state.chirps)

  // const thisChirp = chirps && chirps.find(chirp => chirp.id === +chirpId)

  // useEffect(() => {
  //   if(thisChirp){
  //     setChirpBody(thisChirp.body)
  //   }
  // }, [thisChirp])

  useEffect(() => {
    dispatch(thunkGetChirps())
  }, [dispatch])

  useEffect(() => {
    setChirps(Object.values(chirpSelector))
  }, [chirpSelector])


  const editChirp = async (e) => {
    e.preventDefault();
    const chirp = {
      id: chirpId,
      body: chirpBody,
      media,
      userId: sessionUser.id
    }
    await dispatch(thunkEditChirp(chirp))
    setShowModal(false)
  }



  const handleCancelForm = (e) => {
    e.preventDefault();
    setShowModal(false)
    setChirpBody(chirp.body)
  }

  return(
    <>
      <button className='modal-cancel-buttons' id='signup-cancel-button' onClick={() => setShowModal(false)}>x</button>
      <h3 id="edit-chirp-header">Edit Chirp</h3>
      <form id="edit-chirp-form" onSubmit={editChirp}>
                  <img id="edit-chirp-profile-pic" className="chirp-form-profile-pics" src={sessionUser.profile_pic ? sessionUser.profile_pic : 'https://as1.ftcdn.net/jpg/03/46/83/96/240_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg'} alt='' />
                  <textarea id='edit-chirp-input'
                    type="text"
                    value={chirpBody}
                    onChange={(e) => setChirpBody(e.target.value)}
                    />
                  {chirpBody.length === 0 ? <p id="edit-chirp-counter-zero">Chirps must be at least 1 character. {chirpBody.length}/300</p> :
                  chirpBody.length > 0 & chirpBody.length <= 290 ? <p id="edit-chirp-counter">{chirpBody.length}/300</p> :
                  chirpBody.length <= 300 ? <p id="edit-chirp-counter-close-to-limit">{chirpBody.length}/300</p> : <p id="edit-chirp-over-limit">Chirp Must Be 300 Characters Or Less. {chirpBody.length}/300</p>}
                  {chirpBody.length <= 300 & chirpBody.length > 0 ? <button className='chirp-submit-buttons' id="edit-chirp-submit-button">Confirm</button> : <button id='edit-chirp-button-disabled' type="button">Confirm</button>}
                  <button id='edit-chirp-cancel-button' type="button" onClick={handleCancelForm}>Cancel</button>
                </form>
    </>
  )
}
