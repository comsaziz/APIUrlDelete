import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function Update() {
  const { id } = useParams(); 
  const [character, setCharacter] = useState({ name: "", image: "" });
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://66e803d4b17821a9d9daf73c.mockapi.io/photo/SignUp/${id}`)
      .then((response) => {
        setCharacter(response.data);
      })
      .catch((error) => {
        console.error("Error fetching the character data", error);
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCharacter({ ...character, [name]: value });
  };

  const handleUpdate = () => {
    axios
      .put(
        `https://66e803d4b17821a9d9daf73c.mockapi.io/photo/SignUp/${id}`,
        character
      )
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Error updating the character", error);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-300 via-purple-200 to-pink-300 p-7">
      <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-purple-600">
          Update Character
        </h2>

        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={character.name}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Image URL</label>
          <input
            type="text"
            name="image"
            value={character.image}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <button
          onClick={handleUpdate}
          className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-600 transition"
        >
          Update Character
        </button>
      </div>
    </div>
  );
}

export default Update;
