(function() {
  'use strict';

  // Book sheet module config
  angular
    .module('booksheet')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // Config logic
    Menus.addMenuItem('topbar',{//define in core module
      title:'bookSheet',
      state:'bookSheet',
      type: 'dropdown',
      roles:['*']
    });

    Menus.addSubMenuItem('topbar', 'bookSheet', {
      title:'List Post',
      state:'bookSheet-list'
    });

    Menus.addSubMenuItem('topbar', 'bookSheet', {
      title:'Create new post',
      state:'bookSheet-create'
    });
  }
})();
