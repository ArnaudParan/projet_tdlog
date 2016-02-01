/* dependencies
 * 	|->mock/localDBMock.js
 * 		|->abstractLocalDB.js
 * 	|->mock/externalDBMock.js
 * 		|->abstractExternalDB.js
 */

var server_address = "http://server/";
//var localDB = mock.local.DB;
var localDB = new localDBManager();
var externalDB = mock.external.DB;

var user_mail = localDB.get_user_mail();
var user_password = localDB.get_user_password();
