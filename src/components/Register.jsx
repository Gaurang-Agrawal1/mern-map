import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../utils.js"

function Register() {
  const navigateTo = useNavigate();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${server}/user/register`, formData, { withCredentials: true });
      console.log("User registered successfully", response.data);
      setLoading(false);
      navigateTo("/login");
    } catch (error) {
      setLoading(false);
      console.error("Error registering user", error);
      if (error?.response?.data) {
        setErrorMessage(error?.response?.data?.message);
      } else
        setErrorMessage("Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      {loading ? (
        <div className="relative">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500"></div>
            <span className="absolute text-xl text-white">Loading...</span>
          </div>
        </div>
      ) : (
        <section className="w-full max-w-md">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-8">
            <h2 className="text-center text-2xl font-bold text-white mb-4">Sign up to create an account</h2>
            <p className="text-center text-gray-400 mb-6">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-400 hover:underline"
              >
                Log In
              </Link>
            </p>
            {errorMessage && <p className="text-center text-red-600 mb-6">{errorMessage}</p>}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  className="w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter Your Full Name"
                  required
                />
              </div>
              <div>
                <input
                  className="w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your Email"
                  required
                />
              </div>
              <div>
                <input
                  className="w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your Password"
                  required
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Create Account <ArrowRight className="ml-2" size={16} />
                </button>
              </div>
            </form>
          </div>
        </section>
      )}
    </div>
  );
}

export default Register;
