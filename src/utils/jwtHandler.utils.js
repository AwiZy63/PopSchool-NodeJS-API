const jwt = require("jsonwebtoken");

const generateJwt = async (data) => {
    try {
        const accessToken = await jwt.sign(data, 'MySuperSecretPassword', { expiresIn: '1h' });
        return accessToken;
    } catch (error) {
        console.error(error);
    }
}

module.exports = { generateJwt };