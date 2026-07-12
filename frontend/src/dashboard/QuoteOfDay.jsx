import "./QuoteOfDay.css"

const quotes = [
  {
    text: "The stock market is a device for transferring money from the impatient to the patient.",
    author: "Warren Buffett",
  },

  {
    text: "Know what you own and why you own it.",
    author: "Peter Lynch",
  },

  {
    text: "Investing should be more like watching paint dry.",
    author: "Paul Samuelson",
  },

  {
    text: "Price is what you pay. Value is what you get.",
    author: "Warren Buffett",
  },
];

export default function QuoteOfDay() {

  const quote = quotes[new Date().getDate() % quotes.length];

  return (
    <div className="qoute-container text-center p-2">
      <h5 className="mb-3">Quote of the Day</h5>

      <blockquote className="blockquote">
        <p>"{quote.text}"</p>

        <footer className="blockquote-footer">{quote.author}</footer>
      </blockquote>
    </div>
  );
}
