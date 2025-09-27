// client/src/components/Profile.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = ({ userId }) => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`/api/profile/${userId}`);
        setProfile(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, [userId]);

  if (!profile) return <p>Loading profile...</p>;

  return (
    <div>
      <h2>{profile.name}</h2>
      <p>Age: {profile.age}</p>
      <p>Gender: {profile.gender}</p>
      <p>Location: {profile.location}</p>
      <p>Religion: {profile.religion}</p>
      <p>Profession: {profile.profession}</p>
      {/* You can add hobbies, education, etc. here */}
    </div>
  );
};

export default Profile;
