var database_name = "test";
var database_version = "1.0";
var database_displayname = "Test DB";
var database_size = 1000000;

var db = window.openDatabase(database_name, database_version, database_displayname, database_size);


//Database Creation
//User
//Friends
function db_create_friends_table(tx)
{
	tx.executeSql('CREATE TABLE IF NOT EXISTS friend (id, name, surname, tel, has_application, latitude, longitude)')
}
//Events
function db_create_events_table(tx)
{
	tx.executeSql('CREATE TABLE IF NOT EXISTS events (id, name, surname, tel, latitude, longitude)')
}
