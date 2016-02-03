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

$scope.mail = "";
  $scope.pass = "";

  $scope.confirm_log = function(mail, password, app_navi){
    login_attempt(mail, password, function()
      {
        app_navi.pushPage('');
      });
  };

  $scope.save_password = false;

  $scope.save_password_switch = function()
  {
    $scope.save_password = !($scope.save_password);
    console.log($scope.save_password);
  }

var login_attempt = function(mail, password, successCB, errorCB)
{
  errorCB = convertErrorCB(errorCB);
  var mailIsCoherent = is_mail(mail);

  if (mailIsCoherent) {
    externalDB.log_user(mail, password, function()
        {
          console.log("%clogin attempt is successful", "color : green; font-style : italic");
          user_mail = mail;
          user_password = password;
          localDB.set_user_mail_pass(mail, password);
          successCB();
        },
        errorCB);
  }
  else {
    errorCB(new CommonException(2001));
  }
}

function is_mail(mail)
{
  var reg = new RegExp('^[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*@[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*[\.]{1}[a-z]{2,6}$', 'i');

  if(reg.test(mail))
  {
    return true;
  }
  else
  {
    return false;
  }
}


  localDB.get_all_events(function(db_event_list)
    {
      $scope.evt_list = db_event_list;
      console.log($scope.evt_list.length);
      $scope.active_evt = $scope.evt_list[0];
    });

  $scope.set_active_evt = function(rank, app_navi)
  {
    console.log("Test");
    if(rank < $scope.evt_list.length)
    {
        $scope.active_evt = $scope.evt_list[rank];
        app_navi.pushPage("existingEvent.html");
        console.log($scope.active_evt.name);
    } 
  }

}]);

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

indexModule.controller('login_form', ['$scope', function($scope) {
  $scope.mail = "";
  $scope.pass = "";

  $scope.confirm_log = function(mail, password, app_navi){
    login_attempt(mail, password, function()
      {
        app_navi.pushPage('index.html');
      });
  };

  $scope.save_password = false;

  $scope.save_password_switch = function()
  {
    $scope.save_password = !($scope.save_password);
    console.log($scope.save_password);
  };

}]);

var login_attempt = function(mail, password, successCB, errorCB)
{
  errorCB = convertErrorCB(errorCB);
  var mailIsCoherent = is_mail(mail);

  if (mailIsCoherent) {
    externalDB.log_user(mail, password, function()
        {
          console.log("%clogin attempt is successful", "color : green; font-style : italic");
          user_mail = mail;
          user_password = password;
          localDB.set_user_mail_pass(mail, password);
          successCB();
        },
        errorCB);
  }
  else {
    errorCB(new CommonException(2001));
  }
}

function is_mail(mail)
{
  var reg = new RegExp('^[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*@[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*[\.]{1}[a-z]{2,6}$', 'i');

  if(reg.test(mail))
  {
    return true;
  }
  else
  {
    return false;
  }
}

indexModule.controller('modEventController', ['$scope', function($scope) {
  $scope.mod_event_req = false;

  $scope.switch_mod_event_req = function()
  {
    $scope.mod_event_req = !($scope.mod_event_req);
  }
}])

indexModule.controller('signup_form', ['$scope', function($scope) {
  $scope.name = "";
  $scope.surname = "";
  $scope.tel = "";
  $scope.mail = "";
  $scope.pass = "";
  $scope.has_signed_up = false;
  $scope.sign_up_valid = false;
  $scope.confirm_form = function(name, surname, tel, mail, password)
  {
    //TODO check password
    externalDB.add_user(name, surname, mail, tel, password,
      function()
      {
        console.log("%caccount successfully created", "color : green; font-style : italic");
        $scope.sign_up_valid = true;
      },
      function(err)
      {
        console.log("%cerror while creating account", "color : red;");
        console.log(err);
      });
    $scope.has_signed_up = true;
  };
}]);