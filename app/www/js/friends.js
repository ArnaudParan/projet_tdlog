var appFriends = angular.module('appFriends', ['onsen']);

appFriends.controller('friend_Controller', ['$scope', '$rootScope', function($scope, $rootScope) {
  $scope.friends = localDB.get_all_friends_names_tel();
  $scope.request = ""; 
  $scope.search_a_friend = function(req){
	  console.log(req);
	  $scope.friends = localDB.search_friends(req);
  }
}])



