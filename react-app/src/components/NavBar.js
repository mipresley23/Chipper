import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { demoLogin } from '../store/session';

const NavBar = () => {
  const dispatch = useDispatch();

  const sessionUser = useSelector(state => state.session.user)

  const handleDemo = () => {
    dispatch(demoLogin())
  }

  return (
    <nav>
      <ul id='side-bar-user-info-container'>
        <li>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </li>
        {!sessionUser && (
          <>
            <li>
              <NavLink to='/login' exact={true} activeClassName='active'>
                Login
              </NavLink>
            </li>
            <li>
              <NavLink to='/sign-up' exact={true} activeClassName='active'>
                Sign Up
              </NavLink>
            </li>
            <button id='demo-button' type='button' onClick={handleDemo}>Demo</button>
          </>
        )}
        {sessionUser &&
          <>
          <img id='navbar-profile-pic' src={sessionUser.profile_pic} alt={sessionUser.username}/>
            <li>
              <NavLink to='/users' exact={true} activeClassName='active'>
                Users
              </NavLink>
            </li>
            <li>
              <LogoutButton />
            </li>
          </>}
      </ul>
    </nav>
  );
}

export default NavBar;
