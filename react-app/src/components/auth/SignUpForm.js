import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import backArrow from '../assets/back-arrow.png';
import xImage from '../assets/chipperXimage.png';

const SignUpForm = ({setShowModal}) => {
  const dispatch = useDispatch();

  const hiddenFileInput1 = useRef(null);
  const hiddenFileInput2 = useRef(null);

  const [errors, setErrors] = useState([]);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [profile_pic, setprofile_Pic] = useState("")
  const [cover_photo, setCover_Photo] = useState("");
  const [bio, setBio] = useState('');
  const [showErrors, setShowErrors] = useState(false);
  const [stepTwo, setStepTwo] = useState(false);
  const [stepThree, setStepThree] = useState(false);

  const user = useSelector(state => state.session.user);

  const handleClickProfile = (e) => {
    e.preventDefault();
    hiddenFileInput1.current.click();
  };

  const handleClickCover = (e) => {
    e.preventDefault();
    hiddenFileInput2.current.click();
  }

  useEffect(async() => {
    const errors = []
    if(name.length > 50) errors.push("Name must be 50 characters or less.")
    if(username.length > 50) errors.push('Username must be 50 characters or less.')
    if(email.length > 255) errors.push('Email length must be 255 characters or less.')
    if(password.length < 6) errors.push('Password must be at least 6 characters.')
    if(password.length > 255) errors.push('Password must be 255 characters or less.')
    if(profile_pic.length > 2000) errors.push('Profile Picture must be 2000 characters or less.')
    if(cover_photo.length > 2000) errors.push('Cover Photo must be 2000 characters or less.')
    if(bio.length > 500) errors.push('Bio must be 500 characters or less.')
    if(!name) errors.push('Name is required')
    if(!username) errors.push('Username is required.')
    if(!email) errors.push('Email is required.')
    if(!password) errors.push('Password is required.')
    if(password !== repeatPassword) errors.push("Repeat Password and Password must match")

    setErrors(errors);
  }, [name, username, email, password, repeatPassword, profile_pic, cover_photo, bio])

  const onSignUp = async (e) => {
    e.preventDefault();

    const formData = new FormData()
    formData.append('profile_pic', profile_pic)
    formData.append('cover_photo', cover_photo)
    console.log('formData: ', formData)
    const res = await fetch('/api/auth/profileimage', {
      method: "POST",
      body: formData,
    });

    if(res.ok){
      const jsonRes = await res.json();
      const user ={
        name,
        username,
        email,
        password,
        profile_pic:jsonRes.profile_pic,
        cover_photo:jsonRes.cover_photo,
        bio
      }
      if (!errors.length) {
        await dispatch(signUp(user));
      }
    }

  };

  const updateImage = (e) => {
    const file = e.target.files[0];
    const error = [];
    if(file.name.includes('.png') || file.name.includes('.jpg') || file.name.includes('jpeg') || file.name.includes('.gif')){
      setprofile_Pic(file)
    }else{
      setErrors(error)
    }
  }

  // formData.append('cover_photo', cover_photo)
  // const res2 = await fetch('/api/auth/coverphoto', {
  //   method: "POST",
  //   body: formData,
  // });

  const updateCoverPhoto = (e) => {
    const file = e.target.files[0];
    const error = [];
    if(file.name.includes('.png') || file.name.includes('.jpg') || file.name.includes('jpeg') || file.name.includes('.gif')){
      setCover_Photo(file)
    }else{
      setErrors(error)
    }
  }

  console.log('profile pic: ', profile_pic)
  console.log('cover photo: ', cover_photo)

  const updateName = (e) => {
    setName(e.target.value);
  }

  const updateUsername = (e) => {
      setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const updateBio = (e) => {
    setBio(e.target.value);
  }

  const handleStepOne = (e) => {
    e.preventDefault()
    setStepTwo(false)
    setStepThree(false)
  }

  const handleStepTwo = (e) => {
    setStepTwo(true)
    setStepThree(false)
  }

  const handleStepThree = (e) => {
    setStepTwo(false);
    setStepThree(true);
  }

  if (user) {
    return <Redirect to='/' />;
  }

  return (
  <>
    {!stepTwo && !stepThree ? <button className='modal-cancel-buttons' id='signup-cancel-button' onClick={() => setShowModal(false)}><img id='signup-back-button-image' src={xImage}/></button> :
    stepTwo && !stepThree ? <button id='signup-back-button' onClick={handleStepOne}><img id='signup-back-button-image' src={backArrow} alt='back'/></button> :
    <button id='signup-back-button' onClick={handleStepTwo}><img id='signup-back-button-image' src={backArrow} alt='back'/></button>}
  {!stepTwo && !stepThree ? <h3 id='signup-step-header'>Step 1 of 3</h3> :
  stepTwo && !stepThree ? <h3 id='signup-step-header'>Step 2 of 3</h3> :
  <h3 id='signup-step-header'>Step 3 of 3</h3>}
    <form className='modal-forms' id='signup-form' onSubmit={onSignUp}>
      <div className='modal-error-container'>
        {showErrors && errors.map((error, ind) => (
          <div className='modal-errors' id='signup-form-errors' key={ind}>{error.slice(error.indexOf(':')+ 1)}</div>
          ))}
      </div>
      <div className='form-header-input-containers'>
        <h2 className='modal-form-headers' id='signup-form-header'>Create Your Account</h2>
        {!stepTwo && !stepThree && <div id='signup-step-one'>
            <div className='signup-label-inputs' id='signup-name'>
            <label className='modal-labels required'>Name</label>
            <input
              type='text'
              name='name'
              onChange={updateName}
              value={name}
              ></input>
          </div>
              <p id='name-input-counter'>{name.length}/50</p>
          <div className='signup-label-inputs' id='signup-username'>
            <div id='username-labels'>
              <label  className='modal-labels required'>User Name</label>
              <label id='username-at-label'>@ Required</label>
            </div>
            <input
              className='username-input'
              type='text'
              name='username'
              onChange={updateUsername}
              value={username}
              ></input>
          </div>
          <p id='username-input-counter'>{username.length}/50</p>
          <div className='signup-label-inputs' id='signup-email'>
            <label className='modal-labels required'>Email</label>
            <input
              type='text'
              name='email'
              onChange={updateEmail}
              value={email}
              ></input>
          </div>
          {email.length > 200 && <p id='signup-email-counter'>{email.length}/255</p>}
          <button id='signup-step-two-button' className='modal-form-submit-buttons' onClick={handleStepTwo}>Next</button>
        </div>}
        {stepTwo && <div id='signup-step-two'>
          <div className='signup-label-inputs' id='signup-bio'>
            <div id='signup-bio-labels'>
              <label className='modal-labels'>Bio</label>
              <label className='modal-labels'>Tell Us About You!</label>
            </div>
            <textarea
                name='bio'
                onChange={updateBio}
                value={bio}
                />
            <p id='signup-bio-counter'>{bio.length}/500</p>
          </div>
          <button id='signup-step-three-button' className='modal-form-submit-buttons' onClick={handleStepThree}>Next</button>
        </div>}
        {stepThree && <div id='signup-step-three'>
            <div className='signup-label-inputs' id='signup-profilepic'>
            <label className='modal-labels'>Profile Picture</label>
            <button id='signup-profilepic-button' type='button' onClick={(e) => handleClickProfile(e)}>Choose Profile Picture</button>
            <input
              ref={hiddenFileInput1}
              style={{display: 'none'}}
              id='signup-profile-pic-input'
              type='file'
              accept='image/*'
              name='profilePic'
              onChange={updateImage}
              ></input>
              <p id='profile-image-to-upload'>{profile_pic.name}</p>
          </div>
            <div className='signup-label-inputs' id='signup-profilepic'>
            <label className='modal-labels'>Cover Photo</label>
            <button id='signup-profilepic-button' type='button' onClick={(e) => handleClickCover(e)}>Choose Cover Photo</button>
            <input
              ref={hiddenFileInput2}
              style={{display: 'none'}}
              id='signup-profile-pic-input'
              type='file'
              accept='image/*'
              name='cover_photo'
              onChange={updateCoverPhoto}
              ></input>
              <p id='cover-photo-to-upload'>{cover_photo.name}</p>
          </div>
          <div className='signup-label-inputs' id='signup-password'>
          <label className='modal-labels required'>Password</label>
          <input
            type='password'
            name='password'
            onChange={updatePassword}
            value={password}
            ></input>
          </div>
          {password.length > 200 && <p id='signup-password-counter'>{password.length}/255</p>}
          <div className='signup-label-inputs' id='signup-repeat-password'>
            <label className='modal-labels required'>Repeat Password</label>
            <input
              type='password'
              name='repeat_password'
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
              ></input>
          </div>
          <button className='modal-form-submit-buttons' id='signup-form-button' type='submit' onClick={() => setShowErrors(true)}>Sign Up</button>
        </div>}
      </div>
    </form>
  </>
  );
};

export default SignUpForm;
