import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { thunkAddChirp, thunkGetChirps } from "../../store/chirp";
import AddPhotoIcon from '../assets/add_image.png';
import AddGiphyGif from "../giphyModal";
import GiphyModal from "../giphyModal/giphyModal";


export default function AddChirp() {

  const dispatch = useDispatch()
  const history = useHistory()

  const hiddenFileInput = useRef(null);

  const [body, setBody] = useState('');
  const [media, setMedia] = useState('');
  const [mediaLoading, setMediaLoading] = useState(false);
  const [errors, setErrors] = useState([])

  const sessionUser = useSelector(state => state.session.user)

  const handleClick = e => {
    e.preventDefault();
    hiddenFileInput.current.click();
  };

  const addChirp = async (e) => {
    e.preventDefault()
    const errorsArr = []
    const formData = new FormData()
    formData.append("media", media)
    formData.append("body", body)
    formData.append('userId', sessionUser.id)

    setMediaLoading(true);
    if(media){
      const res = await fetch('/api/chirps/new', {
        method: "POST",
        body: formData,
      });


      if(res.ok){
        const jsonRes = await res.json();

        const chirp = {
          media: jsonRes.media,
          body,
          userId: sessionUser.id
        }

        const response = await dispatch(thunkAddChirp(chirp));
        if (response === "Success"){
          window.alert("Chirp Posted Successfully!")
          setBody('')
          setMedia('')
          history.push('/')
        }
        await dispatch(thunkGetChirps())
      }

      if (res && res.errors === undefined) setMediaLoading(false)
      else{
        errorsArr.push(res.errors)
        setMediaLoading(false)
      }

      if(errorsArr.length) {
        setErrors(errorsArr)
      }
      // return res
    }else{
        // const addChirp = async (e) => {
  //   e.preventDefault();
    const chirp = {
      body,
      media,
      userId: sessionUser.id
    }
    setMediaLoading(false)
    await dispatch(thunkAddChirp(chirp))
    await setBody('')
  // }
    }

  }

  const updateImage = (e) => {
    const file = e.target.files[0];
    const error = [];
    if(file.name.includes('.png') || file.name.includes('.jpg') || file.name.includes('jpeg') || file.name.includes('.gif')){
      setMedia(file)
    }else{
      setErrors(error)
    }
  }

  //giphy search




  return(
    <>
      <form id='add-chirp-form' onSubmit={addChirp}>
      {errors.length > 0 && <div className='chirp_form_errors'>
                    {errors.map((error, ind) => (
                        <div key={ind} className='chirp_form_error'>{error}</div>
                    ))}
                </div> }
        <img id="add-chirp-profile-pic" src={sessionUser.profile_pic ? sessionUser.profile_pic : "https://as1.ftcdn.net/jpg/03/46/83/96/240_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"} alt=''/>
        <div id="chirp-input-button-contatiner">
          <textarea id="splash-chirp-input"
          type="text"
          placeholder="What's Chirpin'?"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          />
          <div id="add-media-button-container">
            <input id='add-chirp-media-button' type='image' src={AddPhotoIcon} onClick={(e) => handleClick(e)} />
              <input
                ref={hiddenFileInput}
                style={{ display: 'none' }}
                id="add-chirp-image"
                type='file'
                accept='image/*'
                onChange={updateImage}
                />
              </div>
              <p id="image-to-upload">{media.name}</p>
              {(mediaLoading) &&<img id="img-upload-spinner"src='https://i.gifer.com/ZZ5H.gif' alt='Uploading' className='uploading_img'></img>}
              <GiphyModal />
        </div>
          {body.length === 0 ? <p id="chirp-counter-zero">Chirps must be at least 1 character. {body.length}/300</p> :
          body.length > 0 & body.length <= 290 ? <p id="chirp-counter">{body.length}/300</p> :
          body.length <= 300 ? <p id="chirp-counter-close-to-limit">{body.length}/300</p> :
          <p id="chirp-counter-over-limit">Chirp Must Be 300 Characters Or Less. {body.length}/300</p>}
          {body.length <= 300 & body.length > 0 ? <button id='add-chirp-button' type="submit">Chirp</button> :
          <button id="add-chirp-button-disabled" type="button">Chirp</button>}
      </form>
    </>
  )

}
