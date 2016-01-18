var eventGenerator = angular.module('eventGenerator', ['onsen', 'jkuri.datepicker']);

swipe = function(arr, i, j){
	var tmp = arr[i];
	arr[i] = arr[j];
	arr[j] = tmp;
}

eventGenerator.controller('eventController', ['$scope', '$rootScope', function($scope, $rootScope) {
	// Liste des amis de l'utilisateur
  $scope.friends = {
	  all: localDB.get_all_friends_names_tel(),
	  selected: Array(),
	  };	
	  
	  $scope.status = {
		  selected: selectionArray(),
		  style: styleArray()
		  }
  
  function selectionArray(){
	  var ar = Array();    
	  for (key=0; key < $scope.friends.all.length; key++)
		  ar[key] = false;
	  return (ar);
  }
  
    function styleArray(){
	  var ar = Array();    
	  for (key=0; key < $scope.friends.all.length; key++)
		  ar[key] = {"background-color": "#fff"};
	  return (ar);
  }

  $scope.isSelected = function(key)
  {
	  return($scope.status.selected[key]);
  }

  // Details de l'evenement
  $scope.event = { title: "", date: new Date(), address: ""};
  
  // Requete renseignee dans le champ de recherche
  $scope.request = "";
  $scope.search_a_friend = function(req){
	  $scope.friends.all = localDB.search_friends(req);
  }
  $scope.addFriend2Selection = function(key,fri){
	  if(!$scope.isSelected(key))
	  {
		$scope.friends.selected.push(fri);
		$scope.invite.sent.push(false);
		$scope.invite.accepted.push(false);
		$scope.status.selected[key] = true;
		$scope.status.style[key] = {"background-color": "#d9d9d9"};
	  }
  }
  
  $scope.remove_from_event = function(key, fri){
	  var len = $scope.friends.selected.length;
	  for(rk=key; rk < len-1; rk++){
		  swipe($scope.friends.selected, rk, rk+1)
		  swipe($scope.invite.sent, rk, rk+1)
		  swipe($scope.invite.accepted, rk, rk+1)
	  }
	  $scope.friends.selected.pop();
	  $scope.invite.sent.pop();
	  $scope.invite.accepted.pop();
	  $scope.status.selected[key] = false;
	  $scope.status.style[key] = {"background-color": "#fff"};
  }  
  
  $scope.invite = {sent: Array(), accepted: Array()};

  $scope.display_invite_status = function(key){
	if(key < $scope.friends.selected.length)
	{
		if($scope.invite.sent[key])
		{
			if($scope.invite.accepted[key])
				return("Participates");
			else
				return("Invite sent");
		}
		else
			return("Sending invite");			
	}
  }
}])
