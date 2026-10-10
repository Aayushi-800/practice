function Footer({ name, year }) {
  return (
    <footer className="footer">
      <p>© {year} {name}. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
