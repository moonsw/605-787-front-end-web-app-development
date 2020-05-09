describe('Menu Item Exists Unit Test', function () {
  var $httpBackend;
  var ApiBasePath;
  var menuService;

  beforeEach(function () {
    module('common');

    inject(function ($injector) {
      menuService = $injector.get('MenuService');
      $httpBackend = $injector.get('$httpBackend');
      ApiBasePath = $injector.get('ApiPath');
    })
  })

  it('menu item exists', function () {
    var shortName = 'A1';
    $httpBackend.whenGET(ApiBasePath + '/menu_items/' + shortName + '.json').respond({name:'Item', short_name:'A1'});
    menuService.getMenuItem('A1')
      .then(function(menuItem) {
        expect(menuItem).toEqual({name:'Item', short_name:'A1'});
      });
    $httpBackend.flush();
  });

  it('menu item does not exist', function () {
    var shortName = 'A1';
    $httpBackend.whenGET(ApiBasePath + '/menu_items/' + shortName + '.json').respond(500, {});
    menuService.getMenuItem('A1')
      .catch(function(err) {
        expect(err.status).toEqual(500);
      });
    $httpBackend.flush();
  });
})