import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useParams } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';

import birdLogo from './assets/birdLogo.png'
import birdHouse from './assets/chipper-home.png'
import birdHouseDark from './assets/chipper-home-dark.png'

const NavBar = ({params}) => {
  const dispatch = useDispatch();



  const sessionUser = useSelector(state => state.session.user)
  if (!sessionUser) return null
  return (
    <>
    <nav>
        <NavLink to='/' exact={true} activeClassName='active'>
          <div id='nav-home-logo-container'>
              <img id='nav-home-logo' src={birdLogo} alt="Home"/>
          </div>
        </NavLink>
      <div id='side-bar-user-info-container'>
        <NavLink to='/' exact={true} activeClassName='active'>
          <div className='navbar-containers' id='nav-home-birdhouse-container'>
              <img className='navbar-icons' id='nav-home-birdhouse' src={params ? birdHouse : birdHouseDark} alt="Home"/>
              <span className='navbar-labels' id='nav-home-birdhouse-words'>Home</span>
          </div>
        </NavLink>
        <a href='https://github.com/mipresley23' target="_blank" rel="noopener noreferrer">
          <div className='navbar-containers' id='mp-github-links'>
            <img className='navbar-icons' src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" />
            <span id='mp-github-label' className='navbar-labels'>Michael Presley</span>
          </div>
        </a>
        <a href='https://www.linkedin.com/in/michael-presley-96729b235/' target="_blank" rel="noopener noreferrer">
          <div className='navbar-containers' id='mp-linked-in'>
            <img className='navbar-icons' src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-plain-wordmark.svg" />
            <span id='mp-linkedin-label' className='navbar-labels'>Michael Presley</span>
          </div>
        </a>
            {/* <li>
              <NavLink to='/users' exact={true} activeClassName='active'>
              Users
              </NavLink>
            </li> */}
            <div id='navbar-user-logout-container'>
            <NavLink to={`/users/${sessionUser.id}`} activeClassName='active'>
              <div className='navbar-containers' id='navbar-current-user'>
                  <img className='navbar-icons' id='navbar-profile-pic' src={sessionUser.profile_pic ? sessionUser.profile_pic : "https://as1.ftcdn.net/jpg/03/46/83/96/240_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"} alt={sessionUser.username}/>
                  <ul id='navbar-user-names'>
                  <span id='navbar-username-label' className='navbar-labels'>{sessionUser.name}</span>
                  <span id='navbar-user-username-label' className='navbar-labels'>{sessionUser.username}</span>
                  </ul>
              </div>
            </NavLink>
              <LogoutButton />
            </div>
      </div>
    </nav>
    </>
  );
}

export default NavBar;
