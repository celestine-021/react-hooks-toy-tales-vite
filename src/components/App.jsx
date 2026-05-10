import { useEffect, useState } from "react";

function App() {
  const [toys, setToys] = useState([]);
  const [toyName, setToyName] = useState("");
  const [toyImage, setToyImage] = useState("");

  // FETCH TOYS
  useEffect(() => {
    fetch("http://localhost:3000/toys")
      .then((res) => res.json())
      .then((data) => setToys(data));
  }, []);

  // ADD TOY
  function handleSubmit(e) {
    e.preventDefault();

    const newToy = {
      name: toyName,
      image: toyImage,
      likes: 0,
    };

    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newToy),
    })
      .then((res) => res.json())
      .then((addedToy) => {
        setToys([...toys, addedToy]);
      });

    setToyName("");
    setToyImage("");
  }

  // LIKE TOY
  function handleLike(id, currentLikes) {
    const updatedLikes = Number(currentLikes) + 1;

    fetch(`http://localhost:3000/toys/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        likes: updatedLikes,
      }),
    })
      .then((res) => res.json())
      .then((updatedToy) => {
        const updatedToys = toys.map((toy) =>
          toy.id === updatedToy.id ? updatedToy : toy
        );

        setToys(updatedToys);
      });
  }

  // DELETE TOY
  function handleDelete(id) {
    fetch(`http://localhost:3000/toys/${id}`, {
      method: "DELETE",
    }).then(() => {
      const filteredToys = toys.filter((toy) => toy.id !== id);
      setToys(filteredToys);
    });
  }

  return (
    <div className="container">
      <h1>Toy Tales</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a toy's name..."
          value={toyName}
          onChange={(e) => setToyName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter a toy's image..."
          value={toyImage}
          onChange={(e) => setToyImage(e.target.value)}
        />

        <button type="submit">Add a Toy</button>
      </form>

      <div className="toy-container">
        {toys.map((toy) => (
          <div
            className="toy-card"
            data-testid="toy-card"
            key={toy.id}
          >
            <h2>{toy.name}</h2>

            <img
              src={toy.image}
              alt={toy.name}
              width="200"
            />

            <p className="likes-count">
              {toy.likes} Likes
            </p>

            <button
              onClick={() =>
                handleLike(toy.id, toy.likes)
              }
            >
              Like {"<3"}
            </button>

            <button
              onClick={() =>
                handleDelete(toy.id)
              }
            >
              Donate to GoodWill
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;