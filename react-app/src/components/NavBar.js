import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';

import birdLogo from './assets/birdLogo.png'
import birdHouse from './assets/chipper-home.png'

const NavBar = () => {
  const dispatch = useDispatch();

  const sessionUser = useSelector(state => state.session.user)



  return (
    <>
    <nav>
      <ul id='side-bar-user-info-container'>
        <li id='nav-home-logo-container'>
          <NavLink to='/' exact={true} activeClassName='active'>
            <img id='nav-home-logo' src={birdLogo} alt="Home"/>
          </NavLink>
        </li>
        <li id='nav-home-birdhouse-container'>
          <NavLink to='/' exact={true} activeClassName='active'>
            <img id='nav-home-birdhouse' src={birdHouse} alt="Home"/>
            <span id='nav-home-birdhouse-words'>Home</span>
          </NavLink>
        </li>
          <img id='navbar-profile-pic' src={sessionUser.profile_pic ? sessionUser.profile_pic : "https://as1.ftcdn.net/jpg/03/46/83/96/240_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"} alt={sessionUser.username}/>
            <li>
              <NavLink to='/users' exact={true} activeClassName='active'>
                Users
              </NavLink>
            </li>
            <li>
              <LogoutButton />
            </li>
      </ul>
    </nav>
    </>
  );
}

export default NavBar;
