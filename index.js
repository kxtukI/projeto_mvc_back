const express = require("express");
const sequelize = require("./config/connection");
const path = require("path");
const exphbs = require("express-handlebars");
const session = require("express-session");
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const { urlencoded } = require("express");
const SequelizeStore = require("connect-session-sequelize")(session.Store);


require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 3000;

const sess = {
    cookie:{ maxAge: 180000},
    resave:false,
    saveUninitialized:true,
    store:new SequelizeStore({
        db:sequelize
    })

};

const hbs = exphbs.create({helpers});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());

app.use(express.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname, 'public')));

app.use(session(sess));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`${PORT}`));
  });