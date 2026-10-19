import { useState } from "react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Card from "./components/Card.jsx";
import Form from "./components/Form.jsx";
import Button from "./components/Button.jsx";

const links = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "Users", href: "#users" },
];

const initialProjects = [
  {
    id: "portfolio",
    title: "Portfolio Website",
    description: "A responsive personal portfolio built with modern web technologies.",
    category: "Frontend",
  },
  {
    id: "url-shortener",
    title: "StudyNotion",
    description: "A full-stack Learning platform.",
    category: "MERN",
  },
  {
    id: "component-dashboard",
    title: "Component Dashboard",
    description: "A demonstration of reusable React components, props, and state.",
    category: "React",
  },
];

function App() {
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);

  function addUser(user) {
    setUsers((previousUsers) => [
      ...previousUsers,
      { ...user, id: crypto.randomUUID() },
    ]);
  }

  return (
    <div className="app-shell">
      <Header title="My Dashboard" links={links} />

      <main className="container" id="home">
        <section id="projects" aria-labelledby="projects-heading">
          <div className="section-heading">
            <div>
              <p className="eyebrow">COMPONENT DEMO</p>
              <h2 id="projects-heading">My Projects</h2>
              <p className="section-description">
                The same Card component renders each project from data.
              </p>
            </div>
            <span className="count-pill">{initialProjects.length} projects</span>
          </div>

          <div className="grid">
            {initialProjects.map((project) => (
              <Card
                key={project.id}
                title={project.title}
                description={project.description}
                category={project.category}
              />
            ))}
          </div>
        </section>

        <section id="users" aria-labelledby="users-heading">
          <div className="section-heading users-heading">
            <div>
              <p className="eyebrow">STATE & PROPS</p>
              <h2 id="users-heading">Users <span className="inline-count">({users.length})</span></h2>
              <p className="section-description">
                Add a user to see React state update the page dynamically.
              </p>
            </div>
            <Button
              text={showForm ? "Hide Form" : "＋ Add User"}
              onClick={() => setShowForm((previous) => !previous)}
            />
          </div>

          {showForm && <Form onAddUser={addUser} />}

          {users.length > 0 ? (
            <div className="grid user-grid">
              {users.map((user) => (
                <Card
                  key={user.id}
                  title={user.name}
                  description={user.email}
                  category="User"
                />
              ))}
            </div>
          ) : (
            !showForm && (
              <div className="empty-state">
                <span className="empty-icon" aria-hidden="true">＋</span>
                <p>No users added yet.</p>
                <p className="muted">Select “Add User” to create your first user card.</p>
              </div>
            )
          )}
        </section>
      </main>

      <Footer name="My Dashboard" year={new Date().getFullYear()} />
    </div>
  );
}

export default App;
