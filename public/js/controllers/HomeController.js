
app.controller('HomeController', ['$scope', '$rootScope', 'apiService', '$uibModal', 'toaster',
 function($scope, $rootScope, apiService, $uibModal, toaster){

    //All scope variables at top
    $scope.searchBookInput = '';
    $scope.searchOpt = 'name';
    $scope.filterOpt = 'all';

    $scope.allBooks = [];
    $scope.allUsers = [];

    $scope.issueBook = function(book_id){
        console.log("book_id:", book_id);
        $scope.modalInstance = $uibModal.open({
            templateUrl: 'tpl/modals/issueBook.html',
            controller: 'IssueBookModalCtrl',
            resolve: {
                book_id: function(){
                    return book_id;
                },
                allUsers: function(){
                    return $scope.allUsers;
                }
            }
        });

        $scope.modalInstance.result.then(function(result){
            console.log("Success..");

            //After fetching data, create request data and call issueBook API.
            var sendData = {
                user_id: result.issued_to,        //user_id
                book_id: book_id,              //book_id
                due_date: result.due_date
            }

            var issueBookProm = apiService.issueBook(sendData);

            issueBookProm.then(function(resp){
                if(resp.data.status == 1){
                    var index = $scope.allBooks.map(function(item){return item._id}).indexOf(book_id);
                    $scope.allBooks[index].is_issued = true;
                    toaster.pop("success", "Book issued.");
                }
                else{
                    toaster.pop("error", resp.data.msg);
                }
            }, function(err){
                console.log("[Error] - issueBook => API failed.");
                console.log(err);
                toaster.pop("error","Something went wrong, please try again later.");
            });
        }, function(err){
            console.log("Dismissed..");
        })   
    }

    $scope.returnBook = function(book_id){
        if(book_id){
            var returnBookProm = apiService.returnBook(book_id);

            returnBookProm.then(function(resp){
                if(resp.data.status == 1){
                    getAllBooks();
                    toaster.pop("success","Book returned.");
                }
                else{
                    console.log("[Error] - returnBook(): Error in API resp.");
                    console.log(resp.data);
                    toaster.pop("error", resp.data.msg);
                }
            }, function(err){
                console.log("[Error] - returnBook(): API failed.");
                console.log(err);
                toaster.pop("error","Couldn't connect to the server.");
            });
        }
        else{
            toaster.pop("error","Something went wrong, please try again later.");
            console.log("[Error] - returnBook(): 'book_id' is required.");
        }
    };

    getAllBooks();

    getAllUsers();

    //Implementations

    function getAllBooks(){
        var getAllBooksProm = apiService.getAllBooks();

        getAllBooksProm.then(function(resp){
            if(resp.data.status == 1){
                $scope.allBooks = resp.data.data.slice();
            }
            else{
                console.log("[Error] - getAllBooks => Error in API resp.");
                console.log(resp.data);
            }
        }, function(err){
            console.log("[Error] - getAllBooks => API failed:");
            console.log(err);
            toaster.pop("error","Something went wrong, please try again later.");
        })
    }

    function getAllUsers(){
        var allUsersProm = apiService.getAllUsers();

        allUsersProm.then(function(resp){
            if(resp.data.status == 1){
                $scope.allUsers = resp.data.data.slice();
            }
            else{
                console.log("[Error] - getAllUsers => Error in API resp.");
                console.log(resp.data);
            }
        }, function(err){
            toaster.pop("error","Something went wrong, please try again later.");
            console.log("[Error] - getAllUsers => API failed.");
            console.log(err);
        })
    }


 }]);

 app.controller('IssueBookModalCtrl', ['$scope', '$uibModalInstance', 'book_id', 'allUsers',
  function($scope, $uibModalInstance, book_id, allUsers){
    console.log("Inside issueBook modal....");

    // For User to whom book is issued.
    $scope.selectedUser = '';
    $scope.allUsers = allUsers;

    // For due date value.
    $scope.due_date = '';
    $scope.datepicker = {
        opened: false,
        options: {
            dateDisabled: disabled,
            formatYear: 'yyyy',
            maxDate: new Date(2020, 5, 22),
            minDate: new Date(),
            startingDay: 1
        }
    }

    // Disable weekend selection
    function disabled(data) {
        var date = data.date,
        mode = data.mode;
        return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    }

    $scope.openDatepicker = function(){
        $scope.datepicker.opened = true;
    }

    // For errors.
    $scope.showErrors = false;

    // For modal.
    $scope.close = function(){
        $uibModalInstance.dismiss();
    }

    $scope.save = function(isValid){
        if(isValid){
            var resultObj = {
                issued_to: $scope.selectedUser._id,
                due_date: $scope.due_date
            }
            
            $uibModalInstance.close(resultObj);
        }
        else{
            $scope.showErrors = true;
        }
    }

    
}]);