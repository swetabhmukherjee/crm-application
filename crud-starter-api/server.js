const express = require('express')
const nodemailer = require('nodemailer')
const cron = require('node-cron')
// use process.env variables to keep private variables,
// be sure to ignore the .env file in github
require('dotenv').config()
// import Emailer from '../crud-starter-api/Emailer'
// Express Middleware
const helmet = require('helmet') // creates headers that protect from attacks (security)
const bodyParser = require('body-parser') // turns response into usable format
const cors = require('cors')  // allows/disallows cross-site communication
const morgan = require('morgan') // logs requests
const cookieParser = require('cookie-parser');
// db Connection w/ Heroku
// const db = require('knex')({
//   client: 'pg',
//   connection: {
//     connectionString: process.env.DATABASE_URL,
//     ssl: true,
//   }
// });

// nodemailer configuration

async function Emailer(cust_email,cust_name, cust_gst, rem_freq){

  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD

    }
  });

  let mailOptions = {

    from: 'thebongbrat@gmail.com',
    to: cust_email,
    subject: 'test email',
    text: 'hello '+cust_name+ ' with GST num '+cust_gst+ ', your reminder frequency is '+ rem_freq
  };

  transporter.sendMail(mailOptions, function(err, data){

    if(err){
      console.log('error',err);
    }
    else{
      console.log('email sent');
    }
  })
}



// db Connection w/ localhost
var db = require('knex')({
  client: 'pg',
  connection: {
    host : 'localhost',
    user : 'swetabhmukherjee',
    password : 'password',
    database : 'crm',
    port: 5432
  }
});

// Controllers - aka, the db queries
const main = require('./controllers/main')

// App
const app = express()

// App Middleware
const whitelist = ['http://localhost:3001']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(helmet())
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))
app.use(cookieParser())

app.use(morgan('combined')) // use 'tiny' or 'combined'

// App Routes - Auth
app.get('/', (req, res) => res.send('CRM API Endpoint'))
app.get('/crud', (req, res) => main.getTableData(req, res, db))
app.post('/crud', (req, res) => main.postTableData(req, res, db))
app.put('/crud', (req, res) => main.putTableData(req, res, db))
app.delete('/crud', (req, res) => main.deleteTableData(req, res, db))
app.post('/addConvo', (req, res) => main.addConvo(req, res, db))
app.post('/api/sendMail', (req,res) => {
  console.log(req.body)
  Emailer(req.body.cust_email,req.body.cust_name, req.body.cust_gst, req.body.rem_freq)

})

cron.schedule('* * * * *', () => {
  app.post('/api/sendMail', (req1,res1) => {
    console.log("ok")

    app.get('/crud', (req, res) => main.getTableData(req, res, db))
    console.log(res.body)
    console.log(res1.body)
    console.log(req1.body)
    Emailer(res.body.cust_email,res.body.cust_name, res.body.cust_gst, res.body.rem_freq)
  
  })
  
});

// App Server Connection
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is UP and running on port ${process.env.PORT || 3000}`)
})