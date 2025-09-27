import React, { useState, useEffect } from "react";
import axios from "axios";

const SavedSearches = ({ applySearch }) => {
  const [savedSearches, setSavedSearches] = useState([]);
  const [name, setName] = useState("");
  const [filters, setFilters] = useState({
    ageMin: "",
    ageMax: "",
    profession: "",
    location: "",
    religion: "",
  });

  // Fetch saved searches
  const fetchSavedSearches = async () => {
    try {
      const { data } = await axios.get("/api/saved-search");
      setSavedSearches(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSavedSearches();
  }, []);

  const saveSearch = async () => {
    try {
      await axios.post("/api/saved-search", { name, filters });
      setName("");
      fetchSavedSearches();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteSearch = async (id) => {
    try {
      await axios.delete(`/api/saved-search/${id}`);
      fetchSavedSearches();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-4 border mt-4">
      <h3 className="font-bold mb-2">Saved Searches</h3>

      <input
        type="text"
        placeholder="Name for this search"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-1 mb-2 w-full"
      />
      <button
        onClick={saveSearch}
        className="bg-green-500 text-white px-2 py-1 rounded mb-4"
      >
        Save Current Search
      </button>

      <ul>
        {savedSearches.map((search) => (
          <li
            key={search._id}
            className="border p-2 mb-2 flex justify-between items-center"
          >
            <span
              className="cursor-pointer text-blue-600"
              onClick={() => applySearch(search.filters)}
            >
              {search.name}
            </span>
            <button
              onClick={() => deleteSearch(search._id)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SavedSearches;
