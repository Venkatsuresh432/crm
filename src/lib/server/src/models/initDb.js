const { createUserTable } = require('../models/userModel');
const { createBlogCategoryTable } = require('../models/blogCategoryModel')
const { createBlogSubCategoryTable } = require('../models/blogSubCategoryModel')
const { createUserAuditTable } = require('../controllers/userAuditController')
const { createPagesBlogsTable } = require("../controllers/pageBlogController")
const { createMarketPlaceTable } = require("../controllers/marketplaceController")
const { createNotificationTable } = require("../controllers/notificationsController")
const { createApiIntegrationTable } = require("../controllers/apiIntegrationsController")
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