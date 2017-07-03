var bookCtrl = require('../app/controllers/BooksController.js');
var userCtrl = require('../app/controllers/UsersController.js');
var adminCtrl = require('../app/controllers/AdminController.js');
var transCtrl = require('../app/controllers/TransactionsController.js');

module.exports = function(app){

    // Books API
    app.route('/api/Books')
        .get(bookCtrl.getAllBooks)
        .post(bookCtrl.addNewBook);

    app.route('/api/Books/:bookId')
        // .get(bookCtrl.getBook)
        // .put(bookCtrl.updateBook)
        .delete(bookCtrl.deleteBook);

    // Transactions API
    app.route('/api/Transactions/issueBook')
        .post(transCtrl.issueBook);

    app.route('/api/Transactions/returnBook/:bookId')
        .get(transCtrl.returnBook);

    app.route('/api/Transactions')
        .get(transCtrl.getAllTransactions)

    app.route('/api/Transactions/:transId')
        .get(transCtrl.getTransaction);

    // Admin API
    app.route('/api/login')
        .post(adminCtrl.isAdmin)

    app.route('/api/signup/admin')
        .post(adminCtrl.addAdmin);
    
    // Users API
    app.route('/api/signup')
        .post(userCtrl.addUser);

    app.route('/api/Users')
        .get(userCtrl.getAllUsers);

    app.route('/api/Users/:userId')
        .get(userCtrl.getUser);

    // frontend routes =========================================================
    // route to handle all angular requests
    app.get('*', function(req, res) {
        res.sendfile('./public/index.html'); // load our public/index.html file
    });
}
