import React, { useEffect, useState } from "react";
import ToyList from "./ToyList";
import ToyForm from "./ToyForm";

function App() {
  const [toys, setToys] = useState([]);

  // GET TOYS (FIXED + DEBUG SAFE)
  useEffect(() => {
    fetch("http://localhost:3000/toys")
      .then((res) => res.json())
      .then((data) => {
        setToys(data);
      })
      .catch((err) => console.log("Fetch error:", err));
  }, []);

  // ADD TOY (POST)
  function addToy(newToy) {
    setToys((prev) => [...prev, newToy]);
  }

  // LIKE TOY (PATCH)
  function handleLike(toy) {
    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ likes: toy.likes + 1 }),
    })
      .then((res) => res.json())
      .then((updatedToy) => {
        setToys((prev) =>
          prev.map((t) => (t.id === updatedToy.id ? updatedToy : t))
        );
      });
  }

  // DELETE TOY
  function handleDelete(toy) {
    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: "DELETE",
    }).then(() => {
      setToys((prev) => prev.filter((t) => t.id !== toy.id));
    });
  }

  return (
    <div className="container">
      <h1>Toy Tales</h1>

      <ToyForm onAddToy={addToy} />

      <ToyList
        toys={toys}
        onLike={handleLike}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;