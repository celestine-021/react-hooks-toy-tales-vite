import { useState } from "react";

function ToyForm({ onAddToy }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const newToy = {
      name,
      image,
      likes: 0,
    };

    onAddToy(newToy);

    setName("");
    setImage("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create New Toy</h2>

      <input
        placeholder="Enter a toy's name..."
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Enter a toy's image URL..."
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <button type="submit">Add a Toy</button>
    </form>
  );
}

export default ToyForm;