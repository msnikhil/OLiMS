var Transactions = require('../models/transactions.js');

exports.getAllTransactions = function(req, res){

    Transactions.find({})
    .populate('issued_to book_details')
    .exec(function(err, docs){
        var retJson = {};

        if(err){
            retJson.status = 0;
            retJson.msg = "Error in fetching data from database.";
            res.send(retJson);
            console.log("[Error] - GET api/Transactions:", err);
        }
        else{
            retJson.status = 1;
            retJson.msg = "Data fetched successfully.";
            retJson.data = docs;
            res.send(retJson);
        }
    })
}

exports.addTransaction = function(req, res){
    var retJson = {};
    var transData = req.body;

    if(transData.issued_to){
        if(transData.book_details){
            if(transData.due_date){
                if(transData.transaction_type){
                    Transactions.create(transData, function(err, doc){
                        if(err){
                            retJson.status = 0;
                            retJson.msg = "Error in creating transaction in database.";
                            res.send(retJson);
                        }
                        else{
                            retJson.status = 1;
                            retJson.msg = "Transaction added successfully to database.";
                            res.send(retJson);
                        }
                    });
                }
                else{
                    retJson.status = 0;
                    retJson.msg = "'transaction_type' is empty.";
                    res.send(retJson);
                }
            }
            else{
                retJson.status = 0;
                retJson.msg = "'due_date' is empty.";
                res.send(retJson);
            }
        }
        else{
            retJson.status = 0;
            retJson.msg = "'book_details' is empty.";
            res.send(retJson);
        }
    }
    else{
        retJson.status = 0;
        retJson.msg = "'issued_to' is empty.";
        res.send(retJson);
    }
}

exports.getTransaction = function(req, res){
    var retJson = {};
    var trans_id = req.params.transId;

    Transactions.findOne(trans_id)
    .populate('issued_to book_details')
    .exec(function(err, doc){
        if(err){
            retJson.status = 0;
            retJson.msg = "Error in fetching data from database.";
            res.send(retJson);
            console.log("[Error] - GET api/Transactions/:transId", err);
        }
        else{
            retJson.status = 1;
            retJson.msg = "Data fetched from database successfully.";
            retJson.data = doc;
            res.send(retJson);
        }
    });
}
