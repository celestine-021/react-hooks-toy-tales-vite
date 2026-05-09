import React, { useEffect, useState } from "react";
import ToyList from "./ToyList";
import ToyForm from "./ToyForm";

function App() {
  const [toys, setToys] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/toys")
      .then((res) => res.json())
      .then((data) => setToys(data));
  }, []);

  function addToy(toy) {
    setToys((prev) => [...prev, toy]);
  }

  function handleLike(toy) {
    const updatedToy = { ...toy, likes: toy.likes + 1 };

    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedToy),
    })
      .then((res) => res.json())
      .then((data) => {
        setToys((prev) =>
          prev.map((t) => (t.id === data.id ? data : t))
        );
      });
  }

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