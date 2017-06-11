var http = require('http');
var util = require('util');
var fs = require('fs');

var readline  = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var path = "";
var port =0;

rl.question('What the path you want to be served ? ', function(ans)
{
	path += ans;
	console.log(`${path} has been selected `);

	rl.setPrompt(`What port to listen on?`);
	rl.prompt();

	rl.on('line', function(portClient){
		port= portClient;
		// re-write the port number
		console.log(`listening on port : ${port}`);
		rl.close();
	});
});

rl.on('close', function()
{
	var server = http.createServer(function(req, res)
	{

		res.writeHead(200, {"Content-type": "text/html"}); 
		// setting content type to accept HTML 


		fs.readFile(path,'UTF-8',function(err, data)
		{
			if(err){
				throw err;
			}
			res.end(data);

		});

	var ip = req.headers['x-forwarded-for'] || 
	req.connection.remoteAddress || 
	req.socket.remoteAddress ||
	req.connection.socket.remoteAddress;
	// getting the ip address of the client

	util.log(`${req.method} request sent to ${req.url} from ${ip}`);
	});


	server.listen(port);
});
