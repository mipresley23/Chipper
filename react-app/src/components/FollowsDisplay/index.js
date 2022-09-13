import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { thunkGetUsers } from "../../store/users";

export default function Following({user}) {

  const dispatch = useDispatch()



  return(
    <>
      <div>
        <h2>Following</h2>
      </div>
    </>
  )
}
