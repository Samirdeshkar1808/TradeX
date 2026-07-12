import "./MarketStatus.css"
export default function MarketStatus() {

    const now = new Date();

    const day = now.getDay();     
    const hour = now.getHours();
    const minute = now.getMinutes();

    const currentTime = hour * 60 + minute;

    const isMarketOpen =
        day >= 1 &&
        day <= 5 &&
        currentTime >= (9 * 60 + 15) &&
        currentTime <= (15 * 60 + 30);

    return (

        <div className="status-card p-2">

            <h4>Market Status</h4>

            <h2 className={isMarketOpen ? "text-success" : "text-danger"}>
                {isMarketOpen ? "🟢 Market Open" : "🔴 Market Closed"}
            </h2>

            <hr />

            <p><strong>Trading Hours</strong></p>

            <p>Monday - Friday</p>

            <p>09:15 AM - 03:30 PM</p>

        </div>

    );

}