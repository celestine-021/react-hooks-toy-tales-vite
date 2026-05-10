import { useEffect, useState } from "react";
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

  // ADD toy
  const addToy = (toy) => {
    fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(toy),
    })
      .then((res) => res.json())
      .then((newToy) => setToys([...toys, newToy]));
  };

  // LIKE toy
  const handleLike = (toy) => {
    fetch(`${API}/${toy.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ likes: toy.likes + 1 }),
    })
      .then((res) => res.json())
      .then((updatedToy) => {
        setToys(toys.map((t) => (t.id === updatedToy.id ? updatedToy : t)));
      });
  };

  // DELETE toy (Donate button)
  const handleDelete = (id) => {
    fetch(`${API}/${id}`, { method: "DELETE" }).then(() => {
      setToys(toys.filter((toy) => toy.id !== id));
    });
  };

  return (
    <div className="container">
      <h1>Toy Tales</h1>

      <ToyForm addToy={addToy} />

      <ToyList
        toys={toys}
        onLike={handleLike}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;