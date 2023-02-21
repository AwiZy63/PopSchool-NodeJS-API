const { Op } = require("sequelize");
const User = require("../models/user.model");
const { generateJwt } = require("../utils/jwtHandler.utils");
const { encryptPassword, comparePassword } = require("../utils/passwordHandler.utils");

exports.SignUp = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                error: true,
                message: "Requête invalide."
            });
        }

        const emailRegex = /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/igm;

        if (!emailRegex.test(email)) {
            return res.status(400).json({
                error: true,
                message: "Le format de l'adresse mail est incorrecte."
            });
        }

        const isUserExist = await User.findOne({
            where: {
                [Op.or]: [
                    { username: username },
                    { email: email }
                ]
            }
        });

        if (isUserExist) {
            let errorMessage = '';
            if (isUserExist.username.toLowerCase() === username.toLowerCase() && isUserExist.email.toLowerCase() === email.toLowerCase()) {
                errorMessage = "Le nom d'utilisateur et l'adresse mail sont déjà utilisés."
            } else if (isUserExist.username.toLowerCase() === username.toLowerCase()) {
                errorMessage = "Le nom d'utilisateur est déjà utilisé."
            } else if (isUserExist.email.toLowerCase() === email.toLowerCase()) {
                errorMessage = "L'adresse mail est déjà utilisé."
            }

            return res.status(400).json({
                error: true,
                message: errorMessage
            });
        }


        const encryptedPassword = await encryptPassword(password);

        const userData = {
            username: username,
            email: email,
            password: encryptedPassword
        }

        await new User(userData).save();

        return res.status(200).json({
            error: false,
            message: "Votre compte a bien été créé."
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: true,
            message: error
        });
    }
}


exports.SignIn = async (req, res) => {
    try {
        const { identifier, password } = req.body;

        if (!identifier || !password) {
            return res.status(400).json({
                error: true,
                message: "Requête invalide."
            });
        }

        const emailRegex = /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/igm;

        let user;

        if (emailRegex.test(identifier)) {
            user = await User.findOne({ where: { email: identifier } });
        } else {
            user = await User.findOne({ where: { username: identifier } });
        }

        console.log(user)

        if (!user) {
            return res.status(400).json({
                error: true,
                message: "Le nom d'utilisateur et/ou le mot de passe est incorrect."
            });
        }

        const isPasswordValid = await comparePassword(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({
                error: true,
                message: "Le nom d'utilisateur et/ou le mot de passe est incorrect."
            });
        }

        const accessToken = await generateJwt({
            username: user.username,
            email: user.email
        });
        
        await user.update({ accessToken: accessToken });

        return res.status(200).json({
            error: false,
            message: "Vous êtes désormais connecté.",
            accessToken: accessToken
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: true,
            message: error
        });
    }
}