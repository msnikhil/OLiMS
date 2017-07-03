
app.service('apiService', ['$http', 'envVars', function($http, envVars){
    var domain = envVars.DOMAIN;
    var port = envVars.PORT;
    var baseUrl = domain + ":" + port;
    console.log("From apiService.js, domain:",domain,"port:",port);

    //For Books
    this.getAllBooks = function(){
        return $http.get(baseUrl + "/api/Books");
    }

    this.addNewBook = function(dataObj){
        return $http.post(baseUrl + "/api/Books", dataObj);
    }

    this.removeBook = function(book_id){
        return $http.delete(baseUrl + "/api/Books/" + book_id);
    }

    // this.getBook = function(bookId){
    //     return $http.get(baseUrl + "/api/Books/" + bookId);
    // }


    //For transactions
    this.getAllTransactions = function(){
        return $http.get(baseUrl + "/api/Transactions");
    }

    this.issueBook = function(dataObj){
        return $http.post(baseUrl + "/api/Transactions/issueBook", dataObj);
    }

    this.returnBook = function(bookId){
        return $http.get(baseUrl + "/api/Transactions/returnBook/"+ bookId);
    }

    // For Users
    this.getAllUsers = function(){
        return $http.get(baseUrl + "/api/Users");
    }

    //For login 
    this.login = function(dataObj){
        return $http.post(baseUrl + "/api/login", dataObj);
    }

    //For signup
    this.signup = function(dataObj){
        return $http.post(baseUrl + "/api/signup", dataObj);
    }
}]);