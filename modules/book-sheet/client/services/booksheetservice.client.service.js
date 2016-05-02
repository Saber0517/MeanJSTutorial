(function () {
  'use strict';
  var bookSheetModule = angular
    .module('bookSheet');

  bookSheetModule.factory('BookSheetService', ['$resource', function ($resource) {

    return $resource('/api/posts/:postId', {
      postId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }]);

  bookSheetModule.factory('BookSheetStore', ['$resource', function ($resource) {
    var savedData = {};

    function set(data) {
      savedData = data;
    }

    function get() {
      return savedData;
    }

    return {
      set: set,
      get: get
    };
  }]);

})();
