
import Cards from './Cards';
import './Features.css';

export default function Features(){

    return(

        <>

         <div className="heading text-center m-3">

            <h5 className='why-text'>Why TRADEX ?</h5>

            <h2 className='f-headline'>Powerful Features for Smart Traders</h2>

            <h6 className='need-text'>Everthing you need to trade , invest and manage your portfolio in one place.</h6>

         </div>

         <div className='allFeatures mt-4 mb-4'>
          
          <Cards 
           
           imgURL = "images/portfolioLogo.png"
           headline = "Portfolio Management"
           description = "Track your investments,monitor returns, and manage your portfolio effortlessly."
          />

          <Cards 
           
           imgURL =  "images/shield.png"
           headline = "Secure & Trusted"
           description = "Your data and investments are protected with bank-level security and encryption."
          />

          <Cards 
           
           imgURL = "images/realtimedata.png"
           headline = "Real time Market Data"
           description = "Get real-time stock prices, market trends, and detailed charts to make informed decisions."
          />

          <Cards  
           imgURL = "images/fastandeasy.png"
           headline = "Fast & Easy Trading"
           description = "Buy and sell stocks quickly with a smooth andintuitive trading experience."
          />

          <Cards  
           imgURL = "images/analytics.png"
           headline = "Advanced Analytics"
           description = "Analyze your performance with advanced charts, insights, and detailed reports."
          />

          <Cards 
           imgURL = "images/alert.png"
           headline = "Smart Alert"
           description = "Smart Alerts Set price alerts and get notified about market movements that matter to you."
          />

         </div>
        </>

        
    )


}