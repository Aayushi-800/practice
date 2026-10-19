function Header({ title, links }) {
  return (
    <header className="header">
      <h1>{title}</h1>
      <nav aria-label="Main navigation">
        {links.map((link) => (
          <a key={link.label} href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

export default Header;
