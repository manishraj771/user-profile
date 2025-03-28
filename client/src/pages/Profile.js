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
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow space-y-4">
      <h2 className="text-2xl font-bold">Welcome, {user.name}</h2>
      {user.profilePictureUrl && <img src={user.profilePictureUrl} alt="Profile" className="w-32 h-32 rounded-full" />}
      <p><strong>Email:</strong> {user.email}</p>
      <input value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Bio" className="w-full border px-4 py-2 rounded" />
      <button onClick={handleUpdate} className="bg-blue-600 text-white px-4 py-2 rounded w-full">Update Bio</button>

      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload} className="bg-purple-600 text-white px-4 py-2 rounded w-full">Upload Picture</button>
    </div>
  );
};

export default Profile;
