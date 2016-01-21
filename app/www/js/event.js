var eventGenerator = angular.module('eventGenerator', ['onsen', 'jkuri.datepicker']);

swipe = function(arr, i, j){
	var tmp = arr[i];
	arr[i] = arr[j];
	arr[j] = tmp;
}

var geocoder;
var map;
var search_position = Array();

initialize = function() {
  geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(-34.397, 150.644);
  var mapOptions = {
	zoom: 8,
    center: latlng
  }
  map = new google.maps.Map(document.getElementById("map"), mapOptions);
}

codeAddress = function() {
  var address = document.getElementById("search_address").value;
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
		search_position = results[0].geometry.location;
      map.setCenter(search_position);
      var marker = new google.maps.Marker({
          map: map,
          position: search_position
      });
    } else {
      alert("Geocode was not successful for the following reason: " + status);
    }
  });
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
  $scope.event = { title: "", date: new Date(), address: "", latitude: 0., longitude: 0.};
  
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
  
  function update_position_in_controller(){
	  $scope.event.latitude = search_position[0];
	  $scope.event.longitude = search_position[1];
  }
  
  $scope.$watch(search_position, update_position_in_controller);
  
/*  $scope.createEvent = function()
  {
	  var mail = localDB.get_user_mail();
	  var password = localDB.get_user_password();
	  var participantsId = Array();
	  for (friend of friends.selected)
	  {
		  his_tel = friend.tel;
		  his_id = localDB.get_friend_id_by_tel(tel);
		  participantsId.push(his_id);
	  }
	  var this_event = externalDB.create_event(mail, password, $scope.event.title, $scope.event.address, latitude, longitude, participantsId, date)
  } */
  
  $scope.onKeyDown = function ($event) {
		var key = window.event ? keyEvent.keyCode : keyEvent.which;
		if(key == 13)
		{
			codeAddress();
		}
    };
 
}])
