(function() {
  'use strict';

  angular
      .module('bookSheet')
      .controller('BookSheetController', ['$scope','BookSheetService','BookSheetStore','$location','Authentication', function ($scope,BookSheetService,BookSheetStore,$location,Authentication) {
        $scope.user = Authentication.user;

        $scope.find = function () {
          $scope.posts = BookSheetService.query();
        };

        $scope.editPost = function (post) {
          console.log('test editPost');
          BookSheetStore.set(post);
          $location.path('/bookSheet/edit');
        };

        $scope.editInit = function () {
          $scope.posts = BookSheetStore.get();
          $scope.title = $scope.posts.title;
          $scope.text = $scope.posts.text;
        };

        $scope.edit = function (isValid) {
          $scope.error = null;

          if(!isValid){
            $scope.$broadcast('show-errors-check-validity','postForm');
            return false;
          }

          var post = new BookSheetService({
            _id :$scope.posts._id,
            author:$scope.posts.author,
            title: $scope.title,
            text : $scope.text
          });

          post.$update(function(response){
            $scope.title = '';
            $scope.text = '';
            $scope.posts = '';
            BookSheetStore.set('');

            $location.path('/bookSheet');
          }, function (errorResponse) {
            $scope.error = errorResponse.data.message;
          });
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
