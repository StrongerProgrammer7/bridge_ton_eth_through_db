// @ts-nocheck
const https = require('https');
const express = require('express');
const cors = require('cors');
const mysql = require('./routers/connectionMySQL');
const contract = require('./routers/deployeContract');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const dotenv = require('dotenv').config();
const pages = require('./routers/authRouters');
const controller = require('./controller/controller');
const errorHandler = require('./middleware/ErrorHandlingMiddleware');

const PORT = process.env.PORT || 3000;
const urlencodedParser = express.urlencoded({ extended: true });//для сессии
const app = express();

app.use(express.json());
app.use("/css", express.static(__dirname + "/public/css"));
app.use("/js", express.static(__dirname + "/public/js"));
app.use("/utils", express.static(__dirname + "/public/utils"));
app.use("/image", express.static(__dirname + "/public/image"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

app.engine('ejs', require('ejs-mate'));
app.set("view engine", 'ejs');
app.set("views", "./views");

app.use(cors({ origin: ['http://localhost:3000', 'http://localhost:5173'], credentials: true }));
app.use(function (req, res, next) 
{

    //res.header('Content-Type', 'application/json;charset=UTF-8')
    res.header('Access-Control-Allow-Credentials', true)
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    )
    //res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

app.use('/', pages);
app.use('/api', controller);

//Work with error
app.use(errorHandler)

const optionHTTPS =
{
    key: fs.readFileSync('certificates/certificate_localhost/cert-key.pem'),
    cert: fs.readFileSync('certificates/certificate_localhost/cert.pem')
}



const startServer = async function ()
{
    try 
    {
        mysql.connect(function (error)
        {
            if (error)
            {
                console.log('Unable to connect to the db: ', error);
                return console.error(error.message);
            }
            else
                console.log('Connection has been established successfully.');
        });

        https.createServer(optionHTTPS, app)
            .listen(PORT, () =>
            {
                console.log(`Server has been started on the port ${ PORT } and HTTPS and env=${ process.env.NODE_ENV }`)
            })
        // app.listen(PORT,() => console.log(`Server has been started on the port ${PORT} and env=${process.env.NODE_ENV}` )); 

    } catch (error) 
    {
        console.log(error);
        console.error(`Unable to connect to the server: ${ error }`);
    }
}

startServer();

//   // закрытие подключения
//   mysql.end(function(err) {
//     if (err) {
//       return console.log("Ошибка: " + err.message);
//     }
//     console.log("Подключение закрыто");
//   });

