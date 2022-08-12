import { useState } from "react";
import { Modal } from "../../context/Modal";
import EditUserForm from "./editUserForm";

export default function EditUserModal({user}) {
  const [showModal, setShowModal] = useState(false);

  return(
    <>
      <button id="edit-user-button" onClick={() => setShowModal(true)}>Edit Profile</button>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditUserForm user={user} setShowModal= {setShowModal}/>
        </Modal>
      )}
    </>
  )
}
