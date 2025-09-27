import { useState } from "react";
import axios from "axios";

export default function UploadPicture({ token }) {
  const [file, setFile] = useState(null);
  const [visibility, setVisibility] = useState("private");

  const handleUpload = async () => {
    if (!file) return alert("Select a file first");

    const formData = new FormData();
    formData.append("picture", file);
    formData.append("visibility", visibility);

    try {
      const res = await axios.post(
        "http://localhost:4000/api/profile/pictures",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Uploaded!");
      console.log(res.data);
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <select
        value={visibility}
        onChange={(e) => setVisibility(e.target.value)}
      >
        <option value="public">Public</option>
        <option value="private">Private</option>
        <option value="connections">Connections</option>
      </select>
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}
