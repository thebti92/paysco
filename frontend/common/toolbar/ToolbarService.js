var toolbarModule = angular.module('module.toolbar', []);

toolbarModule.factory('Toolbar', function($state, $rootScope) {

  var gui = require('nw.gui');
  var win = gui.Window.get();
  var file = new gui.Menu();
  var admin = new gui.Menu();
  
  var print = new gui.Menu();
  

  file.append(new gui.MenuItem({ label: 'Fermer',click:function(){
    win.close();
  }}));



   

//check if the user is an admin or not and then disable/enable some buttons
var enabled = false;
if($rootScope.user.object.admin==true){
  enabled = true;
}


  print.append(new gui.MenuItem({ label: "Imprimer l'ecran", click: function() {
       window.print();
  }}));


  

  admin.append(new gui.MenuItem({ label: 'Gerer les Niveaux/Prix', enabled: enabled, click: function() {
        $state.go('manage.level');
  }}));

  admin.append(new gui.MenuItem({ label: 'Gerer les Eleves', enabled: enabled, click: function() {
        $state.go('manage.manageStudent');
  }}));

  admin.append(new gui.MenuItem({ label: 'Gerer les Paiements', enabled: enabled, click: function() {
        $state.go('manage.managePayment');
  }}));


  admin.append(new gui.MenuItem({ type: 'separator' }));
  admin.append(new gui.MenuItem({ label: 'Gerer les Utilisateurs', enabled: enabled, click: function() {
        $state.go('manage.numFact');
  }}));

  admin.append(new gui.MenuItem({ label: 'Gerer les parametre', enabled: enabled, click: function() {
        $state.go('manage.param');
  }}));
  

  var menubar = new gui.Menu({ type: 'menubar' });

   menubar.append(new gui.MenuItem({ label: 'Fichier', submenu: file}));
   menubar.append(new gui.MenuItem({ label: 'Administration', submenu: admin}));
   menubar.append(new gui.MenuItem({ label: 'Imprimante', submenu: print}));
   

   win.menu = menubar;


return {

      Window: function() {
        return win;
      }
  }

});
/*

toolbarModule.controller('LoginController', function($scope,$rootScope,$state) {
  var gui = require('nw.gui');
  var win = gui.Window.get();

// Create an empty menu
var menu = new gui.Menu();

// Add some items
menu.append(new gui.MenuItem({ label: 'Item A' }));
menu.append(new gui.MenuItem({ label: 'Item B' }));
menu.append(new gui.MenuItem({ type: 'separator' }));
menu.append(new gui.MenuItem({ label: 'Item C' }));

var menubar = new gui.Menu({ type: 'menubar' });
 menubar.append(new gui.MenuItem({ label: 'File', submenu: menu}));
 win.menu = menubar;


$rootScope.user = {
  loggedin: false,
  object: {}
};

$scope.form = {
  username : 'admin',
  password: '0000'
};

$scope.logIn = function() {

    Auth.getUser($scope.form, function(user){
        if(user!=null){
          $rootScope.user.loggedin = true;
          $rootScope.user.object = user;
          $state.go('student');
        }
    });
};

});
*/
