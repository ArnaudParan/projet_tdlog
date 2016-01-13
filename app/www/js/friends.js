var appFriends = angular.module('appFriends', ['onsen']);

appFriends.controller('friend_Controller', ['$scope', function($scope) {
  $rootscope.friends = get_friends();
  $scope.test = true;
}])

appFriends.controller('research_bar', ['$scope', function($scope) {
  $scope.request = "";
}])

appFriends.directive('friendFilter', function() {
  return {
    restrict: 'E',
    scope.$watch(request, function(){
		friends = get_matching_friends(request);
	});
});
