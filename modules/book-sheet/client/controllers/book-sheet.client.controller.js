(function() {
  'use strict';

  angular
      .module('booksheet')
      .controller('BookSheetController', ['$scope', function ($scope) {
        $scope.posts = [{
          title: 'My first post',
          text: 'Hello world',
          author: {
            displayName: 'MeanUser'
          }
        }, {
          title: 'Another post',
          text: 'Mean JS is awesome',
          author: {
            displayName: 'JsUser'
          }
        }
        ];
      }
      ]);
}());
