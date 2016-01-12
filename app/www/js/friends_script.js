angular.module('docsTransclusionDirective', [])

var get_friends = mock_get_all_friends;

.controller('Friend_Controller', ['$scope', function($scope) {
  $scope.friends = get_friends();
}])
.directive('Friend_Management', function() {
  return {
    restrict: 'E',
    transclude: true,
	var friends_list_len = length(friends);
	
    templateUrl: 'my-dialog.html'
  };
});

