var Books = require('../models/books.js');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

exports.getAllBooks = function(req, res){
    var resJson = {};

    Books.find({}, function(err, bookData){
        if(err){
            console.log("[Error] - GET /Books:", err);
            resJson.status = 0;
            resJson.msg = 'Error in fetching data from database.';
            res.send(resJson);
        }
        else if(Array.isArray(bookData) && bookData.length > 0){
            resJson.status = 1;
            resJson.msg = 'Fetched all books data successfully.';
            resJson.data = bookData;
            res.send(resJson);
        }
        else{
            resJson.status = 0;
            resJson.msg = 'No books in the system.';
            resJson.data = bookData;
            res.send(resJson);
        }
    });
}

exports.addNewBook = function(req, res){
    var resJson = {};
    var name = req.body.name;
    var author = req.body.author;
    
    if(name){
        if(author){
            var newBook = new Books();
            newBook.name = name;
            newBook.author = author;
            
            Books.create(newBook, function(err, resp){
                if(err){
                    console.log("[Error] - POST Books:", err);
                    resJson.status = 0;
                    resJson.msg = 'Error in adding new book to the database.';
                    res.send(resJson);
                }
                else{
                    resJson.status = 1;
                    resJson.msg = 'Book added successfully.';
                    resJson.data = resp;
                    res.send(resJson);
                }
            });
        }
        else{
            resJson.status = 0;
            resJson.msg = "'author' cannot be empty.";
            res.send(resJson);
        }
    }
    else{
        resJson.status = 0;
        resJson.msg = "'name' cannot be empty.";
        res.send(resJson);
    }
}


exports.getBook = function(req, res){
    var retJson = {};
    var book_id = req.params.bookId;

    if(book_id){
        Books.findOne({ _id: new ObjectId(book_id)}, function(err, doc){
            if(err){
                retJson.status = 0;
                retJson.msg = 'Error in fetching data from database.';
                res.send(retJson);
                console.log("[Error] - GET /Books/:bookId:", err);
            }
            else{
                if(doc){
                    retJson.status = 1;
                    retJson.msg = 'Found book successfully.';
                    retJson.data = doc;
                    res.send(retJson);
                }
                else{
                    retJson.status = 0;
                    retJson.msg = "No such book in the system.";
                    res.send(retJson);
                }
            }
            
        })
    }
    else{
        retJson.status = 0;
        retJson.msg = "'book_id' is required.";
        res.send(retJson);
    }
}

exports.updateBook = function(req, res){
    var retJson = {};
    var book_id = req.params.bookId;
    var bookData = req.body;

    if(book_id){
        Books.findOneAndUpdate({ _id: new ObjectId(book_id)}, bookData, {new: true}, function(err, doc){
            if(err){
                retJson.status = 0;
                retjson.msg = 'Error in updating book in database.';
                res.send(retJson);
            }
            else{
                retJson.status = 1;
                retJson.msg = 'Data updated successfully';
                retJson.data = doc;
                res.send(retJson);
            }
        });
    }
    else{
        retJson.status = 0;
        retJson.msg = "'book_id' is required.";
        res.send(retJson);
    }                
}


exports.deleteBook = function(req, res){
    var retJson = {};
    var book_id = req.params.bookId;

    if(book_id){
        Books.findOne({ _id: new ObjectId(book_id)}, deleteBook_isIssuedCB);
    }
    else{
        retJson.status = 0;
        retJson.msg = "'book_id' is required.";
        res.send(retJson);
    }

    function deleteBook_isIssuedCB(err, doc){
        
        if(err){
            retJson.status = 0;
            retJson.msg = "Error during removing data from database.";
            res.send(retJson);
        }
        else{
            if(doc){
                //If Book is issued, mark 'is_removed'
                if(doc.is_issued){
                    Books.update({_id: doc._id}, {$set:{"is_removed": true}}, function(updtErr, updtDoc){
                        if(updtErr){
                            console.log("[Error] - DELETE api/Books/:bookId(update):",updtErr);
                            retJson.status = 0;
                            retJson.msg = "Couldn't remove book from the system.";
                            res.send(retJson);
                        }
                        else{
                            retJson.status = 1;
                            retJson.msg = "Book removed from system.";
                            res.send(retJson);
                        }
                    })
                }
                //If book is not issued, remove from the system.
                else{
                    Books.remove({_id: doc._id}, function(remErr, remDoc){
                        if(remErr){
                            console.log("[Error] - DELETE api/Books/:bookId(remove):",remErr);
                            retJson.status = 0;
                            retJson.msg = "Couldn't remove book from the system.";
                            res.send(retJson);
                        }
                        else{
                            retJson.status = 1;
                            retJson.msg = "Book removed from system.";
                            retJson.data = remDoc;
                            res.send(retJson);
                        }
                    })
                }
            }
        }
    }
}

