import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import { demoLogin } from '../../store/session';
import SignupModal from './SignupModal';

const LoginForm = ({setShowModal}) => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSignup, setShowSignup] = useState(false);
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleDemo = () => {
    dispatch(demoLogin())
  }

  if (user) {
    return <Redirect to='/' />;
  }

  return (
  <>
    <button className='modal-cancel-buttons' id='login-cancel-button' onClick={() => setShowModal(false)}>x</button>
    <form className='modal-forms' onSubmit={onLogin}>
      <div>
        {errors.map((error, ind) => (
          <div className='modal-errors' key={ind}>{error}</div>
          ))}
      </div>
        <div className='form-header-input-containers'>
          <h2 className='modal-form-headers'>Login to Chipper</h2>
          <div>
            <label className='modal-labels required' htmlFor='email'>Email</label>
            <input
              name='email'
              type='text'
              placeholder='Email'
              value={email}
              onChange={updateEmail}
              />
          </div>
          <div>
            <label className='modal-labels required' htmlFor='password'>Password</label>
            <input
              name='password'
              type='password'
              placeholder='Password'
              value={password}
              onChange={updatePassword}
              />
          </div>
          <div>
            <button className='modal-form-submit-buttons' type='submit'>Login</button>
            <p>-------or-------</p>
            <button className='modal-form-submit-buttons' type='button' onClick={handleDemo}>Demo</button>
          </div>
          {/* <div id='login-modal-signup-container'>
            <h4>Don't have an account?</h4>
            <button id='login-modal-signup-button' type='button' onClick={() => setShowSignup(true)}>Sign Up</button>
          </div> */}
        </div>
    </form>
  </>
  );
};

export default LoginForm;
