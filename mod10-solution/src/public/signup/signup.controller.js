(function () {
	"use strict";

	angular.module('public')
	.controller('SignupController', SignupController);

  SignupController.$inject = ['MenuService'];
	function SignupController(MenuService) {
    var signupCtrl = this;
    signupCtrl.infoSaved = false;

    signupCtrl.getMenuItem = function() {
      if (signupCtrl.menuNumber !== undefined) {
        MenuService.getMenuItem(signupCtrl.menuNumber)
          .then(function (menuItem) {
            signupCtrl.menuNotExist = false;
          })
          .catch(function (err) {
            console.log('Error:', err);
            signupCtrl.menuNotExist = true;
            signupCtrl.infoSaved = false;
          })
      }
    }

    signupCtrl.submit = function () {
      signupCtrl.infoSaved = true;
    }
	}

})();
