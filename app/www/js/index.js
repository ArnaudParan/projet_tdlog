var indexModule = angular.module('indexModule', ['onsen', 'jkuri.datepicker']);

var options = {
  animation: 'slide', // What animation to use
  onTransitionEnd: function() {} // Called when finishing transition animation
};

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

indexModule.controller('createEvent', ['$scope', function($scope) {
	$scope.create_event = {style: ""};
	
}])

indexModule.controller('selectionController', ['$scope', function($scope) {
}])
