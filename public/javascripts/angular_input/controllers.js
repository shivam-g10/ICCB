var controllers = {};
controllers.input = function ($scope, $http, FileUploader, $location) {
    /**
     * Setup
     */$http({
        method: 'GET',
        url: '/users'
    }).success(function (data) {

        $scope.state = data.message;
        if (!$scope.state) {
            $location.path('/login');
        }
        console.log($scope.state);
    });

    $scope.hide=function(d){
        return d.data;
    };
    $scope.setup = function () {
        $('.collapsible').collapsible({
            accordion: false
        });
        $http({
            method: 'GET',
            url: '/users'
        }).success(function (data) {

            $scope.state = data.message;
            if (!$scope.state) {
                $location.path('/login');
            }
            console.log($scope.state);
        });
        console.log($scope.state);
        $scope.admin = document.getElementById('test').value;
        console.log( document.getElementById('test').value);
        $http({
            method: 'GET',
            url: '/input/getAllUsers'
        }).success(function (data) {
            $scope.users= data;
            checkUserAbs();

        });


        if($scope.admin==true)
            {
            }else{
         //   checkSingle();
        }
    };
    var checkUserAbs = function(){
      for(var i=0;i<$scope.users.length;i++){
            if($scope.checkAbs($scope.users[i].abstract)){
                $scope.users[i].hidden = false;
            }else{
                $scope.users[i].hidden = true;
            }
        }
    };/*
    var checkSingle = function(){
        var abs = document.getElementById('abs').value;
        console.log(abs);
        var text = '';
        if(!$scope.checkAbs(abs)){
            text= "Please re-upload the abstract";
        }
        document.getElementById('reupload').innerHTML = text;
    };*/
    $scope.checkAbs = function(abs){
        var params = {
            abstract:abs
        };
        console.log(params);
        $http({
            method: 'GET',
            params:params,
            url: '/checkAbs'
        }).success(function (data) {
           return data;
        });
    };
    /**
     * Go to login
     */
    var completedEntry = function () {
        $location.path('/login');
    };
    var checkState = function (state) {
        $scope.state = state;
        if (!$scope.state) {
            $location.path('/login');

        }
        return state;
    };

};
controllers.login = function ($scope, $http, $location,FileUploader) {
    $http({
        method: 'GET',
        url: '/users'
    }).success(function (data) {

        $scope.state = data.message;
        if ($scope.state) {
            $location.path('/input');
        }
        console.log($scope.state);
    });
    $scope.setup = function () {
        $http({
            method: 'GET',
            url: '/users'
        }).success(function (data) {

            $scope.state = data.message;
            if ($scope.state) {
                $location.path('/input');
            }
            console.log($scope.state);
        });
        console.log($scope.state);
    };
    var checkState = function (state) {
        $scope.state = state;
        if ($scope.state) {
            $location.path('/input');
        }
        console.log(state);
        return state;
    };
    $scope.uploader = new FileUploader({
        url: '/upload'
    });
    $scope.addImage = function () {
        $scope.uploader.queue[0].upload();
    };

};
controllers.register = function($scope,$http){

};
app.controller(controllers);