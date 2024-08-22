const express = require('express');
const { loginUser, registerUser, getAllUsers } = require('../controllers/userControllers');

const router = express.Router();

router.post('/login', loginUser);
router.post('/register', registerUser);
router.get('/getall', getAllUsers);

module.exports = router;
