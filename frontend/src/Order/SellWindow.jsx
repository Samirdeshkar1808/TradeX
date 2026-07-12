import './BuyWindow.css';
import { useState } from 'react';
import api from "../services/baseUrl";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


export default function SellWindow({holding}){


    const [quantity, setQuantity] = useState(1);
    const totalAmount = holding.stock.currentPrice * quantity;
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const handlesell = async(e) =>{

        e.preventDefault();

        if (quantity <= 0) {
            toast.error("Enter a valid quantity");
            return;
        }

        if (quantity > holding.quantity) {
            toast.error("You don't own that many shares.");
            return;
        }

        try{
            
            setLoading(true);
            const response = await api.post("/order/sell", {stockId: holding.stock._id, quantity: quantity });
            setLoading(false);

            toast.success("Stock successfully Selled");

            setQuantity(1);

            navigate("/holdings");
        

        } catch (err) {

          console.log(err);

          toast.error( err.response?.data?.message || "Failed to sell stock" );

        }

    }



    return(
       
        <div className="buywindow ">

            <h3>Place Sell Order</h3>
            <p> Sell your Holdings.</p>

            <div className="company-info">
                <h4>{holding.stock.companyName}</h4>
                <h5>₹{holding.stock.currentPrice}</h5>
                <p>
                    Available Quantity :
                    <strong> {holding.quantity}</strong>
                </p>

            </div>

            <form className='qtyform'>
                <label >Quantity</label>
                <br/>
                <input type="Number" min="1" max={holding.quantity} value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}/>


                <div className="totalamount">
                    <h5 className='totamt'>Total Amount</h5>
                    <h4>₹{totalAmount.toFixed(2)}</h4>
                </div>

                <button disabled={loading} className="btn btn-danger  sellbtn" onClick={handlesell}>Sell Now</button>

            </form>

        </div>
    );
}