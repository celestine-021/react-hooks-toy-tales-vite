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
    setToys([...toys, newToy]);
  }

  function handleLike(id) {
    setToys(
      toys.map((toy) =>
        toy.id === id ? { ...toy, likes: toy.likes + 1 } : toy
      )
    );
  }

  function handleDonate(id) {
    setToys(toys.filter((toy) => toy.id !== id));
  }

  return (
    <div className="container">
      <h1>Toy Tales</h1>

      <ToyForm onAddToy={handleAddToy} />

      <div className="toy-container">
        {toys.map((toy) => (
          <ToyCard
            key={toy.id}
            toy={toy}
            onLike={handleLike}
            onDonate={handleDonate}
          />
        ))}
      </div>
    </div>
  );
}

export default App;