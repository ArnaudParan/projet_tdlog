var appFriends = angular.module('appFriends', ['onsen']);

appFriends.controller('friend_Controller', ['$scope', function($scope) {
  $scope.test = true;
  $scope.friends = localDB.get_all_friends_names_tel();
}])

appFriends.controller('research_bar', ['$scope', function($scope) {
  $scope.request = ""; 
  //$scope.$watch($scope.request, search_a_friend_service);
}])

/*appFriends.factory('search_a_friend_service', ['$window', function(win){
   var msgs = [];
   return function(msg) {
     msgs.push(msg);
     if (msgs.length == 3) {
       win.alert(msgs.join("\n"));
       msgs = [];
     }
   };
}]);
*/