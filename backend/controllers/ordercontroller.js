const Stock = require("../models/Stock");
const Portfolio = require("../models/Portfolio");
const Holding = require("../models/Holdings");
const Order = require("../models/Orders");


module.exports.getRecentOrders = async(req,res) =>{

    try{

      const orders = await Order.find({ user:req.user.id }) .populate("stock").sort({createdAt:-1});

      return res.json({orders});
    }
    catch(error){

      return res.status(500);

    }
    
}

module.exports.buyStock =  async(req , res) =>{

    try{

        const { stockId, quantity} = req.body;
        
        const stock = await Stock.findById(stockId);

        if (!stock || !quantity || quantity <= 0) {

            return res.status(400).json({ success: false, message: "Invalid Stock or Quantity" });

        }


        const totalCost = stock.currentPrice * quantity;

        const portfolio = await Portfolio.findOne({ user:req.user.id});

        if(portfolio.availableBalance < totalCost){

            return res.status(400).json({ success:false, message:"Insufficient Balance" });

        }

    
        portfolio.availableBalance -= totalCost;
        portfolio.investedAmount += totalCost;

        await portfolio.save();



        let holding = await Holding.findOne({ user: req.user.id, stock: stockId });

        if(holding){
          
          const totalShares = holding.quantity + quantity;

          holding.avgBuyPrice = ( (holding.avgBuyPrice * holding.quantity) + totalCost) / totalShares;

          holding.quantity = totalShares;

          await holding.save();

        }else{
            
            holding = await Holding.create({ user: req.user.id, stock: stockId, quantity, avgBuyPrice: stock.currentPrice });
        }


        await Order.create({ user: req.user.id, stock: stockId, orderType: "BUY", 
                             quantity, price: stock.currentPrice, totalAmount: totalCost,status: "Completed" });
        
        

        return res.status(201).json({ 
            success: true, 
            message: "Stock Purchased Successfully", 
            portfolio, holding 
        });

    }
    catch(error){
        console.log(error);
    }
    

}

module.exports.sellStock = async(req,res) =>{

    try{

      const {stockId , quantity } = req.body;
      
      const stock = await Stock.findById(stockId);

      if(!stock || !quantity || quantity <= 0) {

        return res.status(400).json({ success: false, message: "Invalid Stock or Quantity" });

      }

      const holding = await Holding.findOne({ user: req.user.id, stock: stockId});

      if(!holding){

        return res.status(400).json({ success: false, message: "Stock not owned"});

      }

      if(quantity > holding.quantity){

        return res.status(400).json({ success:false, message:"Not enough shares" });
      }


      const totalAmount = stock.currentPrice * quantity;

      const portfolio = await Portfolio.findOne({ user:req.user.id});

      portfolio.availableBalance += totalAmount;

      portfolio.investedAmount -= holding.avgBuyPrice * quantity;

      await portfolio.save();


      holding.quantity -= quantity;

      if(quantity == 0){
        await Holding.findByIdAndDelete(holding.id);
      }

      await holding.save();

      await Order.create({ user:req.user.id, stock:stockId, orderType:"SELL", quantity,
                           price:stock.currentPrice,totalAmount, status:"Completed"
      });

      return res.status(201).json({ 
        success: true, 
        message: "Stock selled Successfully", 
        portfolio, holding 
      });

    }
    catch(error){
        console.log(error);
    }

}
