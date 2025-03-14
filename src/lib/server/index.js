const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config({ path:"./process.env" });



const userRoutes = require('./src/routes/userRoute');
const initDataBase = require("./src/models/initDb");

const app = express();


app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.use('/crm', userRoutes);

const port = process.env.PORT || 5001;

initDataBase().then( () => {
        app.listen(port, () => console.log(`Server is running on the port ${port}`))
})