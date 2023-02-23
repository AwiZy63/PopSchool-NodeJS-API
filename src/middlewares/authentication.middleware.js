const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const authenticateUser = async (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;

        let result;

        if (!authorizationHeader || !authorizationHeader.split(" ")[1]) {
            return res.status(401).json({
                error: true,
                message: "Le clé d'accès est manquante."
            });
        }

        const token = authorizationHeader.split(" ")[1];

        const user = await User.findOne({ where: { accessToken: token } });

        if (!user) {
            return res.status(403).json({
                error: true,
                message: "Accès interdit."
            });
        }

        result = jwt.verify(token, 'MySuperSecretPassword', { expiresIn: '1h' });

        if (user.email !== result.email) {
            return res.status(403).json({
                error: true,
                message: "Accès interdit."
            });
        }

        req.decoded = user;

        next();
    } catch (error) {
        console.error(error);
        let errorMessage = '';
        let statusCode = 500;
        if (error.name === "TokenExpiredError") {
            statusCode = 403;
            errorMessage = "Erreur d'authentification, veuillez recharger votre session."
        } else {
            errorMessage = "Erreur d'authentification."
        }
        return res.status(statusCode).json({
            error: true,
            message: errorMessage
        });
    }
}

module.exports = { authenticateUser };