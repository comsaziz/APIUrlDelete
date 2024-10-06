import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Character() {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("Male");
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newCharacter = {
      name,
      gender,
      image,
    };

    axios
      .post(
        "https://66e803d4b17821a9d9daf73c.mockapi.io/photo/SignUp",
        newCharacter
      )
      .then((response) => {
        console.log("Character added:", response.data);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error adding character", error);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-300 via-purple-200 to-pink-300 p-7 ">
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-none">
        <h2 className="text-2xl font-bold mb-4">Add New Character</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Character</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Enter character "
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">
             Gender
            </label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">
               Image 
            </label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
              placeholder="image URL"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-200 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Character;
