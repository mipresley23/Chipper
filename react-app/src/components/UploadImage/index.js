import React, {useState, useEffect, useRef} from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { thunkAddImage, thunkGetImages } from "../../store/image";


const UploadPicture = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const hiddenFileInput = useRef(null);

    const [images, setImages] = useState([]);
    const [uploadedImage, setUploadedImage] = useState(null)

    const imageSelector = useSelector(state => state.images)
    const sessionUser = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(thunkGetImages())
    }, [dispatch])

    useEffect(() => {
        setImages(Object.values(imageSelector))
    }, [imageSelector])

    const [imageLoading, setImageLoading] = useState(false);

    const handleClick = e => {
        e.preventDefault();
        hiddenFileInput.current.click();
      };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", uploadedImage);

        setImageLoading(true);

        const res = await fetch('/api/images/', {
            method: "POST",
            body: formData,
        });
        if (res.ok) {
            const resJson = await res.json();
            setImageLoading(false);

            const image = {
                image_url: resJson.url,
                userId: sessionUser.id,
                chirpId: null
            };

            await dispatch(thunkAddImage(image))

        }
        else {
            setImageLoading(false);
        }
    }

    const updateImage = (e) => {
        e.preventDefault()
        const file = e.target.files[0];
        setUploadedImage(file);
    }

    return (
        <>
            <h1>Images</h1>
            <div>
                <form onSubmit={handleSubmit}>
                    <input
                        type="file"
                        accept="image/*"
                        ref={hiddenFileInput}
                        onChange={(e) => setUploadedImage(e.target.files[0])}
                        />
                        <button onClick={(e)=> handleClick(e)}>
                            Upload Image
                        </button>
                        <button type="submit">Add Image</button>
                </form>
            </div>
            {
                images && images.map(image => (
                    <img src={image.image_url} alt=''/>
                ))
            }
        </>
    )
}

export default UploadPicture;
