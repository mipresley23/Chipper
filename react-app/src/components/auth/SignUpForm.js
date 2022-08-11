import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

const SignUpForm = ({setShowModal}) => {
  const dispatch = useDispatch();

  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [profile_pic, setprofile_Pic] = useState("")
  const [showErrors, setShowErrors] = useState(false);

  const user = useSelector(state => state.session.user);

  const validateProfileImg = (url) => {
    let res = /(http[s]*:\/\/)([a-z\-_0-9\/.]+)\.([a-z.]{2,3})\/([a-z0-9\-_\/._~:?#\[\]@!$&'()*+,;=%]*)([a-z0-9]+\.)(jpg|jpeg)/i;
    return res.test(url)
  }

  useEffect(async() => {
    const errors = []
    if(username.length > 40) errors.push('Username must be 40 characters or less.')
    if(email.length > 255) errors.push('Email length must be 255 characters or less.')
    if(password.length > 255) errors.push('Password must be 255 characters or less.')
    if(profile_pic.length > 2000) errors.push('Profile Picture must be 2000 characters or less.')
    if(!username) errors.push('Username is required.')
    if(!email) errors.push('Email is required.')
    if(!password) errors.push('Password is required.')
    // if(profile_pic.length && !(validateProfileImg(profile_pic))) errors.push('Profile Image must be a jpg/jpeg')
    if(password !== repeatPassword) errors.push("Repeat Password and Password must match")

    setErrors(errors);
  }, [username, email, password, repeatPassword, profile_pic])

  const onSignUp = async (e) => {
    e.preventDefault();

    if (!errors.length) {
      const data = await dispatch(signUp(username, email, password, profile_pic));
      if (data) {
        setErrors(data)
      }
    }
  };

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

  const updateProfilePic = (e) => {
    setprofile_Pic(e.target.value);
  }

  if (user) {
    return <Redirect to='/' />;
  }

  return (
  <>
  <button className='modal-cancel-buttons' id='signup-cancel-button' onClick={() => setShowModal(false)}>x</button>
    <form className='modal-forms' id='signup-form' onSubmit={onSignUp}>
      <div className='modal-error-container'>
        {showErrors && errors.map((error, ind) => (
          <div className='modal-errors' id='signup-form-errors' key={ind}>{error.slice(error.indexOf(':')+ 1)}</div>
          ))}
      </div>
      <div className='form-header-input-containers'>
        <h2 className='modal-form-headers' id='signup-form-header'>Create Your Account</h2>
        <div id='signup-username'>
          <label className='modal-labels required'>User Name</label>
          <input
            type='text'
            name='username'
            onChange={updateUsername}
            value={username}
            ></input>
        </div>
        <div id='signup-email'>
          <label className='modal-labels required'>Email</label>
          <input
            type='text'
            name='email'
            onChange={updateEmail}
            value={email}
            ></input>
        </div>
        <div id='signup-profilepic'>
          <label className='modal-labels'>Profile Picture</label>
          <input
            type='text'
            name='profilePic'
            onChange={updateProfilePic}
            value={profile_pic}
            ></input>
        </div>
        <div id='signup-password'>
          <label className='modal-labels required'>Password</label>
          <input
            type='password'
            name='password'
            onChange={updatePassword}
            value={password}
            ></input>
        </div>
        <div id='signup-repeat-password'>
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
      </div>
    </form>
  </>
  );
};

export default SignUpForm;
