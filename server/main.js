const express = require("express");

const fs = require('fs');
const path = require('path');

const PORT = 3000;
const app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

// Route
app.get("/hello", (req, res) => {
  res.send("Hello world");
});

app.get("/", (req, res) => {
  res.sendFile('/index.html', {root:__dirname+'/..'})
});

app.get("/sku/:id", (req, res) => {
  var id = req.params.id;
	var fn = path.join(__dirname, '..', 'data', 'posts', id+".md");
	console.log(fn)

	fs.stat(fn, function(err, stat) {
		if(err == null) {
			var data = fs.readFileSync(fn, 'utf8');
			res.send(data);
			//fs.readFile(fn, (e, data) => {
			//	if (e) {res.send('read error')};
			//	res.send(data);
			//});
		} else if(err.code === 'ENOENT') {
			// file does not exist
			//fs.writeFile('log.txt', 'Some log\n');
			return res.send('file not found')
		} else {
			return res.send('file error')
		}
	});
});




// Middleware
app.use('/hello', (req, res, next) => {


  console.log('Request type: ', req.method);
  console.log('Request req all keys: ', Object.keys(req));
  console.log('Request res: ', Object.keys(res));

  console.log('Request query: ', req.query);
  console.log('Request params: ', req.params);

      next();
});

app.use('/static', express.static(path.join(__dirname,'..','src','static')));

app.use(function (req, res) {
    res.status(404).render('error');
});

// Run
app.listen(PORT, err => {
  if (err) console.log(err)
 console.log(`Server is listening on port: ${PORT}`);
});

