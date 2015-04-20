var app = angular.module("miscServices", []);

app.service('dataService', function() {
    var data, queried;
    return {
        setData: function(queryData) {
            this.data = queryData;
            this.queried = false;
        },
        getData: function() {
            this.queried = true;
            return this.data;
        }
    };
});

app.service('sendPropertyService', function() {
    var data;
    return {
        setData: function(queryData) {
            this.data = queryData;
        },
        getData: function() {
            return this.data;
        }
    };
});