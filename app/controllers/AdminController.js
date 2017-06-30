
//Get model of the collection.
var Admin = require('../models/admin.js');

exports.isAdmin = function(req, res){
    var retJson = {};
    var username = req.body.username;
    var password = req.body.password;

    if(username){
        if(password){
            Admin.findOne({username: username}, function(err, doc){
                if(doc){
                    if(doc.password == password){
                        retJson.status = 1;
                        retJson.msg = 'Admin credentials verified.';
                        res.send(retJson);
                    }
                    else{
                        retJson.status = 0;
                        retJson.msg = 'No such admin found.';
                        res.send(retJson);
                    }
                }
                else{
                    console.log("Find admin DB result-> doc empty");
                }
                
            });
        }
        else{
            retJson.status = 0;
            retJson.msg = "'password' cannot be empty.";
            res.send(retJson);
        }
    }
    else{
        retJson.status = 0;
        retJson.msg = "'username' cannot be empty.";
        res.send(retJson);
    }
}

exports.addAdmin = function(req, res){
    var retJson = {};
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;
    

    if(username){
        if(password){
            if(email){
                var sendData = {
                    username: username,
                    name: req.body.name,
                    password: password,
                    email: email,
                    phone: req.body.phone,
                }
                Admin.findOneAndUpdate({username: username, email: email},
                    sendData,
                    {new: true, upsert: true},
                    function(err, doc){
                        if(err){
                            retJson.status = 0;
                            retJson.msg = "Couldn't store admin details in database.";
                            res.send(retJson);
                        }
                        else{
                            retJson.status = 1;
                            retJson.msg = "Admin details stored successfully.";
                            res.send(retJson);
                        }
                    });
            }
            else{
                retJson.status = 0;
                retJson.msg = "'email' cannot be empty.";
                res.send(retJson);
            }
        }
        else{
            retJson.status = 0;
            retJson.msg = "'password' cannot be empty.";
            res.send(retJson);
        }
    }
    else{
        retJson.status = 0;
        retJson.msg = "'username' cannot be empty.";
        res.send(retJson);
    }
}