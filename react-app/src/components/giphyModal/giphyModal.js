import {useState} from 'react';
import {Modal, modal} from '../../context/Modal';
import AddGiphyGif from './index';
import GifIcon from '../assets/add_gif_icon.png';

export default function GiphyModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button type='button' id='add-giphy-button' onClick={() => setShowModal(true)}>
        <img id='add-giphy-image' src={GifIcon} alt='gif'/>
        </button>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <AddGiphyGif setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  )
}
