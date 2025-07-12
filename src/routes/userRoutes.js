const express = require('express');
const { loginUser, registerUser, getAllUsers, getUserById, verifyToken } = require('../controllers/userControllers');

const router = express.Router();

// Public routes
router.post('/login', loginUser);
router.post('/register', registerUser);

// Protected routes - require JWT authentication
router.get('/getall', verifyToken, getAllUsers);
router.get('/:id', verifyToken, getUserById);

// Add a route to verify token (useful for frontend authentication checks)
router.get('/verify/token', verifyToken, (req, res) => {
    res.status(200).send({ valid: true, userId: req.userId });
});

module.exports = router;
