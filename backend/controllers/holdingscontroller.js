const Holding = require("../models/Holdings");

module.exports.getHoldings = async(req ,res) => {

    try{

        const holdings = await Holding.find({user: req.user.id}).populate("stock");

        return res.json(holdings);

    }
    catch(error){

        return res.status(500).json({
            message : "Internal Server Error"
        })
    }

}