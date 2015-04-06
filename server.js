// Get the packages we need
var express = require('express');
var mongoose = require('mongoose');
var User = require('./models/User');
var Task = require('./models/Task');
var bodyParser = require('body-parser');
var router = express.Router();

//replace this with your Mongolab URL
mongoose.connect('mongodb://kanishkt:mongolab123@ds041861.mongolab.com:41861/mp3');

// Create our Express application
var app = express();

// Use environment defined port or 4000
var port = process.env.PORT || 4000;

//Allow CORS so that backend and frontend could pe put on different servers
var allowCrossDomain = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
  next();
};
app.use(allowCrossDomain);

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
  extended: true
}));

// All our routes will start with /api
app.use('/api', router);

//Default route here
var homeRoute = router.route('/');

homeRoute.get(function(req, res) {
  res.json({ message: 'Hello World!' });
});

//Llama route 
var UserRoute = router.route('/users');

UserRoute.get(function(req, res){
    exec(User, req.query, 100, function(err, users){
        console.log(users);
        res.json(users);
    });
});

UserRoute.post(function(req,res){
	var name= req.query.name;
	var email= req.query.email;
	var pendingTask= req.query.pendingTask;
	var a = new User ({"name":name,"email":email,"pendingTask":pendingTask,"date":Date.now()})
	a.save(function(err,a){
		if(err){
			console.log(err);
			res.send(err);
		}
		else{
			console.log("Save Successful");
			res.send("Save Successful");
		}
	})

});

UserRoute.options(function(req, res){
      res.writeHead(200);
      res.end();
});

var User2Route= router.route('/users/:id');

User2Route.get(function(req,res){
	var id = req.params.id;
	User.findOne({"_id":id}, function(err,users){
		if(err){
			console.log(err);
			res.send(err);
		}
		else if(!users) {
      		return res.status(404).json({
       			 message: 'User with id ' + id + ' can not be found.'
      	})
      }
		else
  			res.send(users);
  })
});

User2Route.put(function(req,res) {
    var id = req.params.id;
    var name= req.query.name;
	var email= req.query.email;
	var pendingTask= req.query.pendingTask;
	User.findByIdAndUpdate(id,{ $set: { "name":name,"email":email,"pendingTask":pendingTask,"date":Date.now()}},function(err,User){
		if(err){
			console.log(err);
			res.send(err);
		}
		else if(!User) {
      		return res.status(404).json({
       			 message: 'User with id ' + id + ' can not be found.'
      	})
      }
		else{
			console.log("Save Successful");
			res.send(User);
		}
	})
 });

User2Route.delete(function(req,res) {

	var id = req.params.id;
	User.remove({"_id":id},function(err,User){
		if(err){
			console.log(err);
			res.send(err);
		}
		else if(!User) {
      		return res.status(404).json({
       			 message: 'User with id ' + id + ' can not be found.'
      	})
      }
		else{
			console.log("Delete Successful");
			res.send("Delete Successful");
		}
	})
});

var TaskRoute = router.route('/tasks');

TaskRoute.get(function(req, res){
    exec(Task, req.query, 100, function(err, tasks){
        console.log(tasks);
        res.json(tasks);
    });
});

TaskRoute.post(function(req,res){
	var name= req.query.name;
	var description= req.query.description;
	var deadline= req.query.deadline;
	var completed = req.query.completed;
	var assignedUser = req.query.assignedUser;
	var assignedUserName = req.query.assignedUserName;
	var a = new Task({"name":name,"description":description,"deadline":deadline,"completed":completed,"assignedUser":assignedUser,"assignedUserName":assignedUserName,"dateCreated":Date.now()});
	a.save(function(err,a){
		if(err){
			console.log(err);
			res.send(err);
		}
		else{
			console.log("Save Successful");
			res.send("Save Successful");
		}
	})

});

TaskRoute.options(function(req, res){
      res.writeHead(200);
      res.end();
});

var Task2Route= router.route('/tasks/:id');

Task2Route.get(function(req,res){
	var id = req.params.id;
	Task.findOne({"_id":id}, function(err,tasks){
		if(err){
			console.log(err);
			res.send(err);
		}
		else if(!tasks) {
      		return res.status(404).json({
       			 message: 'Task with id ' + id + ' can not be found.'
      	})
      }
		else
  			res.send(tasks);
  })
});

Task2Route.put(function(req,res) {
  	var id = req.params.id;
  	var name= req.query.name;
	var description= req.query.description;
	var deadline= req.query.deadline;
	var completed = req.query.completed;
	var assignedUser = req.query.assignedUser;
	var assignedUserName = req.query.assignedUserName;
	if(assignedUser==undefined)
		assignedUser="";
	if(assignedUserName==undefined)
		assignedUserName="unassigned";
	Task.findByIdAndUpdate(id,{ $set: {"name":name,"description":description,"deadline":deadline,"completed":completed,"assignedUser":assignedUser,"assignedUserName":assignedUserName,"dateCreated":Date.now()}},function(err,Task){
		if(err){
			console.log(err);
			res.send(err);
		}
		else if(!Task) {
      		return res.status(404).json({
       			 message: 'Task with id ' + id + ' can not be found.'
      	})
      }
		else{
			console.log("Save Successful");
			res.send(Task);
		}
	})
 });

Task2Route.delete(function(req,res) {

	var id = req.params.id;
	Task.remove({"_id":id},function(err,Task){
		if(err){
			console.log(err);
			res.send(err);
		}
		else if(!Task) {
      		return res.status(404).json({
       			 message: 'User with id ' + id + ' can not be found.'
      	})
      }
		else{
			console.log("Delete Successful");
			res.send("Delete Successful");
		}
	})
});

function exec(model, query, limit, cb){
    model = model.find(JSON.parse(query.where || "{}"));
    if(query.sort) model.sort(JSON.parse(query.sort));
    if(query.select) model.select(JSON.parse(query.select));
    if(query.limit) model.limit(JSON.parse(query.limit) || limit);
    if(query.skip) model.skip(query.skip);
    if(query.count) model.count();
    model.exec(cb);
}


// Start the server
app.listen(port);
console.log('Server running on port ' + port);