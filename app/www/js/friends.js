var appFriends = angular.module('appFriends', ['onsen']);

appFriends.controller('friend_Controller', ['$scope', '$rootScope', function($scope, $rootScope) {
  $scope.friends = localDB.get_all_friends_names_tel();
  $scope.request = ""; 
  $scope.add_request = false;
  $scope.search_a_friend = function(req){
	  $scope.friends = localDB.search_friends(req);
  }
    $scope.friend_request = function(){
	  $scope.add_request() = !$scope.add_request();
  }
}])

