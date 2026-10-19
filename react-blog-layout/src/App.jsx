import { useMemo, useState } from "react";
import { ArrowDownRight, ArrowRight, BookOpen, Search, X } from "lucide-react";
import posts from "./data/posts.json";

const categories = ["All posts", ...new Set(posts.map((post) => post.category))];

function formatDate(dateString) {
  return new Date(`${dateString}T12:00:00`).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric"
  });
}

function PostCard({ post, featured = false }) {
  return (
    <article className={`post-card ${featured ? "featured-card" : ""}`}>
      <a className="image-link" href={`#post-${post.id}`} aria-label={`Read ${post.title}`}>
        <img src={post.image} alt="" loading="lazy" />
        <span className="image-arrow"><ArrowDownRight size={19} /></span>
      </a>
      <div className="post-content">
        <div className="post-meta">
          <span className="category-pill">{post.category}</span>
          <span>{post.readTime}</span>
        </div>
        <h3><a href={`#post-${post.id}`}>{post.title}</a></h3>
        <p>{post.excerpt}</p>
        <div className="post-footer">
          <div className="author">
            <span className="avatar">{post.author.split(" ").map((part) => part[0]).join("")}</span>
            <span>{post.author}</span>
          </div>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </div>
      </div>
    </article>
  );
}

export default function App() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All posts");
  const [sortOrder, setSortOrder] = useState("newest");

  const filteredPosts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return posts
      .filter((post) => activeCategory === "All posts" || post.category === activeCategory)
      .filter((post) => {
        const searchableText = `${post.title} ${post.excerpt} ${post.category} ${post.author}`.toLowerCase();
        return searchableText.includes(normalizedQuery);
      })
      .sort((a, b) => sortOrder === "newest"
        ? new Date(b.date) - new Date(a.date)
        : new Date(a.date) - new Date(b.date));
  }, [query, activeCategory, sortOrder]);

  const featuredPost = posts.find((post) => post.featured);
  const isFiltering = query.trim() !== "" || activeCategory !== "All posts";

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#" aria-label="Fieldnotes home">
          <span className="brand-mark"><BookOpen size={19} strokeWidth={2.2} /></span>
          fieldnotes<span className="brand-period">.</span>
        </a>
        <nav className="top-nav" aria-label="Main navigation">
          <a className="nav-active" href="#articles">Journal</a>
          <a href="#about">About</a>
          <a href="mailto:hello@fieldnotes.example">Contact</a>
        </nav>
        <a className="header-cta" href="#articles">Explore stories <ArrowRight size={16} /></a>
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-line" /> THE FIELDNOTES JOURNAL</div>
            <h1>Ideas for a life<br />well <em>observed.</em></h1>
            <p>Thoughtful stories on creativity, design, and finding more meaning in the everyday.</p>
            <a className="hero-link" href="#articles">Find your next read <ArrowDownRight size={17} /></a>
          </div>
          <div className="hero-art">
            <img src={featuredPost.image} alt="A light-filled, calm creative workspace" />
            <div className="image-note"><span>01 / EDITOR’S PICK</span><strong>Make space for what matters.</strong></div>
            <div className="round-stamp">READ<br />SLOWLY <span>✳</span></div>
          </div>
          <div className="hero-bottom"><span>CURIOUS BY NATURE</span><span>ISSUE NO. 08 <span className="tiny-dot">●</span> AUTUMN 2026</span></div>
        </section>

        <section className="articles-section" id="articles">
          <div className="section-heading">
            <div>
              <div className="eyebrow"><span className="eyebrow-line" /> THE LATEST</div>
              <h2>Stories worth <em>your time.</em></h2>
            </div>
            <p>Fresh perspectives for your curious side.</p>
          </div>

          <div className="toolbar">
            <div className="category-tabs" aria-label="Filter by category">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`category-tab ${activeCategory === category ? "selected" : ""}`}
                  onClick={() => setActiveCategory(category)}
                  aria-pressed={activeCategory === category}
                >{category}</button>
              ))}
            </div>
            <div className="toolbar-right">
              <label className="search-box">
                <Search size={17} />
                <input
                  type="search"
                  placeholder="Search stories..."
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  aria-label="Search stories"
                />
                {query && <button className="clear-search" onClick={() => setQuery("")} aria-label="Clear search"><X size={15} /></button>}
              </label>
              <select value={sortOrder} onChange={(event) => setSortOrder(event.target.value)} aria-label="Sort posts">
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
              </select>
            </div>
          </div>

          <div className="results-line">
            <span>{isFiltering ? "YOUR RESULTS" : "ALL STORIES"}</span>
            <span>{filteredPosts.length} {filteredPosts.length === 1 ? "story" : "stories"}</span>
          </div>

          {filteredPosts.length > 0 ? (
            <div className="posts-grid">
              {filteredPosts.map((post, index) => <PostCard key={post.id} post={post} featured={!isFiltering && index === 0} />)}
            </div>
          ) : (
            <div className="empty-state">
              <span className="empty-icon"><Search size={22} /></span>
              <h3>No stories found</h3>
              <p>Try another keyword or choose a different category.</p>
              <button className="reset-button" onClick={() => { setQuery(""); setActiveCategory("All posts"); }}>Clear filters <X size={15} /></button>
            </div>
          )}
        </section>

        <section className="newsletter" id="about">
          <div><div className="eyebrow"><span className="eyebrow-line" /> A LITTLE NOTE FOR YOUR INBOX</div><h2>Good ideas, <em>occasionally.</em></h2><p>A considered collection of stories. No noise, just notes worth keeping.</p></div>
          <a className="newsletter-link" href="mailto:hello@fieldnotes.example?subject=Subscribe%20to%20Fieldnotes">Count me in <ArrowRight size={17} /></a>
        </section>
      </main>

      <footer className="site-footer">
        <a className="brand footer-brand" href="#"><span className="brand-mark"><BookOpen size={17} /></span> fieldnotes<span className="brand-period">.</span></a>
        <span>Made for the curious. © 2026 Fieldnotes Journal</span>
        <a href="#articles">Back to top ↑</a>
      </footer>
    </div>
  );
}