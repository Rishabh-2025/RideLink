const userModel = require('../models/userModel');
const captainModel = require('../models/captainModel');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blacklistTokenModel = require('../models/blacklistTokenModel');

const authUser = async (req,res,next)=>{
     const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const isBlacklisted = await blacklistTokenModel.findOne({token:token})
   
    if (isBlacklisted) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    
    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id)

        req.user = user;

        return next();

    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}


const authCaptain = async(req,res,next)=>{
 const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized2' });
    }

    const isBlacklisted = await blacklistTokenModel.findOne({token:token})
   
    if (isBlacklisted) {
        return res.status(401).json({ message: 'Unauthorized3' });
    }
    
    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded._id)

        req.captain = captain;

        return next();

    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized1' });
    }
}

module.exports = {
    authUser,
    authCaptain
}