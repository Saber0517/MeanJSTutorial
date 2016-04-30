(function () {
  'use strict';

  //Setting up route
  angular
    .module('booksheet')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    // Book sheet state routing
    $stateProvider
      .state('booksheet',{
        abstract: true,
        url:'<ui-view/>',
        data:{
          roles: ['user','admin']
        }
      })
      .state('bookSheet-create', {
        url: '/create',
        templateUrl: 'modules/book-sheet/client/views/book-sheet-create.client.view.html',
      })
      .state('bookSheet-list', {
        url: '',
        templateUrl: 'modules/book-sheet/client/views/book-sheet.client.view.html',

      });
  }
})();
