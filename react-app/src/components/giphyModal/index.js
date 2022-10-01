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
  const [trending, setTrending] = useState([])
  const [media, setMedia] = useState('');

  const sessionUser = useSelector(state => state.session.user)

  const gf = new GiphyFetch('OaLIybGsjwTZxeR15yEqMpAAIUQQmkg2');

  useEffect(async() => {
    const { data: gifs } = await gf.trending({ limit: 50, offset: 25, rating: 'g' })
      setTrending(gifs)
  }, [])


  const getGifs = async (search) => {
      if(search){
        const { data: gifs } = await gf.search(search, { sort: 'relevant', lang: 'es', limit: 50, type: 'gifs' })
        setGifs(gifs)
      }else{
        setGifs(trending)
      }
  }

  const addGifChirp = async(e) => {
    e.preventDefault();

    const chirp = {
      media: e.target.value,
      userId: sessionUser.id
    }
    await dispatch(thunkAddChirp(chirp))
    setShowModal(false)
  }

  useEffect(() => {
    getGifs(searchTerm ? searchTerm : '')
  }, [searchTerm])


return (
  <>
  <button className='modal-cancel-buttons' id='signup-cancel-button' onClick={() => setShowModal(false)}><img id='signup-back-button-image' src={xImage}/></button>
    <h3 id='add-gif-header'>Add Gif</h3>
      <input id='gif-search-field'
             type='text'
             placeholder='Search Giphy'
             onChange={(e) => setSearchTerm(e.target.value)}
      />
    <div id='gif-container'>
    {
      gifs.length ? gifs.map(gif => (
        <>
          <input type='image' id='each-gif-image' onClick={addGifChirp} value={gif.images.original.url ? gif.images.original.url : null} src={gif.images.original.url ? gif.images.original.url : noImage} alt=''/>
        </>
      )) :
      trending.map(gif => (
        <>
          <input type='image' id='each-gif-image' onClick={addGifChirp} value={gif.images.original.url ? gif.images.original.url : null} src={gif.images.original.url ? gif.images.original.url : noImage} alt=''/>
        </>))
    }
    </div>
  </>
)


}
