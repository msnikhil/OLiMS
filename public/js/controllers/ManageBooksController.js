
app.controller('ManageBooksController', ['$scope', '$rootScope', 'apiService', '$uibModal', 'toaster',
 function($scope, $rootScope, apiService, $uibModal, toaster){

    //All scope variables at top
    $scope.searchInput = '';
    $scope.searchOpt = 'name';

    $scope.allBooks = [];
    $scope.addBook = function(){

        $scope.modalInstance = $uibModal.open({
            templateUrl: 'tpl/modals/addBook.html',
            controller: 'AddNewBookCtrl'
        });

        $scope.modalInstance.result.then(function(data){
            
            var sendData = {
                name: data.bookname,
                author: data.author
            }
            // Got book details now call addBook API.
            var addBookProm = apiService.addNewBook(sendData);

            addBookProm.then(function(resp){
                if(resp.data.status == 1){
                    toaster.pop("success","Book added to the system.");

                    // Add book to UI.
                    $scope.allBooks.push(resp.data.data);
                }
                else{
                    toaster.pop("error", resp.data.msg, "Please try again later.");
                }
            }, function(err){
                console.log("[Error] - addBook(), API failed");
                console.log(err);
                toaster.pop("error","Couldn't connect to the servers, please try again later.");
            });

        }, function(reject){
            console.log("Add Book modal dismissed...");
        });
    }

    $scope.removeBook = function(book_id){
        if(book_id){

            // Call removeBook API.
            var removeBookProm = apiService.removeBook(book_id);

            removeBookProm.then(function(resp){
                if(resp.data.status == 1){

                    // Remove book from UI.
                    let index = $scope.allBooks.map(function(item){ return item._id }).indexOf(book_id);
                    $scope.allBooks.splice(index, 1);

                    toaster.pop("success","Book removed from the system.");
                }
                else{
                    toaster.pop("error", resp.data.msg, "Please try again later.");
                }
            }, function(err){
                console.log("[Error] - removeBook(), API failed.");
                console.log(err);
                toaster.pop("error","Something went wrong, please try again later.");
            })
        }
        else{
            console.log("[Error] - removeBook(), book_id:", book_id);
            toaster.pop("error","Something went wrong please try again later");
        }
    }

    getAllBooks();

    //Implementations
    function getAllBooks(){
        var getAllBooksProm = apiService.getAllBooks();

        getAllBooksProm.then(function(resp){
            if(resp.data.status == 1){
                $scope.allBooks = resp.data.data.slice();
            }
            else{
                toaster.pop("error", resp.data.msg, "Please try again later.");
                console.log("[Error] - getAllBooks => Error in API resp.");
                console.log(resp.data);
            }
        }, function(err){
            console.log("[Error] - getAllBooks => API failed:");
            console.log(err);
            toaster.pop("error","Something went wrong, please try again later.");
        })
    }

    
 }]);

 app.controller('AddNewBookCtrl', ['$scope', '$uibModalInstance', function($scope, $uibModalInstance){

        $scope.bookName = '';
        $scope.authorName = '';
        $scope.showErrors = false;


        $scope.save = function(isValid){
            console.log("Inside save function....");
            if(isValid){
                var result = {
                    bookname: $scope.bookName,
                    author: $scope.authorName
                }

                $uibModalInstance.close(result);
            }
            else{
                $scope.showErrors = true;
            }
        }

        $scope.close = function(){
            console.log("Inside save function....");
            $uibModalInstance.dismiss();
        }
 }]);