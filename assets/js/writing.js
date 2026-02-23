document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("blogArticlesContainer");
  if (!container) return;

  function escapeHtml(text) {
    const map = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return String(text).replace(/[&<>"']/g, (m) => map[m]);
  }

  function excerpt(text, length = 180) {
    const clean = String(text).replace(/\s+/g, " ").trim();
    if (clean.length <= length) return clean;
    return clean.slice(0, length).trim() + "...";
  }

  function getContent() {
    const raw = localStorage.getItem("portfolioContent");
    if (!raw) return [];
    try {
      return JSON.parse(raw);
    } catch (error) {
      return [];
    }
  }

  const blogs = getContent()
    .filter((item) => item.type === "blog")
    .sort((a, b) => new Date(b.date || "") - new Date(a.date || ""));

  if (blogs.length === 0) {
    container.innerHTML = `
      <article class="blog-card">
        <div class="blog-meta">
          <span class="tag">Update</span>
          <span class="date">No posts yet</span>
        </div>
        <h2>Articles will appear here</h2>
        <p>Add writing from <a class="read-more" href="admin.html">admin panel</a> to populate this page.</p>
      </article>
    `;
    return;
  }

  container.innerHTML = blogs
    .map((blog) => {
      const title = escapeHtml(blog.title || "Untitled");
      const date = escapeHtml(blog.date || "No date");
      const summary = escapeHtml(excerpt(blog.content || ""));
      const category = escapeHtml(blog.category || "Business Analytics");

      return `
        <article class="blog-card">
          <div class="blog-meta">
            <span class="tag">${category}</span>
            <span class="date">${date}</span>
          </div>
          <h2>${title}</h2>
          <p>${summary}</p>
          <a class="read-more" href="#">Read More</a>
        </article>
      `;
    })
    .join("");
});
