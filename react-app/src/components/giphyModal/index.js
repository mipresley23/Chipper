import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkAddChirp } from '../../store/chirp';
import xImage from '../assets/chipperXimage.png';
import noImage from '../assets/no-image-avail.png'
import { GiphyFetch } from '@giphy/js-fetch-api'
import './giphyModal.css';


export default function AddGiphyGif({setShowModal}) {
  const dispatch = useDispatch();

  const [gifs, setGifs] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [media, setMedia] = useState('');

  const sessionUser = useSelector(state => state.session.user)

  const gf = new GiphyFetch('OaLIybGsjwTZxeR15yEqMpAAIUQQmkg2');

  const getGifs = async () => {
    const { data: gifs } = await gf.search(searchTerm, { sort: 'relevant', lang: 'es', limit: 16, type: 'gifs' })
    setGifs(gifs)
  }
  console.log('modal gifs: ', gifs)

  const addGifChirp = async(e) => {
    e.preventDefault();

    const chirp = {
      media: e.target.value,
      userId: sessionUser.id
    }
    await dispatch(thunkAddChirp(chirp))
    setShowModal(false)
  }

  const handleSearchGifs = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value)
    getGifs()
  }


return (
  <>
    <h3>Add Gif</h3>
      <input id='gif-search-field'
             type='text'
             onChange={handleSearchGifs}
      />
    <div id='gif-container'>
    {
      gifs && gifs.map(gif => (
        <>
          <input type='image' id='each-gif-image' onClick={addGifChirp} value={gif.images.original.url ? gif.images.original.url : null} src={gif.images.original.url ? gif.images.original.url : noImage} alt=''/>
        </>
      ))
    }
    </div>
  </>
)


}
