var mongoose = require("mongoose");

var TransactionSchema = new mongoose.Schema({
	id: {type: String, required: true},
	date: {type: String, required: true},
	sender: {
		firstName: {type: String, required: true},
		lastName: {type: String, required: true},
		dateOfBirth: {type: String, required: true},
		IDNumber: {type: String, required: true},
	},
	recipient: {
		firstName: {type: String, required: true},
		lastName: {type: String, required: true},
		email: {type: String, required: true},
		accountNumber: {type: String, required: true},
		bank: {type: String, required: true},
	},
	Amount: {type: Number, required: true},
	CurrencyCd: {type: String, required: true},
	Comments: {type: String, required: true},
	status: {type: String, required: true},
}, {timestamps: true});


module.exports = mongoose.model("Transactions", TransactionSchema);