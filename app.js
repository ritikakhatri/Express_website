var express = require('express');

var path = require('path');

var bodyParser = require('body-parser');

var nodeMailer = require('nodemailer');

var app = express();

app.set('views',path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function(req,res){
	console.log('Hello World');
	res.render('index',{title:'Hello World'});
});


app.get('/about', function(req,res){
	console.log('Hello World');
	res.render('index');
});
app.get('/contact', function(req,res){
	console.log('Hello World');
	res.render('contact');
});

app.post('/contact/send', function(req, res){
	var transporter = nodeMailer.createTransport({
		service: 'Gmail',
		auth: {
			user: 'ritikakhatri17@gmail.com',
			pass: 'Abhi2Rattu'
		}
	});

	var mailOptions = {
		from: 'Brad Traversy <techguyinfo@gmail.com>',
		to: 'abhinay.rohatgi@gmail.com',
		subject: 'Website Submission',
		text: 'You have a submission with the following details... Name: '+req.body.name+'Email: '+req.body.email+ 'Message: '+req.body.message,
		html: '<p>You have a submission with the following details...</p><ul><li>Name: '+req.body.name+'</li><li>Email: '+req.body.email+'</li><li>Message: '+req.body.message+'</li></ul>'
	};

	transporter.sendMail(mailOptions, function(error, info){
		if(error){
			console.log(error);
			res.redirect('/');
		} else {
			console.log('Message Sent: '+info.response);
			res.redirect('/');
		}
	});
});


app.listen(3000);

console.log('Server is running on port 3000');