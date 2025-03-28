const express = require('express');
const router = express.Router();
const { register, getProfile, updateProfile } = require('../controllers/userController');
const auth = require('../middleware/auth');

router.post('/register', register);
router.get('/profile', auth, getProfile);
router.put('/profile', auth, updateProfile);

module.exports = router;
