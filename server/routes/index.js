const express = require('express')
const router =express.Router()

// Import route files
const authRoutes = require('./authRoutes');
const superAdminRoutes = require('./superAdminRoutes');
const mediaAdminRoutes = require('./mediaAdminRoutes');
const journalistRoutes = require('./journalistRoutes');
const publicRoutes = require('./publicRoutes');

// Use route files
router.use('/auth',authRoutes)
router.use('/superadmin', superAdminRoutes);
router.use('/mediaadmin', mediaAdminRoutes);
router.use('/journalist', journalistRoutes);
router.use('/public', publicRoutes);

module.exports=router
