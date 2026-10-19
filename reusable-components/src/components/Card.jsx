function Card({ title, description, category }) {
  return (
    <article className="card">
      <span className="category">{category}</span>
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  );
}

export default Card;
