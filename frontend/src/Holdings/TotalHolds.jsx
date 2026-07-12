import './TotalHolds.css';

import { useState, useEffect } from "react";
import api from "../services/baseUrl";
import { useNavigate } from 'react-router-dom';
import { Currency } from '../services/currency';

export default function TotalHolds() {

  const [ holdings , setHoldings ] = useState([]);

  const navigate = useNavigate();

  const fetchHolding = async () =>{

    try{

      const response = await api.get("/holdings");

      setHoldings(response.data);
    }
    catch(error){

      console.log(error);

    }
  }

  useEffect(()=>{
    
    fetchHolding();
  },[])

  return (
    <div className="totalHolds p-3 m-3">
      <div className="row">
        <div className="col">
          <table className="table custom-table table-hover align-middle ">
            <thead>
              <tr>
                
                <th>Company</th>
                <th>Symbol</th>
                <th>Qty</th>
                <th>Avg Buy Price</th>
                <th>Current Price</th>
                <th>Invested</th>
                <th>Current Value</th>
                <th>P&L</th>
                <th>P&L %</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              
              { holdings.length === 0 ?
                 <tr><td colSpan="10" className="text-center py-4">No Holdings Found</td></tr>

                :holdings.map((holding) => {

                const invested = holding.avgBuyPrice * holding.quantity ;
                const currentValue = holding.stock.currentPrice * holding.quantity;

                const PandL = currentValue - invested;
                const pandLpercent = ((PandL / invested) * 100).toFixed(2);

                return (

                  
                 <tr key={holding.stock._id}>

                  <td>{holding.stock.companyName}</td>

                  <td>{holding.stock.symbol}</td>

                  <td>{holding.quantity}</td>

                  <td>{Currency(holding.avgBuyPrice)}</td>

                  <td>{Currency(holding.stock.currentPrice)}</td>

                  <td>{Currency(invested)}</td>

                  <td>{Currency(currentValue)}</td>

                  <td className={ PandL >= 0 ? "text-success" : "text-danger"} >
                    {Currency(PandL)}
                  </td>

                  <td className= { pandLpercent >= 0 ?"text-success fw-bold": "text-danger fw-bold"}>
                    {pandLpercent} %
                  </td>

                  <td><button className="btn btn-danger btn-sm" 
                        onClick={() => { navigate("/orders", {
                                  state: {
                                   holding: holding,
                                   type : "SELL"
                                  },
                                });
                        }}
                  
                  >Sell</button></td>

                 </tr>
                )

               })
              }

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
