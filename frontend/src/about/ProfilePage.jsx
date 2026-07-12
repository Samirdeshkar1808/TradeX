import Navbar from "../dashboard/Navbar";
import UserCard from "./UserCard";
import TradingSummary from "./TradingSummary";


export default function ProfilePage(){

    return(

        <>

            <Navbar/>

            <div className="container mt-4">

                <div className="row">

                    <div className="col-lg-4">

                        <UserCard/>

                    </div>

                    <div className="col-lg-8">

                       <TradingSummary/>

                    </div>

                </div>

            </div>

        </>

    );

}