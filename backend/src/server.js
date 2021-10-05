const express = require('express');
const morgan = require('morgan');
var cors = require('cors')
//init
const app = express();
require('dotenv').config();
//DB
require('./db/dbConnection');

//confs
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static('uploads'))
app.use(morgan('dev'));
app.use(cors())

//Routes
const playerRoutes = require('./routes/playersRoutes');

app.use('/players',playerRoutes)

app.get('/',(req,res)=>{
    res.send("Vikings app Home");
}); 

app.listen(process.env.PORT,()=>{
    console.log(`Server on port ${process.env.PORT}`);
});

