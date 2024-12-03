const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const AuthRouter = require('./Routes/AuthRouter')
const ProductRouter = require("./Routes/ProductRouter")

require('./Models/db');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 5000;


app.use(express.json());
app.use(cors());

app.use('/auth',AuthRouter );
app.use("/products",ProductRouter);


app.listen(PORT,()=>{
    console.log(`Server is Running on Port ${PORT}`);
})