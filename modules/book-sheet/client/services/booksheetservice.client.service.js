(function () {
  'use strict';

  angular
    .module('bookSheet')
    .factory('BookSheetService', BookSheetService);

  BookSheetService.$inject = ['$resource'/*Example: '$state', '$window' */];

  function BookSheetService($resource /*Example: $state, $window */) {
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
