import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import { server } from '../utils.js';
import Map from './Map.jsx';

const Image = () => {
  const [image, setImage] = useState(null);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get(`${server}/image/getImage/${id}`)
      .then(response => {
        console.log(response.data);
        setImage(response.data);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        console.error('Error fetching image:', error);
      });
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="container mx-auto p-4">
        {image ? (
          <div className="flex flex-row space-x-4">
            <div className="w-1/2">
              <div className="flex flex-col items-center">
                <div className="relative overflow-hidden rounded-lg shadow-lg">
                  <img src={image.image} alt={image.desc} className="w-full h-64 object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4">
                    <h2 className="text-lg font-bold">{image.location}</h2>
                    <p className="text-sm">{image.desc}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-1/2">
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 shadow-lg">
                <h1 className="text-center text-4xl font-bold text-white mb-4">Map</h1>
                <div >
                  <Map lati={image.lat} lngi={image.lng}/>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="relative">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500"></div>
              <span className="absolute text-xl text-white">Loading...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Image;