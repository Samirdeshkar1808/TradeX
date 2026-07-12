import "./NewStocks.css";
import api from "../services/baseUrl";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Currency } from "../services/currency";

export default function NewStocks() {
  const [stocks, setStocks] = useState([]);
  const [watchlist, setWatchlist] = useState([]);

  const navigate = useNavigate();

  const fetchStocks = async () => {
    try {
      const response = await api.get("/stocks");

      setStocks(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchWatchlist = async () => {
    try {
      const response = await api.get("/watchlist");

      setWatchlist(response.data);
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStocks();
    fetchWatchlist();
  }, []);

  const handleAdd = async (stockId) => {
    try {
      const responseadd = await api.post("/watchlist/add", { stockId });
      toast.success("Stock Added to Watchlist");
      fetchWatchlist();

    } catch (err) {
      console.log(err);

      toast.error(err.response?.data?.message || "Unable to add stock");
    }
  };

  const handleRemove = async (stockId) => {
    try {
      const responsedelete = await api.delete(`/watchlist/${stockId}`);
      toast.success("Stock removed Successfully");
      fetchWatchlist();
    }
    catch (error){
        console.log(error);

        toast.error(error.response?.data?.message || "Unable to remove stock");

    }
  };

  const isAdded = (stockId) => {
    return watchlist.some((item) => item.stock._id === stockId);
  };

  return (
    <div className="row">
      <div className="col-6">
        <div className="mywatchlist p-3">
          <div className="row">
            <div className="col-8">
              <h4>My WatchList</h4>
              <p className="suggest-text">Track your favourite Stocks and opportunities.</p>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <table className="table custom-table table-hover align-middle ">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Change</th>
                    <th>%Change</th>
                    <th>Buy</th>
                  </tr>
                </thead>

                <tbody>
                  {watchlist.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center">
                        No Stocks Added
                      </td>
                    </tr>
                  ) : (
                    watchlist.map((item) => (
                      <tr key={item.stock._id}>
                        <td>{item.stock.symbol}</td>
                        <td>{Currency(item.stock.currentPrice)}</td>
                        <td className="text-success">{Currency(item.stock.change)}</td>
                        <td className="text-success">
                          {item.stock.changePercent.toFixed(2)} %
                        </td>
                        <td>
                          <button
                            className="btn btn-success btn-sm"
                            onClick={() => {
                              console.log("Buy clicked");
                              navigate("/orders", {
                                state: {
                                  stock: item.stock,
                                  type: "BUY",
                                },
                              });
                            }}
                          >
                            Buy
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="col-6">
        <div className="new-stocks p-3">
          <div>
            <h4>All Stocks</h4>
          </div>

          <table className="table custom-table table-hover align-middle ">
            <thead>
              <tr>
                <th>Company</th>
                <th>Price</th>
                <th>Change</th>
                <th>%Change</th>
                <th>Add toWatchList</th>
              </tr>
            </thead>

            <tbody>
              {stocks.map((stock) => (
                <tr key={stock._id}>
                  <td>{stock.companyName}</td>
                  <td>{Currency(stock.currentPrice)}</td>
                  <td>{Currency(stock.change)}</td>
                  <td>{stock.changePercent.toFixed(2)} %</td>
                  <td>
                    {isAdded(stock._id) ? (
                      <button className="btn btn-danger btn-sm Delete-add"
                      onClick={() => handleRemove(stock._id)}
                      >
                        Remove
                      </button>
                    ) : (
                      <button
                        className="btn btn-success btn-sm watch-add"
                        onClick={() => handleAdd(stock._id)}
                      >
                        Watch+
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
