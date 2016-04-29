(function() {
  'use strict';

  angular
    .module('book-sheet')
    .controller('BookSheetController', BookSheetController);

  BookSheetController.$inject = ['$scope'];

  function BookSheetController($scope) {
    var vm = this;

    // Book sheet controller logic
    // ...

    init();

    function init() {
    }
  }
})();
