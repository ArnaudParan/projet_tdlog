var app = angular.module('Friends', []);

var get_friends = mock_get_all_friends;

app.controller('Friend_Controller', ['$scope', function($scope) {
  $scope.friends = get_friends();
  $scope.test = true;
}])

app.controller('blabla', ['$scope', function($scope) {
  $scope.test = true;
}])

app.directive('Friend_Management', function() {
  return {
    restrict: 'EA',
    scope: {
      friend: '=friend'
    },
    templateUrl: 'friend_info.html'
  };
});

