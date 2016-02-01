var appFriends = angular.module('appFriends', ['onsen']);

appFriends.controller('friend_Controller', ['$scope', '$rootScope', function($scope, $rootScope) {
  localDB.get_all_friends_names_tel(function(friends_list)
    {
      $scope.friends = friends_list;
    });
  $scope.request = ""; 
  $scope.add_request = false;
  $scope.search_a_friend = function(req){
	   localDB.search_friends(req, function(friends_list)
      {
        $scope.friends = friends_list;
      });
  };
  $scope.reset_request = function(){
	  $scope.request = "";
	   localDB.get_all_friends_names_tel(function(friends_list)
     {
      $scope.friends = friends_list;
     });
  };
}])

