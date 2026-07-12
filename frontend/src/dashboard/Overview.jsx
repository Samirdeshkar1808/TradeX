import './Overview.css'

import { useState , useEffect } from 'react';
import api from '../services/baseUrl';
import { Currency } from '../services/currency';


export default function Overview(){

    const [dashboardData , setDashboarData] = useState({});

    const fetchDashboard = async() =>{

        try{

            const response = await api.post("/dashboard");
           
            setDashboarData(response.data);
        }
        catch(err){

          console.log(err);

        }
    }

    

    useEffect(()=>{

       fetchDashboard();

    },[]);

    return (

        <div className="overview p-2">

            <h4 className='m-4'>Portfolio Overview</h4>

            <div className="row investInfo">

                <div className="col-5  total-portfolio">

                    <h6 >Total Portfolio Value</h6>
                    <h3>{Currency(dashboardData?.portfolioOverview?.portfolioValue)}</h3>

                </div>
                <div className="col">
                    <div className="d-flex align-items-center">
                        <img className="port-image me-1" src="images/analytics.png"/>
                        <span>
                            <h6 className='heading'>Total Invested</h6>
                            <h4>{Currency(dashboardData?.portfolioOverview?.investedAmount)}</h4>
                        </span>   
                    </div>           
                </div>
                <div className="col">
                    <div className="d-flex align-items-center">
                        <img className="port-image me-1" src="images/fastandeasy.png"/>
                        <span>
                            <h6 className='heading'>Total Returns</h6>
                            <h4>{Currency(dashboardData?.portfolioOverview?.totalReturns)}</h4>
                        </span>   
                    </div> 
                </div>
                <div className="col">
                    <div className="d-flex align-items-center">
                        <img className="port-image me-1" src="images/portfolioLogo.png"/>
                        <span>
                            <h6 className='heading'>Available Balance</h6>
                            <h4>{Currency(dashboardData?.portfolioOverview?.availableBalance)}</h4>
                        </span>   
                    </div> 
                </div>
                
            </div>
        </div>
    )
}