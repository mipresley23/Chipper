import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';

import birdLogo from './assets/birdLogo.png'
import birdHouse from './assets/chipper-home.png'

const NavBar = () => {
  const dispatch = useDispatch();

  const sessionUser = useSelector(state => state.session.user)

  return (
    <>
    <nav>
        <div id='nav-home-logo-container'>
          <NavLink to='/' exact={true} activeClassName='active'>
            <img id='nav-home-logo' src={birdLogo} alt="Home"/>
          </NavLink>
        </div>
      <div id='side-bar-user-info-container'>
        <div className='navbar-containers' id='nav-home-birdhouse-container'>
          <NavLink to='/' exact={true} activeClassName='active'>
            <img className='navbar-icons' id='nav-home-birdhouse' src={birdHouse} alt="Home"/>
            <span className='navbar-labels' id='nav-home-birdhouse-words'>Home</span>
          </NavLink>
        </div>
        <div className='navbar-containers' id='mp-github-links'>
          <a href='https://github.com/mipresley23' target="_blank" rel="noopener noreferrer">
          <img className='navbar-icons' src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" />
          <span id='mp-github-label' className='navbar-labels'>Michael Presley</span>
          </a>
        </div>
        <div className='navbar-containers' id='mp-linked-in'>
          <a href='https://www.linkedin.com/in/michael-presley-96729b235/' target="_blank" rel="noopener noreferrer">
          <img className='navbar-icons' src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-plain-wordmark.svg" />
          <span id='mp-linkedin-label' className='navbar-labels'>Michael Presley</span>
          </a>
        </div>
            {/* <li>
              <NavLink to='/users' exact={true} activeClassName='active'>
              Users
              </NavLink>
            </li> */}
            <div id='navbar-user-logout-container'>
            <div id='navbar-current-user'>
              <img className='navbar-icons' id='navbar-profile-pic' src={sessionUser.profile_pic ? sessionUser.profile_pic : "https://as1.ftcdn.net/jpg/03/46/83/96/240_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"} alt={sessionUser.username}/>
              <span id='navbar-username-label' className='navbar-labels'>{sessionUser.username}</span>
            </div>
              <LogoutButton />
            </div>
      </div>
    </nav>
    </>
  );
}

export default NavBar;
