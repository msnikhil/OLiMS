
app.controller('TransactionsController', ['$scope', '$rootScope', 'apiService', 'toaster',
 function($scope, $rootScope, apiService, toaster){

    //All scope variables at top
    $scope.allTransactions = [];

    getAllTransactions();
    //Implementations

    function getAllTransactions(){
        var allTransProm = apiService.getAllTransactions();

        allTransProm.then(function(resp){
            if(resp.data.status == 1){
                $scope.allTransactions = resp.data.data.slice();
            }
            else{
                toaster.pop("error", resp.data.msg);
                console.log("[Error] - getAllTransactions(), Error in API resp.");
                console.log(resp.data);
            }
        }, function(err){
            toaster.pop("error", "Couldn't connect to the server.");
            console.log("[Error] - getAllTransactions(), Error in API resp.");
            console.log(err);
        });
    }
    
 }]);