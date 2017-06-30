
app.config(['$routeProvider','$locationProvider',
 function($routeProvider, $locationProvider){

     $routeProvider

        //For home page
        .when('/home', {
            templateUrl: 'tpl/home.html',
            controller: 'HomeController'
        })

        //For manage books page
        .when('/manage-books', {
            templateUrl: 'tpl/manageBooks.html',
            controller: 'ManageBooksController'
        })

        //For transactions page
        .when('/transactions', {
            templateUrl: 'tpl/transactions.html',
            controller: 'TransactionsController'
        })

        //For login page
        .when('/login', {
            templateUrl: 'tpl/login.html',
            controller: 'LoginController'
        });

        $locationProvider.html5Mode(true);
 }])