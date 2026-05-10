import React, { useEffect, useState } from "react";
import ToyForm from "./ToyForm";
import ToyList from "./ToyList";
import "../index.css";

const API = "http://localhost:3000/toys";

function App() {
  const [toys, setToys] = useState([]);

  // GET toys on load
  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => setToys(data));
  }, []);

  // LIKE toy
  const handleLike = (toy) => {
    fetch(`${API}/${toy.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ likes: toy.likes + 1 }),
    })
      .then((res) => res.json())
      .then((updatedToy) => {
        setToys((prev) =>
          prev.map((t) => (t.id === updatedToy.id ? updatedToy : t))
        );
      });
  };

  // DELETE toy (DONATE)
  const handleDonate = (id) => {
    fetch(`${API}/${id}`, {
      method: "DELETE",
    }).then(() => {
      setToys((prev) => prev.filter((toy) => toy.id !== id));
    });
  };

  // ADD toy
  const handleAddToy = (toy) => {
    fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(toy),
    })
      .then((res) => res.json())
      .then((newToy) => {
        setToys((prev) => [...prev, newToy]);
      });
  };

  return (
    <div className="container">
      <h1>Toy Tales</h1>

      <ToyForm onAddToy={handleAddToy} />

      <ToyList
        toys={toys}
        onLike={handleLike}
        onDonate={handleDonate}
      />
    </div>
  );
}

export default App;