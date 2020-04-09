(function () {
	'use strict';

  angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .directive('foundItems', FoundItemsDirective);

  // Contoller
  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var self = this;

    self.found = [];
    self.nothingFound = false;

    self.narrow = function (searchTerm) {
      if (searchTerm) {
        MenuSearchService.getMatchedMenuItems(searchTerm)
        .then(function (result) {
          if (result === undefined || result.length == 0) {
            self.nothingFound = true;
            self.found = [];
          } else {
            self.nothingFound = false;
            self.found = result;
          }
        })
        .catch(function (err) {
          console.log('Error:', err);
        });
      } else {
        self.nothingFound = true;
        self.found = [];
      }
    };

    self.remove = function (index) {
      self.found.splice(index, 1);
    };
  }

  // Service
  MenuSearchService.$inject = ['$http'];
  function MenuSearchService($http) {
    var self = this;

    self.getMatchedMenuItems = function (searchTerm) {
      return $http({
        method: 'GET', 
        url: 'https://davids-restaurant.herokuapp.com/menu_items.json'
      }).then(function (result) {
        return result.data.menu_items.filter(item => item.description.toLowerCase().includes(searchTerm));
      });
    };
  }

  // Directive
  function FoundItemsDirective() {
    var ddo = {
      templateUrl: 'foundItems.html',
      scope: {
        items: '<',
        onRemove: '&'
      },
      controller: FoundItemsDirectiveController,
      controllerAs: 'ctrl',
      bindToController: true
    };
    return ddo;
  }

  // Directive Controller
  function FoundItemsDirectiveController() {
    var self = this;

    self.isEmpty = function () {
      return self.items.length == 0;
    }
  }
})();