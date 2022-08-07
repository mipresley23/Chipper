import { useState } from "react";
import { Modal } from "../../context/Modal";
import SignUpForm from "./SignUpForm";

export default function SignupModal() {
  const [showModal, setShowModal] = useState(false);

  return(
    <>
      <button id="signup-button" onClick={() => setShowModal(true)}>Sign Up</button>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignUpForm setShowModal= {setShowModal}/>
        </Modal>
      )}
    </>
  )
}
