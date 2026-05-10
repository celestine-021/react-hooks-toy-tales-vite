import { useState } from "react";

function ToyForm({ addToy }) {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newToy = {
      name: formData.name,
      image: formData.image,
      likes: 0,
    };

    addToy(newToy);

    setFormData({ name: "", image: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create New Toy</h2>

      <input
        name="name"
        placeholder="Enter a toy's name..."
        value={formData.name}
        onChange={handleChange}
      />

      <input
        name="image"
        placeholder="Enter a toy's image URL..."
        value={formData.image}
        onChange={handleChange}
      />

      <button type="submit">Add a Toy</button>
    </form>
  );
}

export default ToyForm;