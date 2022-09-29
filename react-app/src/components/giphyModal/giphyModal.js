import {useState} from 'react';
import {Modal, modal} from '../../context/Modal';
import AddGiphyGif from './index';

export default function GiphyModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button type='button' id='add-giphy-button' onClick={() => setShowModal(true)}>Gif</button>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <AddGiphyGif setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  )
}
