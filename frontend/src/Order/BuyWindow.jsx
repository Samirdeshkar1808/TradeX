import './BuyWindow.css';
import { useState } from 'react';
import api from "../services/baseUrl";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Currency } from '../services/currency';

export default function BuyWindow({stock}){

    
    const [quantity, setQuantity] = useState(1);
    const totalAmount = stock.currentPrice * quantity;
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const handlebuy = async(e) =>{

        e.preventDefault();

        try{
            setLoading(true);
            const response = await api.post("/order/buy", {stockId: stock._id, quantity: quantity });
            setLoading(false);

            toast.success("Stock Buyed Successfully");

            setQuantity(1);

            navigate("/holdings");
        

        } catch (err) {

          console.log(err);

          toast.error(err.response?.data?.message || "Failed to buy stock" );

        }

    }



    return(
       
        <div className="buywindow ">

            <h3>Place Buy Order</h3>
            <p>Buy Stocks and grow your portfolio</p>

            <div className="company-info">
                <h4>{stock.companyName}</h4>
                <h5>₹{stock.currentPrice}</h5>
            </div>

            <form className='qtyform'>
                <label >Quantity</label>
                <br/>
                <input type="Number" min="1" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}/>


                <div className="totalamount">
                    <h5 className='totamt'>Total Amount</h5>
                    <h4>{Currency(totalAmount)}</h4>
                </div>

                <button disabled={loading} className="btn btn-success  buybtn" onClick={handlebuy}>Buy Now</button>

            </form>

        </div>
    );
}