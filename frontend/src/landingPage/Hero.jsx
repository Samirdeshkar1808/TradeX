import { Link } from 'react-router-dom';

import './Hero.css'
export default function Hero(){

    return(
        <div className="container mt-5">

            <div className="row">

                <div className="col left p-4">
                    <h6 className="comment-line"  style={{width:"48%"}}>Smart Trading. Better Investing</h6>

                    <h1>
                        Invest Smarter ,<br/>
                        Trade Better
                    </h1>

                    <p className='hero-info'>TradeHub is a next-generation trading platform that helps you<br/> 
                        invest in stocks, track your portfolio, and grow your wealth<br/> 
                        with powerful tools and real-time insights.
                    </p>

                    <h5 className='mx-3'>Get SignUp Bonus of ₹50,000</h5>
                    <div className="hero-buttons mt-5">

                        <Link className='hero-signup' to={"/signup"}>Get Started For Free →</Link>
                        <Link className='hero-explore'>Explore Features →</Link>

                    </div>

                    <div className='highlights mt-5'>

                        <span className='custom-high'>Zero Account Opening Fee</span>
                        <span className='custom-high'>Real-time Market Data</span>
                        <span className='custom-high'>Secure & Reliable</span>

                    </div>
                </div>


                <div className="col right p-4">
                    <img className='hero-img'
                     src='/images/hero.png'
                    />
                </div>
            </div>
        </div>
    )
}