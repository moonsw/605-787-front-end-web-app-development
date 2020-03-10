(function () {
  'use strict';

  angular.module('LunchCheck', [])
  .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];
  function LunchCheckController($scope) {
    $scope.lunch = "";
    $scope.answer = "";
    $scope.class = "";

    $scope.checkLunch = function () {
      if (!$scope.lunch || $scope.lunch === "") {
        $scope.class = "red";
        $scope.answer = "Please enter data first"
      } else {
        $scope.class = "green";
        var lunchList = $scope.lunch.split(",");
        var filteredLunchList = lunchList.filter(function (item) {
          return item != null && item.trim() !== "";
        });
        if (filteredLunchList.length <= 3) {
          $scope.answer = "Enjoy!";
        } else {
          $scope.answer = "Too much!";
        }
      }
    };
  }
})();