var http = require('http');
var formidable = require('formidable');
var fs = require('fs');

http.createServer(function (req, res) {
	if(req.url=="/fileupload"){
		var form = new formidable.IncomingForm();
		form.parse(req, function (err, fields, files) {
			var oldpath = files.filetoupload.path;
			var newpath = '/var/www/cryptfile/' + files.filetoupload.name;
			var exec = require('child_process').exec;
			exec('mv '+oldpath+' '+newpath, 
			function(err, stdout, stderr) {
				if (err) throw err;
				res.writeHead(200, {'Content-Type': 'text/html'});
        			res.write('File uploaded and moved!');
				res.write('</br>');
				res.write('<a href="http://cryptobox:8080/">TO RETURN TO THE MAIN PAGE</a>');
				res.end();
   			});
		});
	}
	else if(req.url=="/crypt"){
		var exec = require('child_process').exec;
		exec("sh /var/www/upload-server/umountCrypt.sh",
		function(err, stdout, stderr){
			console.log(err)
			res.writeHead(200,{'Content-Type':'text/html'});
			res.write("chiffre");
			res.write('</br><a href="http://cryptobox:8080/">TO RETURN TO THE MAIN PAGE</a>');
			res.end();
		});	
	}
	else{
		var form = new formidable.IncomingForm();
		form.parse(req, function(err, fields, files){
			console.log(fields.decrypt);
			password = fields.decrypt;
			var exec = require('child_process').exec;
			exec("sh /var/www/upload-server/mountCrypt.sh "+password,
			function(err,stdout,stderr){
				//if (err) throw err;
				res.writeHead(200, {'Content-Type':'text/html'});
				res.write("dechiffre");		
				res.write('</br><a href="http://cryptobox:8080/">TO RETURN TO THE MAIN PAGE</a>');
				res.end();
			});
		});	
	}
}).listen(8081); 
