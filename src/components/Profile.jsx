import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { server } from '../utils';
import axios from 'axios';

const Profile = () => {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${server}/user/getInfo`, { withCredentials: true });
        console.log("user info", res.data);
        setAuthUser(res.data.user);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  const pictures = authUser?.pictures || [];

  return (
    <>
      <Navbar />
      {loading ? (
        <div className="relative">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500"></div>
            <span className="absolute text-xl text-white">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="max-w-md mx-auto rounded-xl shadow-md overflow-hidden md:max-w-2xl">
          <div className="p-4 bg-white">
            <h2 className="text-2xl font-bold text-gray-600">Name: {authUser?.fullName}</h2>
            <p className="text-gray-600">Email: {authUser?.email}</p>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-2 gap-4">
              {pictures.length > 0 ? (
                pictures.map((picture) => (
                  <img key={picture._id} src={picture.image} className="rounded-lg" alt="User Art" />
                ))
              ) : (
                <h1 className="text-white">Please upload art</h1>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
