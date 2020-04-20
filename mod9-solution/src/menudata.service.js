(function () {
	'use strict';

  angular.module('data')
    .service('MenuDataService', MenuDataService);

  MenuDataService.$inject = ['$http']
  function MenuDataService($http) {
    var self = this;

    self.getAllCategories = function () {
      return $http({
        method: 'GET', 
        url: 'https://davids-restaurant.herokuapp.com/categories.json'
      });
    };

    self.getItemsForCategory = function (categoryShortName) {
      return $http({
        method: 'GET', 
        url: 'https://davids-restaurant.herokuapp.com/menu_items.json?category=' + categoryShortName
      });
    };
  }
})();