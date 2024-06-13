/*
 * Api.js
 * @description
 * This file is used for storing all the routes related to the project.
 */
const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

router.post('/jsonData', transactionController.fetchDataFromMockFile);
router.get('/getTransactions', transactionController.fetchAllTransactions);
router.post('/updateComments', transactionController.updateComments);

module.exports = router;