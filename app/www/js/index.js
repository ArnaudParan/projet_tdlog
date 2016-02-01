var indexModule = angular.module('indexModule', ['onsen', 'jkuri.datepicker', 'ngRoute']);

var options = {
  animation: 'slide', // What animation to use
  onTransitionEnd: function() {} // Called when finishing transition animation
};

/*var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 8
  });
}
*/

indexModule.controller('globalController', ['$scope', function($scope) {
}])

indexModule.controller('createEvent', ['$scope', function($scope) {
	$scope.create_event = {style: ""};
}])

indexModule.controller('hottestEvent', ['$scope', function($scope) {
	$scope.hottestEvent = {name: "L'art dans les productions françaises de jeu vidéo", address: "34 Quai d'Austerlitz", date: "31 Janvier 2016", latitude: 0., longitude: 0., chrono: "35min"}
}])

indexModule.controller('selectionController', ['$scope', function($scope) {
}])

indexModule.controller('dropDownController', ['$scope', function($scope) {
	ons.ready(function() {
		ons.createPopover('popover.html').then(function(popover) {
			$scope.popover = popover;
    });
  });

  $scope.options = ['Load', 'Sync', 'Settings'];
}])

