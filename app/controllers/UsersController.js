var Users = require('../models/users.js');

var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

exports.addUser = function(req, res){
    var retJson = {};
    var username = req.body.username;
    var name = req.body.name;
    var email = req.body.email;
    req.body.phone = Boolean(req.body.phone) ? req.body.phone : '';
    
    console.log("userdata:", req.body);
    var userDataValidator = addUserDV(req.body);
    if(userDataValidator.valid){
        Users.create(req.body, function(err, doc){
            if(err){
                console.log("[Error] - POST api/signup => create user:", err);
                retJson.status = 0;
                retJson.msg = "Error in creating user in database.";
                res.send(retJson);
            }
            else{
                retJson.status = 1;
                retJson.msg = "User created successfully.";
                res.send(retJson);
            }
        })
    }
    else{
        retJson.status = 0;
        retJson.msg = userDataValidator.msg;
        res.send(retJson);
    }
}

exports.getAllUsers = function(req, res){
    var retJson = {};

    Users.find({}, function(err, docs){
        if(err){
            console.log("[Error] - GET api/Users => get all users:", err);
            retJson.status = 0;
            retJson.msg = "Error in fetching all users from database.";
            res.send(retJson);
        }
        else{
            if(docs.length > 0){
                retJson.status = 1;
                retJson.msg = "All users fetched successfully.";
                retJson.data = docs;
                res.send(retJson);
            }
            else{
                retJson.status = 0;
                retJson.msg = "No users found.";
                retJson.data = docs;
                res.send(retJson);
            }
        }
    });
}

exports.getUser = function(req, res){
    var retJson = {};
    var user_id = req.params.userId;

    if(user_id){
        Users.findOne(new ObjectId(user_id), function(err, doc){
            if(err){
                console.log("[Error] - GET api/Users/:userId => get a user:", err);
                retJson.status = 0;
                retJson.msg = "Error in fetching user from database.";
                res.send(retJson);
            }
            else{
                retJson.status = 1;
                retJson.msg = "Found user.";
                retJson.data = doc;
                res.send(retJson);
            }
        })
    }
    else{
        retJson.status = 0;
        retJson.msg = "'user_id' is required.";
    }
}

function addUserDV(userData){
    console.log("DV data:", userData);
    var result = {
        valid: true,
        msg: ''
    }

    if(userData.username){
        if(userData.name){
            if(userData.email){
                return result;
            }
            else{
                result.valid = false;
                result.msg = "'email' is required.";
                return result;
            }
        }
        else{
            result.valid = false;
            result.msg = "'name' is required.";
            return result;
        }
    }
    else{
        result.valid = false;
        result.msg = "'username' is required.";
        return result;
    }
}