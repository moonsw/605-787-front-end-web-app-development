(function () {
	'use strict';

  angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService)
    .filter('Currency', CurrencyFilter);

  function Item(name, quantity, pricePerItem) {
    this.name = name;
    this.quantity = quantity;
    this.pricePerItem = pricePerItem;
  }

  // Controller for "to buy" list
  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    var self = this;

    self.list = ShoppingListCheckOffService.getToBuyList();

    self.buyItem = function (itemIndex, itemName, itemQuantity, itemPricePerItem) {
      ShoppingListCheckOffService.buyItem(itemIndex, itemName, itemQuantity, itemPricePerItem);
    }
  }

  // Controller for "bought" list
  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService', 'CurrencyFilter'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var self = this;

    self.list = ShoppingListCheckOffService.getBoughtList();
  }

  // Shopping list service
  function ShoppingListCheckOffService() {
    var self = this;

    // List of items to buy
    var toBuyList = [new Item('Hat', 1, 10), new Item('Shirt', 1, 20), new Item('Pants', 1, 20), new Item('Belt', 1, 10), new Item('Socks', 1, 5), new Item('Shoes', 1, 20)];
    // List of bought items
    var boughtList = [];

    // Buy item
    self.buyItem = function (itemIndex, itemName, itemQuantity, itemPricePerItem) {
      toBuyList.splice(itemIndex, 1);
      boughtList.push(new Item(itemName, itemQuantity, itemPricePerItem));
    }

    self.getToBuyList = function () {
      return toBuyList;
    }

    self.getBoughtList = function () {
      return boughtList;
    }
  }

  function CurrencyFilter() {
    return function (input) {
      input = input || "0";
      return "$$$" + input;
    }
  }
})();