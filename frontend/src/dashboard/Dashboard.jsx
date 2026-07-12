import Navbar from "./Navbar"
import Overview from "./Overview"
import MarketStatus from "./MarketStatus"
import QuoteOfDay from "./QuoteOfDay"

export default function Dashboard(){

    return(
        <>
        <Navbar/>
        <Overview/>

        <div className="row p-3">
            <div className="col">
                <QuoteOfDay/>
            </div>
            <div className="col">
                <MarketStatus/>
            </div>
             
        </div>

        </>
    )
}