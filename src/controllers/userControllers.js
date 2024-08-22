const {
    selectUserByUsername,
    createUser, selectAllUsers
  } = require('../models/userModels');

exports.loginUser = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await selectUserByUsername(username, password);
        res.status(200).send({ user });
    } catch (err) {
        next(err);
    }
}

exports.registerUser = async (req, res, next) => {
    try {
        const { name, username, password } = req.body;
        const user = await createUser(name, username, password);
        res.status(201).send({ user });
    } catch (err) {
        next(err);
    }
}

exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await selectAllUsers();
        res.status(200).send({ users });
    } catch (err) {
        next(err);
    }
}