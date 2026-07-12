import './HeroTop.css';

import { useState, useEffect } from "react";
import api from "../services/baseUrl";
import { Currency } from '../services/currency';

export default function HeroTop(){

    const [holdings , setHoldings] = useState([]);

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
  },[]);


  let totalInvestment = 0;
  let currentValue = 0;
  let PandL = 0;
  let PandLpercent = 0;

  holdings.map((holding)=>{

    totalInvestment += holding.avgBuyPrice * holding.quantity ;
    currentValue += holding.stock.currentPrice * holding.quantity;
  });
    
    PandL = currentValue - totalInvestment;
    PandLpercent = ((PandL / totalInvestment) * 100).toFixed(2);

    return(

        <div className="investments-hold p-3 m-3">

            <div className="hero-top">

              <h4>My Holdings</h4>
              <p>Track all your Investments and performance.</p>

            </div>

            <div className="invest-cards">

                <div className="row">

                    <div className="col money-card">
                        <p>Total Investment</p>
                        <h5>{Currency(totalInvestment)}</h5>
                    </div>
                    <div className="col money-card">
                        <p>Current Value</p>
                        <h5>{Currency(currentValue)}</h5>
                    </div>
                    <div className="col money-card">
                        <p>Total P&L</p>
                        <h5 className={ PandL >=0 ? "text-success":"text-danger"}>
                        {PandL >0 ? "+" : ""}{Currency(PandL)}
                        </h5>
                    </div>
                    <div className="col money-card">
                        <p>P&L %</p>
                        <h5>{PandLpercent}%</h5>
                    </div>
                </div>
            </div>


        </div>

        
    )
}