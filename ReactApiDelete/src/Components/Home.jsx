import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
  const [photos, setPhotos] = useState([]);
  const [alert, setAlert] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [search, setSearch] = useState("");
  const navigate = useNavigate(); 

  useEffect(() => {
    axios
      .get("https://66e803d4b17821a9d9daf73c.mockapi.io/photo/SignUp")
      .then((response) => {
        setPhotos(response.data);
      })
      .catch((error) => {
        console.error("Error fetching the data", error);
      });
  }, []);

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setAlert(true);
  };

  const confirmDelete = () => {
    axios
      .delete(
        `https://66e803d4b17821a9d9daf73c.mockapi.io/photo/SignUp/${selectedId}`
      )
      .then(() => {
        setPhotos(photos.filter((photo) => photo.id !== selectedId));
        setAlert(false);
      })
      .catch((error) => {
        console.error("Error deleting the character", error);
      });
  };

  const cancelDelete = () => {
    setAlert(false);
  };

  const filteredPhotos = photos.filter((photo) =>
    photo.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-300 via-purple-200 to-pink-300 p-7">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="p-2 rounded-lg w-full border border-gray-300"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid lg:grid-cols-3 grid-cols-1 gap-6">
        {filteredPhotos.length > 0 ? (
          filteredPhotos.map((task) => (
            <div
              key={task.id}
              className="p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={task.image}
                alt={`Image ${task.id}`}
                className="w-40 h-auto object-cover mx-auto rounded-lg"
              />
              <p className="mt-4 text-center text-lg font-semibold text-gray-700">
                {task.name}
              </p>
              <p className="mt-4 text-center text-lg font-semibold text-gray-700">
                {task.gender}
              </p>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleDeleteClick(task.id)}
                  className="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  Delete
                </button>
                <button
                  onClick={() => navigate(`/update/${task.id}`)}
                  className="py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-600 transition"
                >
                  Update
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-4 text-center text-lg text-red-600">
            No characters found.
          </div>
        )}
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={() => navigate("/character")} 
          className="py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-200 transition"
        >
          Add New Character
        </button>
      </div>

      {alert && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4 text-center text-purple-600">
              Are you sure?
            </h2>
            <p className="mb-6 text-gray-700 text-center">
              Do you really want to delete this character? This action cannot be
              undone.
            </p>
            <div className="flex justify-between">
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Confirm
              </button>
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
