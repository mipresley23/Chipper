import { useState } from "react";
import { EditModal } from "../../context/EditModal";
import EditChirp from ".";

export default function EditChirpModal() {
  const [showModal, setShowModal] = useState(false);

  return(
    <>
      <button id="edit-chirp-button" onClick={() => setShowModal(true)}>
                  Edit Chirp
              </button>

      {showModal && (
        <EditModal onClose={() => setShowModal(false)}>
          <EditChirp setShowModal= {setShowModal}/>
        </EditModal>
      )}
    </>
  )
}
