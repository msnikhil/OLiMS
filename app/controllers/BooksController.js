var Books = require('../models/books.js');

exports.getAllBooks = function(req, res){
    var resJson = {};

    Books.find({}, function(err, bookData){
        if(err){
            console.log("[Error] - GET /Books:", err);
            resJson.status = 0;
            resJson.msg = 'Error in fetching data from database.';
            res.send(resJson);
        }
        resJson.status = 1;
        resJson.msg = 'Fetched all books data successfully.';
        resJson.data = bookData;
        res.send(resJson);
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
                    resJson.status = 0;
                    resJson.msg = 'Error in adding new book to the database.';
                    res.send(resJson);
                }
                else{
                    resJson.status = 1;
                    resJson.msg = 'Book added successfully.';
                }
            });
        }
        else{
            resJson.status = 0;
            resJson.msg = "'name' cannot be empty.";
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

    Books.findOne(book_id, function(err, doc){
        if(err){
            retJson.status = 0;
            retJson.msg = 'Error in fetching data from database.';
            res.send(retJson);
            console.log("[Error] - GET /Books/:bookId:", err);
        }
        retJson.status = 1;
        retJson.msg = 'Found book successfully.';
        retJson.data = doc;
        res.send(retJson);
    })
}

exports.updateBook = function(req, res){
    var retJson = {};
    var book_id = req.params.bookId;
    var bookData = req.body;

    if(bookData.name){
        if(bookData.author){
            Books.findOneAndUpdate(book_id, bookData, {new: true}, function(err, doc){
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
            retJson.msg = "'author' is empty.";
            res.send(retJson);
        }
    }
    else{
            retJson.status = 0;
            retJson.msg = "'name' is empty.";
            res.send(retJson);
    }
}


exports.deleteBook = function(req, res){
    var retJson = {};
    var book_id = req.params.bookId;

    Books.findOneAndRemove(book_id, function(err, doc){
        if(err){
            retJson.status = 0;
            retJson.msg = "Error during removing data from database.";
            res.send(retJson);
        }
        else{
            retJson.status = 1;
            retJson.msg = "Book removed from database.";
            res.send(retJson);
        }
    });
}