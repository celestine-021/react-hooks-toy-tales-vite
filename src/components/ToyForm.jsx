import React, { useState } from "react";

function ToyForm({ onAddToy }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !image) return;

    const newToy = {
      name,
      image,
      likes: 0,
    };

    onAddToy(newToy);

    // IMPORTANT: clear inputs (test expects clean UX)
    setName("");
    setImage("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create New Toy</h2>

      <input
        placeholder="Enter a toy's name..."
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Enter a toy's image URL..."
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <button type="submit">Add a Toy</button>
    </form>
  );
}

export default ToyForm;