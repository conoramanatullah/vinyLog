(function(){
  angular.module('App', ['ngMaterial'])
  .config(function($mdThemingProvider){
    $mdThemingProvider.theme('default')
      .primaryPalette('cyan')
      .accentPalette('pink')
      .dark();
  })
  .factory('Data', function(){
    var database;
    var config = {
      apiKey: "AIzaSyDklvJjIW1cwHTfSvX9r7vvl5x-2Bo5GZI",
      authDomain: "vinylcatalogue.firebaseapp.com",
      databaseURL: "https://vinylcatalogue.firebaseio.com",
      storageBucket: "vinylcatalogue.appspot.com",
      messagingSenderId: "243547767378"
    };
    firebase.initializeApp(config);
    database = firebase.database();
    return database
  })
  .controller('MainController', function($scope, $mdSidenav, $mdMedia, Data){



    $scope.leftMenuOpen = function(){
      $mdSidenav('left').toggle();
    }

    $scope.addRecord = function(){
      console.log($scope.record);
      Data.ref().push($scope.record);
      $scope.success = true;
      setTimeout(function(){
        $scope.success = false;
      }, 1000)
      $scope.record = null;
    }

    $scope.deleteEntry = function(record){
      console.log(record);
      console.log("removing entry");
      // Data.ref(record).remove();
    }

    $scope.init = function(){
      Data.ref().on('value', function(snapshot){
        $scope.records = snapshot.val()
      });
    }



  });
})();
