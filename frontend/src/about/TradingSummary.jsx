import { useEffect, useState } from "react";
import api from "../services/baseUrl";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Currency } from "../services/currency";

import "./TradingSummary.css"

export default function TradingSummary(){

    const [portfolio, setPortfolio] = useState({});
    const [holdings, setHoldings] = useState([]);
    const [watchlist, setWatchlist] = useState([]);
    const [orders, setOrders] = useState([]);

    const fetchData = async () => {

        try {

            const portfolioRes = await api.post("/dashboard");
            const holdingsRes = await api.get("/holdings");
            const watchlistRes = await api.get("/watchlist");
            const ordersRes = await api.get("/order/recent");

            setPortfolio(portfolioRes.data);
            setHoldings(holdingsRes.data);
            setWatchlist(watchlistRes.data);
            setOrders(ordersRes.data.orders);

        } catch (err) {

            console.log(err);

        }

    };

    useEffect(() => {

        fetchData();

    }, []);


    return(
        

        <div className="trading-info mt-4 p-4">


            <h4>Trading Summary</h4>

            <table className="table">

                        <tbody>

                            <tr className="account-info">
                                <td>Available Balance</td>
                                <td>{Currency(portfolio?.portfolioOverview?.availableBalance)}</td>
                            </tr>

                            <tr className="account-info">
                                <td>Invested Amount</td>
                                <td>{Currency(portfolio?.portfolioOverview?.investedAmount)}</td>
                            </tr>

                            <tr className="account-info">
                                <td>Stocks Owned</td>
                                <td>{holdings.length}</td>
                            </tr>

                            <tr className="account-info">
                                <td>Watchlist</td>
                                <td>{watchlist.length}</td>
                            </tr>

                            <tr className="account-info">
                                <td>Completed Orders</td>
                                <td>{orders.length}</td>
                            </tr>

                        </tbody>

                    </table>

        </div>
    )


}