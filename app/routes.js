var bookCtrl = require('../app/controllers/BooksController.js');
// var userCtrl = require('../app/controllers/UsersController.js');
var adminCtrl = require('../app/controllers/AdminController.js');
var transCtrl = require('../app/controllers/TransactionsController.js');

module.exports = function(app){

    app.route('/api/Books')
        .get(bookCtrl.getAllBooks)
        .post(bookCtrl.addNewBook);

    app.route('/api/Books/:bookId')
        .get(bookCtrl.getBook)
        .put(bookCtrl.updateBook)
        .delete(bookCtrl.deleteBook);

    app.route('/api/Transaction')
        .get(transCtrl.getAllTransactions)
        .post(transCtrl.addTransaction);

    app.route('/api/Transaction/:transId')
        .get(transCtrl.getTransaction);

    app.route('/api/login')
        .get(adminCtrl.isAdmin)

    app.route('/api/signup')
        .post(adminCtrl.addAdmin);
        
}
