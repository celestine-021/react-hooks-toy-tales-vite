function ToyCard({ toy, onLikeToy, onDeleteToy }) {
  function handleLikeClick() {
    onLikeToy(toy.id);
  }

  function handleDeleteClick() {
    onDeleteToy(toy.id);
  }

  return (
    <div className="card">
      <h2>{toy.name}</h2>
      <img src={toy.image} alt={toy.name} />

      <p>{toy.likes} Likes </p>

      <button onClick={handleLikeClick}>Like {"<3"}</button>

      <button onClick={handleDeleteClick}>Donate to Goodwill</button>
    </div>
  );
}

export default ToyCard;