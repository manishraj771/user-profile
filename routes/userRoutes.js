const express = require('express');
const User = require('../models/User');

const router = express.Router();
const { register, getProfile, updateProfile } = require('../controllers/userController');
const auth = require('../middleware/auth');
const { login } = require('../controllers/userController');
const { deleteProfile } = require('../controllers/userController');
const upload = require('../middleware/upload');





router.post('/register', register);
router.get('/profile', auth, getProfile);
router.put('/profile', auth, updateProfile);
router.post('/login', login);
router.delete('/profile', auth, deleteProfile);
router.post('/profile/upload', auth, upload.single('profilePicture'), async (req, res) => {
    try {
      const imageUrl = req.file.path;
      const user = await User.findByIdAndUpdate(
        req.user,
        { profilePictureUrl: imageUrl },
        { new: true }
      ).select('-password');
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: 'Upload failed', error: err.message });
    }
  });
  router.post('/refresh', async (req, res) => {
    const token = req.cookies.refreshToken;
    if (!token) return res.status(401).json({ message: 'No refresh token found' });
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const accessToken = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_ACCESS_EXPIRE
      });
      res.json({ accessToken });
    } catch (err) {
      res.status(403).json({ message: 'Invalid refresh token' });
    }
  });
  



module.exports = router;
