 var myApp = angular.module('myApp', []);
         
         myApp.directive('fileModel', ['$parse', function ($parse) {
            return {
               restrict: 'A',
               link: function(scope, element, attrs) {
                  var model = $parse(attrs.fileModel);
                  var modelSetter = model.assign;
                  
                  element.bind('change', function(){
                     scope.$apply(function(){
                        modelSetter(scope, element[0].files[0]);
                     });
                  });
               }
            };
         }]);
      
         myApp.service('fileUpload', ['$http', function ($http) {
            this.uploadFileToUrl = function(file, uploadUrl,$scope){
               var fd = new FormData();
               fd.append('userFile', file); 
            
               $http.post(uploadUrl, fd, {
                  transformRequest: angular.identity,
                  headers: {'Content-Type': undefined}
               })
            
               .success(function(response){
          $scope.res=response;
               })
            
               .error(function(){
                alert("try again");
               });
            }
         }]);
      
         myApp.controller('myCtrl', ['$scope', 'fileUpload', function($scope, fileUpload){
            $scope.uploadFile = function(){
               var file = $scope.myFile;
               console.dir(file);
               
               var uploadUrl = "/upload";
               fileUpload.uploadFileToUrl(file, uploadUrl,$scope);
            };
         }]);