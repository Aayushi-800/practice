import { useState } from "react";

function Form({ onAddUser }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName || !trimmedEmail) return;

    onAddUser({ name: trimmedName, email: trimmedEmail });
    setName("");
    setEmail("");
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h3>Add a User</h3>

      <label htmlFor="user-name">Name</label>
      <input
        id="user-name"
        type="text"
        placeholder="Enter name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        required
      />

      <label htmlFor="user-email">Email</label>
      <input
        id="user-email"
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
      />

      <button type="submit">Add User</button>
    </form>
  );
}

export default Form;
