import React, { useEffect, useState } from 'react';
import API from '../api';

const Profile = () => {
  const [user, setUser] = useState({});
  const [bio, setBio] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    API.get('/profile').then(res => {
      setUser(res.data);
      setBio(res.data.bio || '');
    });
  }, []);

  const handleUpdate = async () => {
    await API.put('/profile', { bio });
    alert("Profile updated");
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('profilePicture', file);
    const res = await API.post('/profile/upload', formData);
    setUser(res.data);
  };

  return (
    <div>
      <h2>Welcome, {user.name}</h2>
      <img src={user.profilePictureUrl} alt="Profile" width="150" />
      <p>Email: {user.email}</p>
      <input value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Bio" />
      <button onClick={handleUpdate}>Update Bio</button>
      <br /><br />
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload Picture</button>
    </div>
  );
};

export default Profile;
