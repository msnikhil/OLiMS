
app.service('apiService', ['$http', 'envVars', function($http, envVars){
    var domain = envVars.DOMAIN;
    var port = envVars.PORT;
    console.log("From apiService.js, domain:",domain,"port:",port);

    //For Books
    this.getAllBooks = function(){
        return $http.get(domain + port + "/api/Books");
    }

    this.addNewBook = function(dataObj){
        return $http.post(domain + port + "/api/Books", dataObj);
    }

    this.getBook = function(bookId){
        return $http.get(domain + port + "/api/Books/" + bookId);
    }


    //For transactions
    this.getAllTransactions = function(){
        return $http.get(domain + port + "/api/Transaction");
    }

    this.addTransaction = function(dataObj){
        return $http.post(domain + port + "/api/Transaction", dataObj);
    }

    //For login 
    this.login = function(dataObj){
        return $http.get(domain + port + "/api/login", dataObj);
    }

    //For signup
    this.signup = function(dataObj){
        return $http.get(domain + port + "/api/signup", dataObj);
    }
}]);