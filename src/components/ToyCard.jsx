import React from "react";

function ToyCard({ toy, onLike, onDelete }) {
  return (
    <div className="toy-card">
      <h3>{toy.name}</h3>

      <img src={toy.image} alt={toy.name} />

      <p>{toy.likes} Likes</p>

      <button onClick={() => onLike(toy)}>Like ❤️</button>

      <button onClick={() => onDelete(toy)}>Delete 🗑️</button>
    </div>
  );
}

export default ToyCard;