import React from "react";

function ToyList({ toys, onLike, onDelete }) {
  if (!toys || toys.length === 0) {
    return <p>No toys available</p>;
  }

  return (
    <div className="toy-list">
      {toys.map((toy) => (
        <div key={toy.id} className="toy-card">
          <h3>{toy.name}</h3>

          <img
            src={toy.image}
            alt={toy.name}
            width="150"
          />

          <p>❤️ {toy.likes} Likes</p>

          <button onClick={() => onLike(toy)}>Like</button>
          <button onClick={() => onDelete(toy)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default ToyList;