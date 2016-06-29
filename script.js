var app = angular.module("myApp", []);
app.controller("MainController", function($scope,$http) {
  $scope.uploadFiles = function () {
    $scope.fileSelected = function(files) {
      if (files && files.length) {
        $scope.file = files[0];
      }
   }
    var request = {
      method: 'POST',
      url: '/upload',
      data: $scope.file,
      headers: {
      'Content-Type': undefined
      }
    };
    $http(request).then(function (response){
      $scope.res = response.data; 
    },function (response){})
  }
});