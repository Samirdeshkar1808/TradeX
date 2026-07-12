const Portfolio = require('../models/Portfolio');
const Holding = require('../models/Holdings');
const Watchlist = require('../models/Watchlist');
const Order = require('../models/Orders');


module.exports.getdashboard = async(req , res) =>{

    try{

        const userId = req.user.id;

        const portfolio = await Portfolio.findOne({ user:userId });

        const holdings = await Holding.find({user: userId}).populate("stock"); 

        const watchlist = await Watchlist.find({ user:userId }).populate("stock");

        const recentOrders = await Order.find({ user:userId }).populate("stock").sort({createdAt:-1}).limit(5);

        //portfolio overview calulations
        let portfolioValue = 0;

        holdings.forEach((holding) =>{

            portfolioValue += holding.quantity * holding.stock.currentPrice;

        });

        const totalReturns = portfolioValue - portfolio.investedAmount;

        return res.status(200).json({
            success:true,
            portfolioOverview : {
                availableBalance : portfolio.availableBalance.toFixed(2),
                investedAmount: portfolio.investedAmount.toFixed(2),
                portfolioValue : portfolioValue.toFixed(2),
                totalReturns : totalReturns.toFixed(2),
            },
            holdings,
            watchlist,
            recentOrders

        });

    }catch(error){

        console.error(error);

        return res.status(500).json({

          success:false,

          message:"Internal Server Error"

        });

    }
}