const jwt = require('jsonwebtoken');
const User = require('../models/user');

const adminAuth = (req, res, next) => {
    console.log('in side admin auth check');
    const token = "xyz";
    const Autorization = token === 'xyz';
    if(!Autorization) {
        res.status(401).send('Unatorizes request!!');
    } else {
        next();
    }
}

const userAuth = (req, res, next) => {
    console.log('in side User auth check');
    const token = "abcd";
    const Autorization = token === 'abc';
    if(!Autorization) {
        res.status(401).send('Unatorizes request!!');
    } else {
        next();
    }
}

const jwtAuth = async (req, res, next) => {
    try {
        const cookies = req.cookies;
            const { token } = cookies;
            if(!token) {
                throw new Error('Token not found');
            }
        const decodedJWT = await jwt.verify(token, 'Dev@Tinder@2025');
        const {_id} = decodedJWT;
        const user = await User.findById(_id);
        if(!user) {
            throw new Error('Unauthorized User')
        } else {
            req.user = user;
            next();
        }
        } catch(err) {
            res.status(400).send("ERROR :" + err.message);
        }
}

module.exports = {
    adminAuth,
    userAuth,
    jwtAuth
};