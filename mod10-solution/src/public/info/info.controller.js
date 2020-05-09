(function () {
	"use strict";

	angular.module('public')
	.controller('InfoController', InfoController);

  InfoController.$inject = ['MenuService', 'ApiPath'];
	function InfoController(MenuService, ApiPath) {
    var infoCtrl = this;
    infoCtrl.basePath = ApiPath;
    infoCtrl.isRegisterd = MenuService.isRegisterd; 
    infoCtrl.signedUpMenuItem = MenuService.signedUpMenuItem;
	}

})();
