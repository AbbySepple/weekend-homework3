//requires
var express = require( 'express' );
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var pg = require('pg');

//uses
app.use(express.static('public') );
app.use(bodyParser.urlencoded( { extended: true} ) );

//set up config for pool
var config = {
  database: 'checklist',
  host: 'localhost',
  port: 5432,
  max: 20
};

//create pool
var pool = new pg.Pool(config);

//server listening on...
app.listen(4003, function(){
  console.log('you are in the server');
});//

//function connected and requesting and responding
app.get('/thisListSoFar', function(req, res){
  console.log('inside this list so far');
  // res.sendStatus(200); was working
  var allItems = [];
  // connect to db
  pool.connect( function( err, connection, done ){
    //check if there was an Error
    if( err ){
      console.log( err );
      // respond with PROBLEM!
      res.send( 400 );
    }// end Error
    else{
      console.log('connected to db');
      // send query for all items in the 'checklist' table and hold in a variable (resultSet)
      var resultSet = connection.query( "SELECT * from checklist" );
      // convert each row into an object in the allItems array
      // on each row, push the row into allItems
      resultSet.on( 'row', function( row ){
        allItems.push( row );
      }); //end on row
      // on end of rows send array as response
      resultSet.on( 'end', function(){
        // close connection to reopen spot in pool
        done();
        // res.send array
        res.send( allItems );
      }); //end on end
    } // end no error
  }); //end pool
}); //end


//delete
//work on this, it no work!!!!
app.delete ('/deleteThisItem', function (req, res){
  pool.connect( function( err, connection, done ){
    //check if there was an Error
    if( err ){
      console.log( err );
      // respond with PROBLEM!
      res.send( 400 );
    }// end Error
    else{
      console.log('connected to db');
      // send query for all items table and hold in a variable (resultSet)
      connection.query( "DELETE from list where id = " + req.body.id );
      res.sendStatus(200);

      done ();
    } // end no error
  }); //end pool
});//end app.delete


//add item
app.post('/addingItem', function(req, res) {
  var data = req.body;
  var insertVals = [
    data.itemid
  ];
  var insertStr = 'INSERT INTO checklist(listeditem) VALUES ($1)'
  pool.connect(function(err, connection, done){
    if(err){//is it possible to have the err in the else statment and the
      console.log(err);//connection.query in the if statement
      res.send(400);
    }
    else{
      connection.query(insertStr, insertVals);
      done();
      res.send(200);
    }
  });
}); // end of app.post

//update/complete
app.post('/update', function(req,res){
  console.log('in update post');
  var updates = req.body;
  pool.connect(function(err, connection, done){
    if(err){
      console.log(err);
      res.send(400);
    }
    else{
      console.log('this is req.body ' , req.body);
      console.log();
      connection.query();
      done();
      res.sendStatus(200);

    }
  });
});
