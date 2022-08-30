const GET_IMAGES = 'images/GET_IMAGES';
const ADD_IMAGE = 'images/ADD_IMAGE';


const actionGetImages = (images) => {
  return {
    type: GET_IMAGES,
    images
  }
}

const actionAddImage = (image) => {
  return {
    type: ADD_IMAGE,
    image
  }
}

export const thunkGetImages = (images) => async(dispatch) => {
  const res = await fetch('/api/images/');
  const images = await res.json();
  dispatch(actionGetImages(images))
  return res;
}

export const thunkAddImage = (image) => async(dispatch) => {
  console.log('thunkImage: ', image)
  const res = await fetch('/api/images/', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(image)
  });
  console.log('add image thunk res: ', res)
  if(res.ok) {
    const image = await res.json();
    dispatch(actionAddImage(image));
    return "Image Uploaded";
  }

}

const imageReducer = (state = {}, action) => {
  const newState = { ...state };
  switch (action.type) {
    case GET_IMAGES:
      action.images.forEach((image) => {
        newState[image.id] = image;
      })
      return newState;

    case ADD_IMAGE:
      newState[action.image.id] = action.image;
      return newState;

    default:
      return state;
  }
}

export default imageReducer;
