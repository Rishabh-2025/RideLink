const blacklistTokenModel = require('../models/blacklistTokenModel');
const userModel = require('../models/userModel')
const userService = require('../services/userService')
const { validationResult } = require('express-validator');

const registerUser = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password } = req.body;

    const isUserAlready = await userModel.findOne({ email });

    if (isUserAlready) {
        return res.status(400).json({ message: 'User already exist' });
    }

    const hashedPassword = await userModel.hashPassword(password);

    const user = await userService.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword
    });

    const token = user.generateAuthToken();

    res.status(201).json({ token, user });


}

const loginUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select('+password');

    if (!user) {
        return res.status(401).json({ message: 'Invalid email and password' })
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
        return res.status(401).json({ message: "Invalid eamil and password" })
    }

    const token = user.generateAuthToken();

    res.cookie('token',token)

    res.status(200).json({ token, user })
}

const getUserProfile = async (req, res) => {

    res.status(200).json(req.user)
}

const logoutUser = async (req, res) => {

    const token = req.cookies.token || req.headers.authorization.split('')[1];
    
    await blacklistTokenModel.create({token})
    
    res.clearCookie('token');
    res.status(200).json({message: 'Logged out'})
}

module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    logoutUser,

}