const Stock = require("../models/Stock");
const axios = require('axios');

module.exports.updateStockPrices = async(req,res) =>{

    try{

        const stocks = await Stock.find();

        for(const stock of stocks){

            console.log(`Updating ${stock.symbol}...`);

            const response = await axios.get("https://api.twelvedata.com/quote", { 
                    params: {
                        symbol: `${stock.symbol}`,
                        apikey: process.env.DataAPIKey,
                    },
                }
            );
            
            const data = response.data;

            if (data.status === "error") {
                console.log(`${stock.symbol}: ${data.message}`);
                continue;
            }

            stock.currentPrice = Number(data.close);
            stock.dayHigh = Number(data.high);
            stock.dayLow = Number(data.low);
            stock.change = Number(data.change);
            stock.changePercent = Number(data.percent_change);
            stock.lastUpdated = new Date();

            await stock.save();

        }
        
        console.log("All Stocks Updated");

    }
    catch(error){

        console.log(error);
    }
}