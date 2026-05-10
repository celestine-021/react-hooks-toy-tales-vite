import React from "react";

function ToyCard({ toy, onLike, onDonate }) {
  return (
    <div className="card" data-testid="toy-card">
      <h2>{toy.name}</h2>

      <img src={toy.image} alt={toy.name} />

      <p>{toy.likes} Likes</p>

      <button onClick={() => onLike(toy)}>
        Like &lt;3
      </button>

      <button onClick={() => onDonate(toy.id)}>
        Donate to GoodWill
      </button>
    </div>
  );
}

export default ToyCard;