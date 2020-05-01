	const express= require('express');
	const app= express();

	app.get('/', (request, response)=> {
		let podaci ={
			ip: request.ip,
			parametri: request.params,
			query: request.query
		};

		response.status(200);
		response.send(JSON.stringify(podaci));
	});
	app.get('/user/:username', (request, response)=> {
		let username=request.params.username;

		response.status(200);
		response.send('Dostavljam podatke za korisnika sa imenom:' + username);

	});

	app.use('/assets', express.static('assets/'));
	
	app.use( (request,response)=>{
		  response.status(404);
		  response.send('Page not found!');

	});
	app.listen(3000);


