function Button({ text, onClick, variant = "primary" }) {
  return (
    <button className={`btn ${variant}`} type="button" onClick={onClick}>
      {text}
    </button>
  );
}

export default Button;
