import "./Carditem.css"; 

function CardItem({ card, onVote }) {
  return (
    <div className="card">
      <img src={card.image} alt={card.title} className="card-image" />
      <h2 className="card-title">{card.title}</h2>
      <p className="card-partner"><b>Partner: {card.partner}</b></p>
      
      {onVote ? (
        <button className="card-button" onClick={onVote}>
          Votes: {card.votes}
        </button>
      ) : null}

    </div>
  );
}

export default CardItem;