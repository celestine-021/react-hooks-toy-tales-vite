import React from "react";

function ToyList({ toys, onLike, onDelete }) {
  if (!toys || toys.length === 0) {
    return <p>No toys available</p>;
  }

  return (
    <div className="toy-list">
      {toys.map((toy) => (
        <div key={toy.id} data-testid="toy-card">
          <h3>{toy.name}</h3>

          <img src={toy.image} alt={toy.name} width="150" />

          <p>❤️ {toy.likes}</p>

          <button onClick={() => onLike(toy)}>
            Like &lt;3
          </button>

          <button onClick={() => onDelete(toy)}>
            Donate to GoodWill
          </button>
        </div>
      ))}
    </div>
  );
}

export default ToyList;