const { createUserTable } = require("../models/userModel");
const { createBlogCategoryTable } = require("../models/blogCategoryModel")
const { createBlogSubCategoryTable } = require("../models/blogSubCategoryModel")
const { createUserAuditTable } = require('../models/userAuditModel')
const { createPagesBlogsTable } = require("../models/pagesBlogsModel")
const { createMarketPlaceTable } = require("../models/marketplaceModel")
const { createNotificationTable } = require("../models/notificationsModel")
const { createApiIntegrationTable } = require("../models/apiIntegrationModel")
const initDatabase = async () => {
    try {
        await createUserTable();
        await createBlogCategoryTable();
        await createBlogSubCategoryTable();
        await createUserAuditTable();
        await createPagesBlogsTable();
        await createMarketPlaceTable();
        await createNotificationTable();
        await createApiIntegrationTable()
        console.log('All tables initialized successfully');
    } catch (error) {
        console.error('Error initializing database:', error.message);
    }
};

module.exports = initDatabase;