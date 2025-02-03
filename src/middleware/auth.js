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


module.exports = {
    adminAuth,
    userAuth
};