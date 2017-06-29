
// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//define our transactions schema
var TransactionSchema = new Schema({
    issued_to : {type : Schema.Types.ObjectId, ref: 'Users'},
    book_details : {type : Schema.Types.ObjectId, ref: 'Books'},
    due_date: {type: String, default: ''},
    timestamp: {type: Date, default: Date.now},
    transaction_type: {type: String, default: ''}
});

// define our transactions model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Transaction', TransactionSchema);