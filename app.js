var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', index);
// app.use('/users', users);


// APIs
    var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost:27017/myDB');
    Events = require('./models/events.js');

    //-----POST EVENTS----------
    app.post('/events', function(req, res){
      var event = req.body;
      Events.create(event, function(err, events){
        if(err){
          throw err;
        }
        res.json(events);
      })
    });

    //-----GET EVENTS----------
    app.get('/events', function(req, res){
      Events.find(function(err, events){
        if(err){
          throw err;
        }
        res.json(events);
      })
    });

    //----DELETE EVENTS----------
    app.delete('/events/:_id', function(req, res){
      var query = { _id: req.params._id };
 
      Events.remove(query,function(err, events){
        if(err){
          throw err;
        }
        res.json(events);
      })
    });

    //---->>> UPDATE EVENTS <<<------
    app.put('/events/:_id', function(req, res){
      var event = req.body;
      var query = { _id: req.params._id };
      // if the field doesn't exist $set will set a new field
      var update = {
        '$set':{
          // title: event.title,
          date: event.date,
          description : event.description,
          venue: event.venue,
          time: event.time,
          no_of_people_involved: event.no_of_people_involved
        }
      };
      Events.updateMany(query, update, 
        function(err, events){
              if(err)
                throw err;
              res.json(events);
            })
    });
// END APIs

app.get('*', function(req, res){
  res.sendFile(path.resolve(__dirname,'public', 'index.html'))
  })

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});




module.exports = app;
