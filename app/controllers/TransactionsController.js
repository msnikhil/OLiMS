var Transactions = require('../models/transactions.js');
var Books = require('../models/books.js');
var Users = require('../models/users.js');

var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

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

exports.getTransaction = function(req, res){
    var retJson = {};
    var trans_id = req.params.transId;

    if(trans_id){
        Transactions.findOne({_id: new ObjectId(trans_id)})
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
    else{
        retJson.status = 0;
        retJson.msg = "'trans_id' is required.";
        res.send(retJson);
    }
}

exports.issueBook = function(req, res){
    var retJson = {};

    var reqValidator = requestIssueBookDV(req.body);

    if(reqValidator.valid){
        var transObj = {
            issued_to: req.body.user_id,
            book_details: req.body.book_id,
            due_date: req.body.due_date,
            type: 'Issue'
        }
        // Create a transaction.
        Transactions.create(transObj, createTransaction_issueBookCB);
    }
    else{
        console.log("[Error] - POST api/Transactions/issueBook => request validator:", reqValidator);
        retJson.status = 0;
        retJson.msg = reqValidator.msg;
        res.send(retJson);
    }

    function createTransaction_issueBookCB(err, doc){
        if(err){
            console.log("[Error] - POST api/Transactions/issueBook => create transaction:", err);
            retJson.status = 0;
            retJson.msg = "Error in issuing book.";
            res.send(retJson);
        }
        else{
            //Update Books collection with the transaction data.
            Books.findOneAndUpdate({_id: new ObjectId(req.body.book_id)},
                {$set:{"is_issued": true, "issued_to": req.body.user_id, "due_date": req.body.due_date}},
                function(bookErr, bookDoc){
                if(bookErr){
                    console.log("[Error] - POST api/Transactions/issueBook => update book collection:", bookErr);
                    retJson.status = 0;
                    retJson.msg = "Error in marking book as 'issued'";
                }
                else{
                    retJson.status = 1;
                    retJson.msg = "Book issued successfully.";
                    res.send(retJson);
                }
            });
        }
    }
}

exports.returnBook = function(req, res){
    var retJson = {};
    var book_id = req.params.bookId;
    var user_id = '';
    var due_date = '';
    var is_removed = false;

    if(book_id){
        Books.findOne({_id: new ObjectId(book_id)}, function(err, doc){
            if(err){
                console.log("[Error] - POST api/Transactions/requestBook/:bookId => Get book:", err);
                retJson.status = 0;
                retJson.msg = "Error in fetching book from database.";
                res.send(retJson);
            }
            else{
                //Get user_id of issued user and due date.
                user_id = doc.issued_to;
                due_date = doc.due_date;
                is_removed = doc.is_removed;
                
                var transObj = {
                    issued_to: user_id,
                    book_details: book_id,
                    due_date: due_date,
                    type: 'Return'
                }

                // Add new transaction to collection.
                Transactions.create(transObj, createTransaction_returnBookCB);
            }
        })
    }
    else{
        retJson.status = 0;
        retJson.msg = "'book_id' is required.";
        res.send(retJson);
    }

    function createTransaction_returnBookCB(err, doc){
        if(err){
            console.log("[Error] - POST api/Transactions/requestBook/:bookId => create transaction:", creErr);
            retJson.status = 0;
            retJson.msg = "Error in creating transaction.";
            res.send(retJson);
        }
        else{
            //Check if book is marked for removal.
            if(is_removed){
                Books.remove({_id: new ObjectId(book_id)}, function(remErr, remDoc){
                    if(remErr){
                        console.log("[Error] - POST api/Transactions/requestBook/:bookId => remove book:", remErr);
                        retJson.status = 0;
                        retJson.msg = "Error in removing book from database.";
                        res.send(retJson);
                    }
                    else{
                        retJson.status = 1;
                        retJson.msg = "Book returned successfully and was removed after transaction.";
                        res.send(retJson);
                    }
                })
            }
            else{
                // If not marked for removal then update status of book.
                Books.findOneAndUpdate({_id: new ObjectId(book_id)}, 
                    {$set:{"is_issued": false, "issued_to": '', "due_date": ''}},
                    function(updErr, updDoc){
                    if(updErr){
                        console.log("[Error] - POST api/Transactions/requestBook/:bookId => update book:", updErr);
                        retJson.status = 0;
                        retJson.msg = "Error in updating book status in database.";
                        res.send(retJson);
                    }
                    else{
                        retJson.status = 1;                                    
                        retJson.msg = "Book returned successfully.";
                        res.send(retJson);
                    }
                })
            }
        }
    }
}

// To validate data while making a transaction
function transactionDataValidator(transData){
    var result = {
        msg: "",
        valid: true
    }

    if(transData.issued_to){
        if(transData.book_details){
            if(transData.due_date){
                return result;
            }
            else{
                result.valid = false;
                result.msg = "'due_date' is required.";
                return result;
            }
        }
        else{
            result.valid = false;
            result.msg = "'book_details' is required.";
            return result;
        }
    }
    else{
        result.valid = false;
        result.msg = "'issued_to' is required.";
        return result;
    }
}

// To validate data from user while issuing book (DV - Data Validator).
function requestIssueBookDV(reqTransData){
    var result = {
        valid: true,
        msg: ""
    }

    if(reqTransData.user_id){
        if(reqTransData.book_id){
            if(reqTransData.due_date){
                return result;
            }
            else{
                result.valid = false;
                result.msg = "'due_date' is required.";
                return result;
            }
        }
        else{
            result.valid = false;
            result.msg = "'book_id' is required.";
            return result;
        }
    }
    else{
        result.valid = false;
        result.msg = "'user_id' is required.";
        return result;
    }
}



