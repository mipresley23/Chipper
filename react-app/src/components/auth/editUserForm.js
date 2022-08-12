import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { thunkEditUser } from '../../store/session';


export default function EditUserForm({user, setShowModal}) {

  const dispatch = useDispatch();

  const [userId, setUserId] = useState(user?.id)
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState(user?.username);
  const [email, setEmail] = useState(user?.email);
  const [password, setPassword] = useState(user?.password);
  const [profile_pic, setprofile_Pic] = useState(user?.profile_pic)
  const [showErrors, setShowErrors] = useState(false);


  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateProfilePic = (e) => {
    setprofile_Pic(e.target.value);
  }

  const editUser = async (e) => {
    e.preventDefault();
    if(!errors.length){
      const data = await dispatch(thunkEditUser(userId, username, profile_pic))
      if (data) {
        setErrors(data)
      }
    }
  }

  return(
    <>
       <button className='modal-cancel-buttons' id='edit-profile-cancel-button' onClick={() => setShowModal(false)}>x</button>
       <form className='modal-forms' id='edit-user-form' onSubmit={editUser}>
        <div id='edit-user-username'>
          <label className='modal labels'>User Name</label>
          <input id='edit-username-input'
                  type='text'
                  name='username'
                  value={username}
                  onChange={updateUsername}
                  />
        </div>
        <div id='edit-user-profilepic'>
        <label className='modal-labels'>Profile Picture</label>
        <input id='edit-profile-pic-input'
                type='text'
                name='profilePic'
                value={profile_pic}
                onChange={updateProfilePic}
                />
        </div>
        <button className='modal-form-submit-buttons' id='edit-user-form-button' type='submit' onClick={() => setShowErrors(true)}>Edit Profile</button>

       </form>
    </>
  )

}
