const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config({ path:"./process.env" });



const userRoutes = require('./src/routes/userRoute');
const userAuditRoute = require("./src/routes/userAuditRoutes")
const blogCategoryRoute = require("./src/routes/blogCategoryRoutes")
const blogSubCategoryRoute = require("./src/routes/apiIntegrationRoutes")
const pageBlogRoutes = require("./src/routes/pagesBlogsRoutes")
const marketplaceRoutes = require("./src/routes/marketplaceRoutes")
const notificationRoutes = require("./src/routes/notificationRoutes")
const apiIntegrationRoutes = require("./src/routes/apiIntegrationRoutes")
const initDataBase = require("./src/models/initDb");

const app = express();


app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.use('/crm', userRoutes, 
                userAuditRoute,
                blogCategoryRoute,
                blogSubCategoryRoute,
                pageBlogRoutes,
                marketplaceRoutes,
                notificationRoutes,
                apiIntegrationRoutes);

const port = process.env.PORT || 5001;

initDataBase().then( () => {
        app.listen(port, () => console.log(`Server is running on the port ${port}`))
})