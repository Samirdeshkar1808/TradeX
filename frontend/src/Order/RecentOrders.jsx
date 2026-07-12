import './RecentOrders.css'

import { useState , useEffect } from 'react';
import api from "../services/baseUrl";
import { Currency } from '../services/currency';

export default function RecentOrders() {

  const [orders , setOrders] = useState([]);

  const fetchOrders = async() =>{

    try{

      const response = await api.get("/order/recent");
      
      setOrders(response.data.orders);

    }
    catch(error){
      console.log(error);
    }
  }

  useEffect(()=>{
   fetchOrders();
  },[])

  return (
    <div className="recent-tab ">
      <h3>Recent Orders</h3>

      <div className="recent-orders p-3">
        <table className="table table-hover align-middle recent-table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Symbol</th>
              <th>Type</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Time</th>
            </tr>
          </thead>

          <tbody>

            {orders.length == 0 ? 
              (<tr><td colSpan="8" className="text-center">No Orders Yet</td></tr>)

              :( orders.map((order) =>(

                <tr key={order.stock._id}>

                  <td>{order.stock.companyName}</td>

                  <td>{order.stock.symbol}</td>

                  <td><button className={order.orderType === 'BUY' ? "badge bg-success":"badge bg-danger"}>{order.orderType}</button></td>

                  <td>{order.quantity}</td>

                  <td>{Currency(order.price)}</td>

                  <td>{Currency(order.price * order.quantity)}</td>

                  <td><button className={order.status === 'Completed' ? "badge bg-success":"badge bg-warning"}></button>{order.status}</td>

                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>

                </tr>
              )))
            
            }
          
          </tbody>
        </table>
      </div>
    </div>
  );
}
