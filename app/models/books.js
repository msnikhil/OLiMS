
// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// define our books schema.
var BookSchema = new Schema({
    name : {type : String, default: ''},
    author: {type: String, default: ''},
    is_available: {type: Boolean, default: true}
});

// define our books model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Book', BookSchema);