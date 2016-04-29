(function () {
  'use strict';

  //Setting up route
  angular
    .module('book-sheet')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    // Book sheet state routing
    $stateProvider
      .state('bookSheet', {
        url: '/booksheet',
        templateUrl: 'modules/book-sheet/client/views/book-sheet.client.view.html',
        controller: 'BooksheetController',
        controllerAs: 'vm'
      });
  }
})();
