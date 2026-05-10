import { useEffect, useState } from "react";
import ToyForm from "./ToyForm";
import ToyCard from "./ToyCard";

function App() {
  const [toys, setToys] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/toys")
      .then((res) => res.json())
      .then((data) => setToys(data));
  }, []);

  function handleAddToy(newToy) {
    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newToy),
    })
      .then((res) => res.json())
      .then((data) => setToys([...toys, data]));
  }

  function handleLikeToy(id) {
    const toy = toys.find((t) => t.id === id);

    fetch(`http://localhost:3000/toys/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ likes: toy.likes + 1 }),
    })
      .then((res) => res.json())
      .then((updatedToy) =>
        setToys(toys.map((t) => (t.id === id ? updatedToy : t)))
      );
  }

  function handleDeleteToy(id) {
    fetch(`http://localhost:3000/toys/${id}`, {
      method: "DELETE",
    }).then(() => setToys(toys.filter((t) => t.id !== id)));
  }

  return (
    <div className="container">
      <h1>Toy Tales</h1>

      <ToyForm onAddToy={handleAddToy} />

      <div className="toy-container">
        {toys.length > 0 ? (
          toys.map((toy) => (
            <ToyCard
              key={toy.id}
              toy={toy}
              onLikeToy={handleLikeToy}
              onDeleteToy={handleDeleteToy}
            />
          ))
        ) : (
          <p>No toys available</p>
        )}
      </div>
    </div>
  );
}

export default App;