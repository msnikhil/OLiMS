
app.controller('MainController', ['$scope', '$rootScope', 'apiService', '$location', '$window', 'toaster',
 function($scope, $rootScope, apiService, $location, $window, toaster){

    //All scope variables at top
    $scope.$location = $location;
    $scope.showLoginForm = false;
    $scope.isLoggedIn = $window.sessionStorage.getItem("isLoggedIn");
    $scope.dataLoading = false;
    $scope.emailPattern = /^([a-zA-Z0-9]+)@((?:[a-zA-Z0-9])+).([a-zA-z]{2,4})([\.][a-zA-Z]{2,4}){0,1}$/;
    $scope.showErrors = false;

    // Registration page.
    
    $scope.showRegErrors = false;
    $scope.register = {
        username: '',
        Name: '',
        email: '',
        phone: ''
    }
    $scope.register = function(isValid){
        if(isValid){
            var sendData = {
                username: $scope.register.username,
                name: $scope.register.Name,
                email: $scope.register.email,
                phone: $scope.register.phone
            }

            var regUserProm = apiService.signup(sendData);

            regUserProm.then(function(resp){
                if(resp.data.status == 1){
                    toaster.pop("success","Registration successful","You can now issue books from the admin of the library.");
                    $scope.register = {
                        username: '',
                        Name: '',
                        email: '',
                        phone: ''
                    }
                    $scope.showRegErrors = false;
                    $window.location.reload();
                }
                else{
                    console.log("[Error] - register(): Error in API resp.");
                    console.log(resp.data);
                    toaster.pop("error", resp.data.msg);
                }
            }, function(err){
                console.log("[Error] - register(): API failed.");
                console.log(err);
                toaster.pop("error", "Couldn't connect to the server, please try again later.");;
            });
        }
        else{
            $scope.showRegErrors = true;
        }
    }

    // Login Page.
    $scope.loginUsername = '';
    $scope.loginPassword = '';

    $scope.loginData = {
        username: '',
        password: ''
    }
    $scope.login = function(){
        var sendData = {
            username: $('#LoginUsername').val(),
            password: $('#LoginPassword').val()
        }
        
        var loginProm = apiService.login(sendData);

        loginProm.then(function(resp){
            if(resp.data.status == 1){
                toaster.pop("success","Login successful.");
                $window.sessionStorage.setItem("isLoggedIn", true);
                $scope.isLoggedIn = true;
                $location.path("/home");
            }
            else{
                console.log("[Error] - login(): Error in API resp.");
                console.log(resp.data);
                toaster.pop("error", resp.data.msg);
            }
        }, function(err){
            console.log("[Error] - login(): API failed.");
            console.log(err);
            toaster.pop("error", "Couldn't connect to the server.");
        })
    };

    // Logout.
    $scope.logout = function(){
        $window.sessionStorage.removeItem("isLoggedIn");
        $scope.isLoggedIn = false;
        $location.path("/");
        toaster.pop("success","Logged out successfully.");
    }

    // Set path if user already logged in.
    
    if($scope.isLoggedIn){
        $location.path('/home');
    }
    

 }]);