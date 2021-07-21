var createError = require('http-errors');
var express = require('express');
var path = require('path');
const bodyParser = require('body-parser');
var mysql = require('mysql');
var session = require('express-session');


const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
	secret: 'E9A488751056C39625035C3680F7C829',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

module.exports = app;

//LOGIN 
var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'adminlogin'
});

app.post('/auth', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			if (String(results).length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect('/admin');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

app.get('/admin', function(request, response) {
	if (request.session.loggedin) {
		response.send('Welcome back, ' + request.session.username + '!' + '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta http-equiv="X-UA-Compatible" content="ie=edge"><title>Leaderboard</title><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css" integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" crossorigin="anonymous"></head><body><div class="container"><div class="jumbotron my-5"><h1 class="display-1">Admin-Page</h1><p class="lead">beep boop</p></div><div class="d-flex align-items-center justify-content-end"><button class="btn btn-primary" id="topTen">Refresh Top 10</button></div><div class="d-flex align-items-center justify-content-end"><button style="margin-top: 5px" class="btn btn-primary" id="allPlayers">Refresh all</button></div><table class="table mt-5"><thead><tr><th>Name</th><th>Score</th><th>Computer Score</th><th>Win Rate</th></tr></thead><tbody id="leaderboardTableBody"></tbody></table></div><script src="js/admin.js"></script></body></html>');
        
	} else {
		response.send('Please login to view this page!' + "<br><button style='margin-top: 15px; width: 20%; padding: 15px; background-color: #7f8386; border: 0; box-sizing: border-box; cursor: pointer; font-weight: bold; color: #000000;' onclick='window.open(`leaderboard.html`, `_parent`)'>Back to Leaderboard</button>");
	}
	response.end();
});

// DATABASE CONNECTION INFO
const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb+srv://LBRCSadmin:jtzGaty4Gu9Y9on3@lbrcscluster.l0qsr.mongodb.net/lbrcsCluster';
let db;

app.get('/', function(req, res) {
    res.send('RPSLS Leaderboard API');
 });

 (async () => {
    let client = await MongoClient.connect(
        url,
        { useNewUrlParser: true }
    );
 
    db = client.db('Players');
 
    app.listen(PORT, async function() {
        console.log(`Listening on Port ${PORT}`);
        if (db) {
            console.log('Database is Connected!');
        }
    });
 })();

 // CREATE NEW PLAYER
app.post('/players', async function(req, res) {
    // get information of player from POST body data
    let {username, score, computerScore, winRate} = req.body;

const alreadyExisting = await db
    .collection('players')
    .findOne({username:username});

if (alreadyExisting) {
    await db
        .collection('players')
        .updateOne({ username }, { $set: { username, score, computerScore, winRate } });
    console.log(`Player ${username} already existing. Score updated to ${score}`);
    res.send({ status: true, msg: 'user already existing - player score updated' });
} else {
    // create the new player
    await db.collection('players').insertOne({ username, score, computerScore, winRate });
    console.log(`Created Player ${username}`);
    res.send({ status: true, msg: 'player created' });
    }
 });

 // UPDATE PLAYER SCORE
app.put('/players', async function(req, res) {
    let { username, score, computerScore, winRate } = req.body;
    // check if the username already exists
    const alreadyExisting = await db
        .collection('players')
        .findOne({ username: username });
    if (alreadyExisting) {
        // Update player object with the username
        await db
            .collection('players')
            .updateOne({ username }, { $set: { username, score, computerScore, winRate } });
        console.log(`Player ${username} score updated to ${score}`);
        res.send({ status: true, msg: 'player score updated' });
    } else {
        res.send({ status: false, msg: 'player username not found' });
    }
 });

 // DELETE PLAYER ENTRY 
app.delete('/players', async function(req, res) {
    let { username, score, computerScore, winRate } = req.body;
    // check if the username already exists
    const alreadyExisting = await db
        .collection('players')
        .findOne({ username: username });
 
    if (alreadyExisting) {
        await db.collection('players').deleteOne({ username });
        console.log(`Player ${username} deleted`);
        res.send({ status: true, msg: 'player deleted' });
    } else {
        res.send({ status: false, msg: 'username not found' });
    }
 });

 // ACCESSING LEADERBOARD
app.get('/players', async function(req, res) {
    // retrieve ‘lim’ from the query string info
    let { lim } = req.query;
    db.collection('players')
        .find()
        // -1 is for descending and 1 is for ascending
        .sort({ winRate: -1 })
        // Show only [lim] players
        .limit(parseInt(lim))
        .toArray(function(err, result) {
            if (err)
                res.send({ status: false, msg: 'failed to retrieve players' });
            console.log(Array.from(result));
            res.send({ status: true, msg: result });
        });
 });

 // FETCH-API

 
 