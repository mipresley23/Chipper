import { useState } from "react";
import { EditModal } from "../../context/EditModal";
import EditComment from ".";

export default function EditCommentModal({comment}) {
  const [showModal, setShowModal] = useState(false);

  return(
    <>
      <button id="edit-comment-button" onClick={() => setShowModal(true)}>
                  Edit Comment
              </button>

      {showModal && (
        <EditModal onClose={() => setShowModal(false)}>
          <EditComment comment={comment} setShowModal= {setShowModal}/>
        </EditModal>
      )}
    </>
  )
}
