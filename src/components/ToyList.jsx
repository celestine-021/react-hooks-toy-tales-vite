import React from "react";
import ToyCard from "./ToyCard";

function ToyList({ toys, onLike, onDonate }) {
  return (
    <div className="toy-container">
      {toys.map((toy) => (
        <ToyCard
          key={toy.id}
          toy={toy}
          onLike={onLike}
          onDonate={onDonate}
        />
      ))}
    </div>
  );
}

export default ToyList;