const express = require('express');
const app = express();
const mongoose = require("mongoose");

const cors = require('cors');
require('dotenv').config() ;

const authroutes = require('./routes/authroutes');
const dashboardroutes = require('./routes/dashboardroutes');
const orderroutes = require("./routes/orderroutes");
const watchlistroutes = require("./routes/watchlistroutes");
const holdingsroutes = require("./routes/holdingsroutes");
const stocksroutes = require("./routes/stocksroutes");


const Stock = require("./models/Stock");
const Watchlist = require('./models/Watchlist');

app.use(express.json());

app.use(cors({
  origin: "https://trade-x-sepia.vercel.app/",
  credentials: true,
}));

const port = process.env.PORT || 8080;
const DBURL = process.env.MongoURL;


//Database connection
mongoose.connect(DBURL)
.then(() => {
    console.log("MongoDB Connected");
})
.catch((err) => {
 console.error("MongoDB Error:");
 console.error(err);
});

require('./services/stockCron');


app.use('/auth' , authroutes);

app.use('/dashboard' , dashboardroutes);

app.use('/order' , orderroutes);

app.use("/watchlist" , watchlistroutes);

app.use("/holdings" , holdingsroutes);

app.use("/stocks" , stocksroutes);


app.listen(port , () =>{
    
    console.log(`App listening on ${port}`);
});

