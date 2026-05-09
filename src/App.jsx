import { useEffect, useState } from "react";
import ToyCard from "./components/ToyCard";
import ToyForm from "./components/ToyForm";

function App() {
  const [toys, setToys] = useState([]);

  // GET toys
  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then(res => res.json())
      .then(data => setToys(data));
  }, []);

  // CREATE toy
  function addToy(newToy) {
    fetch("http://localhost:3001/toys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newToy)
    })
      .then(res => res.json())
      .then(data => setToys([...toys, data]));
  }

  // LIKE toy
  function handleLike(toy) {
    fetch(`http://localhost:3001/toys/${toy.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ likes: toy.likes + 1 })
    })
      .then(res => res.json())
      .then(updatedToy => {
        setToys(toys.map(t => t.id === updatedToy.id ? updatedToy : t));
      });
  }

  // DELETE toy
  function handleDelete(id) {
    fetch(`http://localhost:3001/toys/${id}`, {
      method: "DELETE"
    }).then(() => {
      setToys(toys.filter(toy => toy.id !== id));
    });
  }

  return (
    <div className="app">
      <h1>Toy Tales</h1>

      <ToyForm addToy={addToy} />

      <div className="toy-container">
        {toys.map(toy => (
          <ToyCard
            key={toy.id}
            toy={toy}
            onLike={handleLike}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default App;