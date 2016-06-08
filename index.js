var express=require('express');
var app=express();
var port=process.env.PORT||8000;


var morgan=require('morgan');
var cookieParser=require('cookie-parser');
var bodyParser=require('body-parser');
var session=require('express-session');
var mongoose=require('mongoose');
var passport=require('passport');
var flash=require('connect-flash');


//configure databse
var configdb=require('./config/database.js');
mongoose.connect(configdb.url);

require('./config/passport')(passport);



//middlewares
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({secret: "maverick1",
                 saveuninitialised:true,
                 resave:true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


//set template engine
app.set('template engine','ejs');


//routes
require("./app/routes.js")(app,passport);


// app.use('/',function(req,res){
// 	res.send("First express project.");
// 	console.log(req.cookies);
// 	console.log(req.session);
// });


app.listen(port);
console.log("Server running on port "+port);


