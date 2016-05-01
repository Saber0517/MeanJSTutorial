(function() {
  'use strict';

  angular
      .module('bookSheet')
      .controller('BookSheetController', ['$scope','BookSheetService','$location', function ($scope,BookSheetService,$location) {
        $scope.find = function () {
          $scope.posts = BookSheetService.query();
        };

        $scope.create = function (isValid) {
          $scope.error = null;


          if(!isValid){
            $scope.$broadcast('show-errors-check-validity','postForm');
            return false;
          }

          var post = new BookSheetService({
            title: $scope.title,
            text : $scope.text
          });

          post.$save(function(response){
            $scope.title = '';
            $scope.text = '';

            $location.path('/bookSheet');
          }, function (errorResponse) {
            $scope.error = errorResponse.data.message;
          });
        };


        $scope.delete = function (post) {
          if (post) {
            post.$remove();

            for (var i in $scope.posts) {
              if ($scope.posts[i] === post) {
                $scope.posts.splice(i, 1);
              }
            }
          }
        };
      }
      ]);
}());
