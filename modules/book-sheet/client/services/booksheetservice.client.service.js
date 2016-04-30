(function () {
  'use strict';

  angular
    .module('booksheet')
    .factory('bookSheetService', bookSheetService);

  bookSheetService.$inject = ['$resource'/*Example: '$state', '$window' */];

  function bookSheetService($resource /*Example: $state, $window */) {
    // Booksheetservice service logic
    // ...

    // Public API
    return $resource('/api/posts/:postId',{
      postId:'@_id'
    },{
      update:{
        method:'PUT'
      }
    });
  }
})();
