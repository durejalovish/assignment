/*
 * Transactions Controller
 * @description
 * The Transactions controller is used for handling all the functions related to the Transactions.
 */

var crypto = require('crypto');
const Transactions = require('../models/TransactionModel');

const {
    errorResponse,
    successResponse,
} = require('../util/rest');
const Messages = require('../util/messages');
const httpCodes = require('../util/httpCodes');
const jwt = require('jsonwebtoken');
const db = require('../../db/db');
const dbQueryObj = require('../../db/query');

exports.fetchDataFromMockFile = async function (req, res) {
    try {
        var fs = require('fs');
        var obj;
        fs.readFile('mockData.json', 'utf8', async function (err, data) {
        if (err) throw err;
        obj = JSON.parse(data);
        console.log("print he onj here", obj);
        const insertedTransactions = await Transactions.insertMany(obj);
        successResponse(res, Messages.say('data Saved'), insertedTransactions);
        });
    } catch (error) {
        
    }
    
    successResponse(res, Messages.say('Hi'), [])
};

// Api for fetching the users
exports.fetchAllTransactions = async function(req, res) {
    try{
        const fetchAllTransactions = await Transactions.find().sort({"date": 1});
        successResponse(res,Messages.say('Records are fetched'), fetchAllTransactions);
    }catch(error){
        console.log(error) 
        errorResponse(res, httpCodes.serverError,Messages.systemError);
    }
}

exports.updateComments = async function(req, res) {
    try{
        const filter = { id: req.body.id };
        const update = {
            $set: { Comments: req.body.comments } 
          };
          const result = await Transactions.findOneAndUpdate(filter, update, {
            returnOriginal: false // Return the updated document
          });
        successResponse(res,Messages.say('Records are updted'), result);
    }catch(error){
        console.log(error) 
        errorResponse(res, httpCodes.serverError,Messages.systemError);
    }
}
