const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;
let users = [
	{
		name: 'Egor'
	},
	{
		name: 'Masha'
	},
	{
		name: 'Gagarin'
	}
];
const server = 	http.createServer((req, res) => {
	res.statusCode = 200;
	res.setHeader('Content-type','text/plain');
	const responseBody = users;
	if (req.method === 'GET') {
		res.write(JSON.stringify(responseBody));
		return res.end();
	};
	if (req.method === 'POST') {
		let body = '';
		req
			.on('data', (chunk) => {
				body = chunk;
			})
			.on('end', () => {
				body = JSON.parse(body.toString());
				users.push(body);
				res.write(JSON.stringify(users));
				return res.end();
			});
	};
	if (req.method === 'PUT') {
		let body = '';
		req
			.on('data', (chunk) => {
				body = chunk;
			})
			.on('end', () => {
				body = JSON.parse(body.toString());
				users = body;
				res.write(JSON.stringify(users));
				return res.end();
			});
	};
});
server.listen(port, hostname, () => {
	console.log(port,hostname);
});