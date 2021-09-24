const Card = ({ value, cardStyle, onClick }) => {
  return (
    <div className="card" style={cardStyle} onClick={onClick}>
      <span className="value">{value}</span>
    </div>
  );
};

export default Card;
