
// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//define our users schema.
var UserSchema = new Schema({
    username : {type : String, default: ''},
    name : {type : String, default: ''},
    email: {type: String, default: ''},
    phone: {type: String, default: ''}
})
// define our users model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('User', UserSchema);