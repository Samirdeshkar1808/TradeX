import './Cards.css';
function Cards({ imgURL, headline, description }) {
  return (
    <div className="feature-card text-center">

      <div className="mb-3">
        <img src={imgURL} className="img-fluid  img-icons"/>
      </div>

      <h4 className="fw-bold mb-3">{headline}</h4>

      <p className="text-secondary">
        {description}
      </p>
    </div>
  );
}

export default Cards;
