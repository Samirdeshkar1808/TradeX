const Watchlist = require("../models/Watchlist");
const Stock = require("../models/Stock")

module.exports.addStock = async(req,res) =>{

    try{

        const { stockId } = req.body;

        const stock = await Stock.findById(stockId);

        if(!stock){

            return res.status(400).json({
                message : "Invalid Stock"
            });
        }
        
        const listexist = await Watchlist.findOne({stock : stockId , user : req.user.id});

        if(listexist){

            return res.status(201).json({ message:"Already Added" });

        }
        else{

           await Watchlist.create({ user:req.user.id, stock:stockId });

        }

        return res.status(201).json({
            message : "Added successfully"
        })
    }
    catch(error){

        return res.status(500).json({
            message:"Internal Server Error"
        })

    }
};

module.exports.getStock = async(req,res) =>{

 try{

    const stocks = await Watchlist.find({user : req.user.id}).populate("stock");

    return res.status(201).json(stocks);

 }
 catch(error){

    return res.status(500).json({
        message:"Internal Server Error"
    });

 }
    
}

module.exports.deleteStock = async(req,res) =>{

    try{

        await Watchlist.findOneAndDelete({user : req.user.id , stock : req.params.stockId});

        return res.status(201).json({
            message:"Removed !"
        });


    }
    catch(error){

        return res.status(500).json({
            message:"Server Error"
        })

    }
}