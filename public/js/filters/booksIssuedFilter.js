app.filter('booksIssuedFilter', function(){
    return function(items, filterOpt){
        var filteredArr = [];

        switch(filterOpt){
            case 'all':
                return items;
                break;
            
            case 'available':
                angular.forEach(items, function(value, key){
                    if(!value.is_issued){
                        filteredArr.push(value);
                    }
                });
                return filteredArr;
                break;

            case 'issued':
                angular.forEach(items, function(value, key){
                    if(value.is_issued){
                        filteredArr.push(value);
                    }
                });
                return filteredArr;
                break;
        }
    }
});