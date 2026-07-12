const Stock = require("../models/Stock");

module.exports.showallStocks = async(req,res) =>{

    try{
        const stocks = await Stock.find();

        return res.json(stocks);

    }
    catch(error){
        return res.status(500);
    }
    
}