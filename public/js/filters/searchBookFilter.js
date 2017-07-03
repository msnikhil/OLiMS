app.filter('searchBookFilter', function(){
    return function(items, searchOpt, searchVal){
        var filteredArr = [];
        switch(searchOpt){
            case "name":
                angular.forEach(items, function(value, key){
                    if(value.name.toLowerCase().indexOf(searchVal.toLowerCase()) != -1){
                        filteredArr.push(value);
                    }
                });
                return filteredArr;
                break;

            case "author":
                angular.forEach(items, function(value, key){
                    if(value.author.toLowerCase().indexOf(searchVal.toLowerCase()) != -1){
                        filteredArr.push(value);
                    }
                });
                return filteredArr;
                break;
        }
    }
});