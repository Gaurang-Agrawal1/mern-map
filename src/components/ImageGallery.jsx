import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ThumbsUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { server } from '../utils';

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/image/${id}`);
    console.log("Navigating to: ${server}/image/${id}");
  }

  const getImages = () => {
    axios.get(`${server}/image/getAllImages`)
      .then(response => {
        console.log(response.data);
        setImages(response.data);
      })
      .catch(error => {
        console.error('Error fetching images:', error);
      });
  }
  useEffect(() => {
    getImages();
  }, []);

  const handleLike = (id) => {
    axios
      .get(`${server}/image/like/${id}`)
      .then(res => getImages())
      .catch(err => console.error(err));
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {images.map((image) => (
        <div
          key={image._id}
          className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer group"

        >
          <img
            src={image.image}
            className="w-full h-64 object-cover transition-transform duration-300 transform group-hover:scale-105"
            onClick={() => handleClick(image._id)} />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <h1 className="text-lg font-bold">{image.location}</h1>
            <p className="flex items-center">
              <ThumbsUp className="mr-2 color-red" onClick={() => handleLike(image._id)} /> {image.likes}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;