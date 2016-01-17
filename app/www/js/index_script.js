var app = angular.module('app', [])
$root.scope.name='Bertand',
$root.scope.day='Vendredi'

// Contrôleurs pour tous les onglets //
app.controller('HomeController', ['$scope', function($scope) {
  $scope.home = {
	  title = 'Home',
	  content = 'Home content bla bla bla'
  };
    $scope.comments = {
	  title = 'Comments',
	  content = 'Comments content bla bla bla'
  };
    $scope.home = {
	  title = 'Activity',
	  content = 'Activity content bla bla bla'
  };
}])


// Directive gérant l'interaction avecles onglets
app.directive('myCustomer', function() {
  return {
    restrict: 'EA',
    scope: {title: '=expanderTitle'},
    template: '<div>' +
    '<div class="title" ng-click="toggle()">{{title}}</div>' +
    '<div class="body" ng-show="showMe" ng-transclude></div>' +
    '</div>',
    link: function(scope, element, attrs){
        scope.showMe = false;
        scope.toggle = function toggle(){
            scope.showMe = !scope.showMe;
        };
    }	
  };
});

