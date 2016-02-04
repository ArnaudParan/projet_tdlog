var appModule = angular.module('appMod', ['onsen', 'jkuri.datepicker']);

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

/* CONTROLEUR PRINCIPAL*/

appModule.controller('globalController', ['$scope', function($scope) {

  /* LOGIN */

  /* Login variables */

  $scope.mail = "";
  $scope.pass = "";

  $scope.save_password = false;

   /* Login methods */

  $scope.save_password_switch = function()
  {
    $scope.save_password = !($scope.save_password);
    console.log($scope.save_password);
  }

  var login_attempt = function(mail, password, successCB, errorCB){
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

    $scope.confirm_log = function(mail, password, app_navi){
    login_attempt(mail, password, function()
      {
        app_navi.pushPage('index.html');
      });
  };

  /* INDEX */

  /* Index variables (initialized in callbacks) and methods */

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

  /* EVENT CONSULTATION */

  $scope.mod_event_req = false;

  $scope.switch_mod_event_req = function()
  {
    $scope.mod_event_req = !($scope.mod_event_req);
  }

}]);

/* Controleur temp, A SUPPRIMER */

appModule.controller('createEvent', ['$scope', function($scope) {
	$scope.create_event = {style: ""};
}]);

/* Controleur temp, A REMPLACER */

appModule.controller('hottestEvent', ['$scope', function($scope) {
	$scope.hottestEvent = {name: "L'art dans les productions françaises de jeu vidéo", address: "34 Quai d'Austerlitz", date: "31 Janvier 2016", latitude: 0., longitude: 0., chrono: "35min"}
}]);

/* Controleur local LOGIN */

appModule.controller('login_form', ['$scope', function($scope) {
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

/* Controleur local SIGNUP */

appModule.controller('signup_form', ['$scope', function($scope) {
  $scope.name = "";
  $scope.surname = "";
  $scope.tel = "";
  $scope.mail = "";
  $scope.pass = "";
  $scope.has_signed_up = false;
  $scope.sign_up_valid = false;

  $scope.wrong_mail = false;
  $scope.wrong_tel = false;
  
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
        if(err.code == 1002)
          $scope.wrong_mail = true;
        if(err.code == 1005)
          $scope.wrong_tel = true;
      });
    $scope.has_signed_up = true;
  };
}]);

/* Controleur consultation EVENT */

appModule.controller('eventConsController', ['$scope', function($scope) {

  $scope.event_friends_list = new Array();

  for(id of $scope.active_evt.participants)
  {
    localDB.get_friend_by_id(function(one_of_friends)
     {
        $scope.event_friends_list.push(one_of_friends);
     });
  }

}]);

/* Controleur création EVENT */

appModule.controller('eventController', ['$scope', '$rootScope', function($scope, $rootScope) {
  // Liste des amis de l'utilisateur
  localDB.get_all_friends_names_tel(function(friends_array)
  {
    $scope.friends = {
      all: friends_array,
      selected: Array(),
      };
     $scope.status = {
        selected: selectionArray(),
        style: styleArray()
     }  
  });
  
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
     localDB.search_friends(req, function(friends_array)
      {
        $scope.friends.all = friends_array;
      });
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
      swipe($scope.friends.selected, rk, rk+1);
      swipe($scope.invite.sent, rk, rk+1);
      swipe($scope.invite.accepted, rk, rk+1);
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
 
}]);
