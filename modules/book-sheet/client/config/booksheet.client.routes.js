(function () {
  'use strict';

  //Setting up route
  angular
    .module('bookSheet')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    // Book sheet state routing
    $stateProvider
      .state('bookSheet',{
        abstract: true,
        url:'/bookSheet',
        templateUrl :'<ui-view/>',
        data:{
          roles: ['user','admin']
        }
      })
      .state('bookSheet.create', {
        url: '/create',
        templateUrl: 'modules/book-sheet/client/views/book-sheet-create.client.view.html',
      })
      .state('bookSheet.list', {
        url: '',
        templateUrl: 'modules/book-sheet/client/views/book-sheet-list.client.view.html',
      });
  }
})();
