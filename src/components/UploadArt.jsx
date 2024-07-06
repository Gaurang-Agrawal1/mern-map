import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Map from "./Map.jsx";
import { server } from "../utils.js";
import Navbar from "./Navbar.jsx";

const UploadArt = () => {
  const navigateTo = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    desc: "",
    image: null,
    location: 'blank',
    lng: 'blank',
    lat: 'blank',
  });

  const handleInputChange = (event) => {
    const { name, value, files } = event.target;
    if (name === "image") {
      const file = files?.[0];
      setFormData({ ...formData, [name]: file });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });
      const response = await axios.post(`${server}/image/addImage`, formDataToSend, { withCredentials: true });
      console.log("Image uploaded successfully", response.data);
      setLoading(false);
      navigateTo("/home");
    } catch (error) {
      setLoading(false);
      console.error("Error uploading image", error);
      if (error?.response?.data) {
        setErrorMessage(error?.response?.data?.message);
      } else {
        setErrorMessage("Upload failed. Please try again.");
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="relative">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500"></div>
            <span className="absolute text-xl text-white">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-gray-900 p-4">
        <section className="w-full max-w-md mb-8 lg:mb-0 lg:mr-8">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 shadow-lg">
            <h2 className="text-center text-4xl font-bold text-white mb-4">Upload Art</h2>
            {errorMessage && (
              <p className="text-center text-red-500 mb-4">{errorMessage}</p>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  className="w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="text"
                  name="desc"
                  value={formData.desc}
                  onChange={handleInputChange}
                  placeholder="Enter image description"
                  required
                />
              </div>
              <div>
                <input
                  className="w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="file"
                  name="image"
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Upload Art <ArrowRight className="ml-2" size={16} />
                </button>
              </div>
            </form>
          </div>
        </section>

        <section className="w-full max-w-md lg:max-w-lg lg:flex-1">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 shadow-lg">
            <h1 className="text-center text-4xl font-bold text-white mb-4">Map</h1>
            {/* <div className="w-full h-64 bg-gray-700 rounded-md flex items-center justify-center text-white"> */}
            <div>
              <Map setFormData={setFormData} />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default UploadArt;