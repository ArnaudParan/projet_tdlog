/* dependencies
 * 	|->../abstractExternalDB.js
 * 	|->../exceptions.js
 */

//namespace mock
if (typeof mock == "undefined") {
    var mock = {};
}

mock.external = {}

mock.external.externalDB = function()
{
    AbstractLocalDB.call(this);
};
mock.external.externalDB.prototype = new AbstractLocalDB();
mock.external.externalDB.prototype.currentId;
mock.external.externalDB.prototype.users;
mock.external.externalDB.prototype.events;
mock.external.externalDB.prototype.eventId;

mock.external.externalDB.prototype.log_user = function(mail, password, successCB, errorCB)
{
    errorCB = convertErrorCB(errorCB);
    successCB = convertSuccessCB(successCB);
    for (user of this.users) {
        if(user.mail == mail && user.password == password){
            successCB();
            return;
        }
    }
    errorCB(new CommonException(1000));
}

mock.external.externalDB.prototype.create_event = function(mail, password, event_name, addr, latitude, longitude, participantsId, date, successCB, errorCB)
{
    errorCB = convertErrorCB(errorCB);
    successCB = convertSuccessCB(successCB);
    var db_this = this;
    this.log_user(mail,
            password,
            function search_owner()
            {
                db_this.get_user_id(mail,
                    function push_event(owner)
                    {
                        db_this.eventId++;
                        var evt = new mock.external.Event(db_this.eventId,
                            event_name,
                            owner,
                            participantsId,
                            new Position(latitude, longitude),
                            addr,
                            date);
                        db_this.events.push(evt);
                        successCB(db_this.eventId);
                    },
                    error);
            },
            error);

    function error(err)
    {
        errorCB(err);
    }
}

mock.local.localDB.prototype.get_my_account_data = function(login, password, successCB, errorCB)
{
    errorCB = convertErrorCB(errorCB);
    successCB = convertSuccessCB(successCB);
    for (user of this.users) {
        if(user.mail == mail && user.password == password){
            successCB(user);
            return;
        }
    }
    errorCB(new CommonException(1000));
}

mock.external.externalDB.prototype.search_user = function(mail, password, keywords)
{
    //TODO returns an id if exists, and throws a CommonException(1003) if the user does not exist
}

mock.external.externalDB.prototype.set_pass = function(mail, password, new_password, successCB, errorCB)
{
    errorCB = convertErrorCB(errorCB);
    successCB = convertSuccessCB(successCB);
    var db_this = this;
    this.log_user(mail,
            password,
            function change_pass()
            {
                for (user of db_this.users) {
                    if (user.mail == mail) {
                        user.password = new_password;
                        successCB();
                        return;
                    }
                }
            },
            error);

    function error(err)
    {
        errorCB(err);
    }
}

mock.external.externalDB.prototype.add_user = function(name, surname, mail, tel, password, successCB, errorCB)
{
    errorCB = convertErrorCB(errorCB);
    successCB = convertSuccessCB(successCB);
    for (user of this.users) {
        if (user.mail == mail) {
            errorCB(new CommonException(1001));
            return;
        }
    }

    if (!this.is_mail(mail)) {
        errorCB(new CommonException(1002));
        return;
    }
    if (!this.is_tel(tel)) {
        errorCB(new CommonException(1005));
        return;
    }

    this.currentId++;
    var addedUser = new mock.external.User(this.currentId,
            name,
            surname,
            mail,
            tel,
            0., 0.,
            password);
    this.users.push(addedUser);
    successCB();
}

mock.external.externalDB.prototype.is_mail = function(mail)
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

mock.external.externalDB.prototype.is_tel = function(tel)
{
    var reg = new RegExp('^\\+[0-9]{11}$');

    if(reg.test(tel))
    {
        return true;
    }
    else
    {
        return false;
    }
}

mock.external.Event = function(id, name, owner, participants, position, address, date)
{
    this.id = id;
    this.name = name;
    this.owner = owner;
    this.participants = participants;
    this.position = position;
    this.address = address;
    this.date = date;
};
mock.external.Event.prototype.id;
mock.external.Event.prototype.name;
mock.external.Event.prototype.owner;
mock.external.Event.prototype.participants;
mock.external.Event.prototype.position;
mock.external.Event.prototype.address;
mock.external.Event.prototype.date;

var Position = function(latitude, longitude)
{
    this.latitude = latitude;
    this.longitude = longitude;
};
Position.prototype.latitude;
Position.prototype.longitude;

mock.external.User = function(id, name, surname, mail, tel, latitude, longitude, password)
{
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.mail = mail;
    this.tel = tel;
    this.position = new Position(latitude, longitude);
    this.password = password;
    this.friends_id = Array();
};

mock.external.User.prototype.id;
mock.external.User.prototype.name;
mock.external.User.prototype.surname;
mock.external.User.prototype.mail;
mock.external.User.prototype.tel;
mock.external.User.prototype.position;
mock.external.User.prototype.password;
mock.external.User.prototype.friends_id;

//externalDB inatialisation
mock.external.users = Array(
        new mock.external.User(0,
            "john",
            "doe",
            "john.doe@eleves.enpc.fr",
            "+336128745",
            0., 0.,
            "mot_de_passe"),
        new mock.external.User(1,
            "paran",
            "arnaud",
            "paran.arnaud@gmail.com",
            "+33650544817",
            0.1, 0.1,
            "captainjoke"),
        new mock.external.User(2,
            "lebastard",
            "simon",
            "simon.lebastard@eleves.enpc.fr",
            "+33750332043",
            0.2, 0.2,
            "youshallnotpass"),
        new mock.external.User(3,
                "gillier",
                "adele",
                "adele.gillier@eleves.enpc.fr",
                "+34567853159",
                0.3, 0.3,
                "vicose"),
        new mock.external.User(4,
                "soulier",
                "eloise",
                "eloise.soulier@eleves.enpc.fr",
                "+44865874520",
                0.4, 0.4,
                "deurdeurcoeur")
        );

        mock.external.users[0].friends_id = [1, 2, 3, 4];
        mock.external.users[1].friends_id = [0, 2];
        mock.external.users[2].friends_id = [0, 1];
        mock.external.users[3].friends_id = [0, 4];
        mock.external.users[4].friends_id = [0, 3];

        mock.external.events = Array(
        new mock.local.Event(1,
            "L'art dans les productions vidéoludiques françaises",
            mock.local.friends[2],
            mock.local.friends,
            new Position(0., 0.),
            "25 Quai d'Austerlitz",
            "05/02/2016"),
        new mock.local.Event(2,
            "Cinéma à Châtelet",
            2,
            [1, 2, 3, 4],
            new Position(0., 0.),
            "Gaumont Les Halles",
            "03/08/2016")               
        );

        mock.external.DB = new mock.external.externalDB();

        mock.external.DB.currentId = 4;
        mock.external.DB.eventId = 1;
        mock.external.DB.users = mock.external.users;
        mock.external.DB.friends = mock.external.friends;
        mock.external.DB.events = mock.external.events;
        mock.external.DB.eventId = 0;