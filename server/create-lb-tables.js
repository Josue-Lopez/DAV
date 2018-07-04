var server = require('./server');
var ds = server.dataSources.mysql;
var lbTables = ['User', 'AccessToken', 'ACL', 'RoleMapping', 'Role'];
ds.automigrate(lbTables, function(error){
	if(error)
		throw error;
	else
	{
		console.log('Loopback tables [' - lbTables - '] created in ', ds.adapter.name);
		ds.disconnect();
	}
});
