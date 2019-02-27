const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const rateLimit = require("express-rate-limit");
const helmet = require('helmet');
const cors = require("cors");
const passport = require("passport");
const os = require('os');


let  address;
let ifaces = os.networkInterfaces();

// Iterate over interfaces ...
for (let dev in ifaces) {
    // ... and find the one that matches the criteria
    let iface = ifaces[dev].filter(function(details) {
        return details.family === 'IPv4' && details.internal === false;
    });
    if(iface.length > 0) address = iface[0].address;
}

//Machines api
const N2 = require('./routes/api/n2_parts');
const N2_plus_50 = require('./routes/api/n2_plus_50_parts');
const N2_plus_150 = require('./routes/api/n2_plus_150_parts');

//user api 
const user = require('./routes/api/users');

//express app
const app = express();

// cross browser
app.use(cors());

//secure headers
app.use(helmet());

// for reversed proxy users
app.enable("trust proxy");

//limit the amount request api
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100
  });
app.use("/api/", apiLimiter);


//body-parser
app.use(bodyParser.json())

//config 
const config = require('./config/keys');

//db config 
const db = config.database;

//connect to database
mongoose
    .connect(db, {useNewUrlParser: true })
    .then(()=>{console.log('MongoDB Connected... ')})
    .catch(err=>{console.log('Error: ',  err)});


//passport auth
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

//use routes
app.use('/api/N2', N2);
app.use('/api/N2_plus_50', N2_plus_50);
app.use('/api/N2_plus_150', N2_plus_150);
app.use('/api/user', user);


// Port    
const port = process.env.port || 5000;
const hostname = '3dwave.fr'
app.get('/server', function(req, res) {
    res.json('yaaaaaaa');
  });


app.listen(port, ()=>{console.log('\x1b[36m%s\x1b[0m', 'Server Started on:')
                      console.log('\x1b[36m%s\x1b[0m', `             Local: http://localhost:${port}`);
                      console.log('\x1b[36m%s\x1b[0m', `             External: http://${address}:${port}`);
                      console.log('\x1b[36m%s\x1b[0m', `             Public: http://${hostname}:${port}`);
                    });

