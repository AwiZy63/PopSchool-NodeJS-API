const bcrypt = require("bcrypt");

const encryptPassword = async (password) => {
    try {
        const encryptedPassword = await bcrypt.hashSync(password, 10);

        return encryptedPassword;
    } catch (error) {
        console.error(error);
    }
}


const comparePassword = async (password, dbPassword) => {
    try {
        const isPasswordValid = await bcrypt.compareSync(password, dbPassword);

        return isPasswordValid;
    } catch (error) {
        console.error(error);
    }
}

module.exports = { encryptPassword, comparePassword };