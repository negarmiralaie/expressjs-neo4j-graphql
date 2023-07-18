const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const generateAccessToken = user => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1800s' });
}

const validatePassword = async (password, hashedPassword) => {
    const validPassword = await bcrypt.compare(password, hashedPassword);
    return validPassword;
}