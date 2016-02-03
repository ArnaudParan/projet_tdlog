var myApp = angular.module('myApp', [])

myApp.controller('controllerTwo', ['$rootScope', function($rootScope){
  $rootScope.test="TEST REJECTED";
  $rootScope.$on('someEvent', function(){
    test = "TEST ACHIEVED";
  }
  );
}])

myApp.controller('controllerOne', ['$scope', '$rootScope', function($scope, $rootScope){
  $rootScope.$emit('someEvent');
}])