function ContestantCard({ star, danceSong, danceType, scores, eliminated }) {
  return (
    <div className={`contestant-card ${eliminated ? "eliminated" : ""}`}>
      <h2>{star}</h2>
      <p><b>Dance:</b> {danceType}</p>
      <p><b>Song:</b> {danceSong}</p>
      <p><b>Score:</b> {scores}</p>
    </div>
  );
}

export default ContestantCard;
