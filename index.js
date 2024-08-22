const express = require("express");
const sequelize = require("./config/connection");
const path = require("path");
const session = require("express-session");
const routes = require('./controllers');
const { urlencoded } = require("express");


require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(express.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`${PORT}`));
  });