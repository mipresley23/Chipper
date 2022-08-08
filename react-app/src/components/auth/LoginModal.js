import { useState } from "react";
import { Modal } from "../../context/Modal";
import LoginForm from "./LoginForm";

export default function LoginModal() {
  const [showModal, setShowModal] = useState(false);

  return(
    <>
      <button id="login-button" onClick={() => setShowModal(true)}>
                  Login
              </button>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm setShowModal= {setShowModal}/>
        </Modal>
      )}
    </>
  )
}
