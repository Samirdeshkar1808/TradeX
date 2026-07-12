import Navbar from "../dashboard/Navbar";
import BuyWindow from "./BuyWindow";
import SellWindow from "./SellWindow";
import RecentOrders from "./RecentOrders";
import { useLocation } from "react-router-dom";


export default function OrderPage(){

    const location = useLocation();
    const stock = location.state?.stock;
    const holding = location.state?.holding;
    const type = location.state?.type;

    let orderWindow;

    if (type == "BUY") {

        orderWindow = <BuyWindow stock={stock} />;

    }else if (type === "SELL") {

        orderWindow = <SellWindow holding={holding} />;

    } else {

        orderWindow = (
            <h4 className="text-center mt-5">
                Select a stock from Watchlist or Holdings.
            </h4>
        );

    }

    return(

        <>

          <Navbar/>

          <div className="order-windows">

            <div className="row">

                <div className="col-5">
                    {orderWindow}
                </div>

                <div className="col-7">
                    <RecentOrders/>
                </div>
            </div>
          </div>
        </>

        
    )
}