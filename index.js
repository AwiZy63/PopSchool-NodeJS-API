const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

const sequelize = require("./config/database.config");

const port = 3030;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send("<body style='background-color: black;'><pre style='color: green;'>Bienvenue sur notre API</pre></body>")
})

// User routes
app.use('/user', require("./src/routes/user.routes"));
// localhost:3030/user/signup
// body: { username: "nomdutilisateur", email: "adresse@email.com", password: "123456"}
app.listen(port, async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        console.log(`Example app listening at http://localhost:${port}`)
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})