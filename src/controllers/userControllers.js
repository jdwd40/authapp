const { User } = require('../models');
const jwt = require('jsonwebtoken');

// JWT Secret key - should be in environment variables in production
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';

// Generate JWT token
const generateToken = (user) => {
    return jwt.sign(
        { 
            id: user.id, 
            username: user.username,
            role: user.role,
            firstName: user.firstName,
            lastName: user.lastName
        },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
    );
};

// User login with JWT token generation
exports.loginUser = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username } });
        
        if (!user) {
            return res.status(401).send({ message: 'Invalid username or password' });
        }
        
        // Check if user account is active
        if (user.isActive === false) {
            return res.status(403).send({ message: 'Account is disabled. Please contact support.' });
        }
        
        const isPasswordValid = await user.validPassword(password);
        
        if (!isPasswordValid) {
            return res.status(401).send({ message: 'Invalid username or password' });
        }
        
        // Update last login time
        await user.update({ lastLoginAt: new Date() });
        
        // Generate JWT token
        const token = generateToken(user);
        
        // Return user info and token (exclude password)
        const userWithoutPassword = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            email: user.email,
            role: user.role,
            isActive: user.isActive,
            lastLoginAt: user.lastLoginAt,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        };
        
        res.status(200).send({ 
            user: userWithoutPassword,
            token
        });
    } catch (err) {
        next(err);
    }
};

// User registration with JWT token generation
exports.registerUser = async (req, res, next) => {
    try {
        const { firstName, lastName, username, password, email, role } = req.body;
        
        // Check if username already exists
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).send({ message: 'Username already exists' });
        }
        
        // Create new user
        const user = await User.create({
            firstName,
            lastName,
            username,
            password, // Password will be hashed by the model hook
            email,
            role: role || 'user', // Default to 'user' if not specified
            isActive: true,
            lastLoginAt: null
        });
        
        // Generate JWT token
        const token = generateToken(user);
        
        // Return user info and token (exclude password)
        const userWithoutPassword = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            email: user.email,
            role: user.role,
            isActive: user.isActive,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        };
        
        res.status(201).send({ 
            user: userWithoutPassword,
            token
        });
    } catch (err) {
        next(err);
    }
};

// Get all users (protected route)
exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ['password'] } // Exclude passwords from results
        });
        res.status(200).send({ users });
    } catch (err) {
        next(err);
    }
};

// Get user by ID (protected route)
exports.getUserById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id, {
            attributes: { exclude: ['password'] } // Exclude password
        });
        
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        
        res.status(200).send({ user });
    } catch (err) {
        next(err);
    }
};

// Verify token middleware
exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
        return res.status(401).send({ message: 'No token provided' });
    }
    
    // Format: Bearer <token>
    const token = authHeader.split(' ')[1];
    
    if (!token) {
        return res.status(401).send({ message: 'No token provided' });
    }
    
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch (err) {
        return res.status(401).send({ message: 'Invalid or expired token' });
    }
};