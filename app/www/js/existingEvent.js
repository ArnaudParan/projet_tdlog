var eventDisplayer = angular.module('eventDisplayer', ['onsen', 'jkuri.datepicker']);

swipe = function(arr, i, j){
	var tmp = arr[i];
	arr[i] = arr[j];
	arr[j] = tmp;
}

var geocoder;
var map;

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

eventDisplayer.controller('eventController', ['$scope', function($scope) {

  $scope.event_friends_list = new Array();

  for(id of $scope.active_evt.participants)
  {
    localDB.get_friend_by_id(function(one_of_friends)
     {
        $scope.event_friends_list.push(one_of_friends);
     });
  }

}])