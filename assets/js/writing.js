document.addEventListener("DOMContentLoaded", async () => {
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

  function readLocalContent() {
    const raw = localStorage.getItem("portfolioContent");
    if (!raw) return [];
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
      if (parsed && Array.isArray(parsed.content)) return parsed.content;
      return [];
    } catch (error) {
      return [];
    }
  }

  async function readSharedContent() {
    try {
      const response = await fetch("assets/data/writing.json?v=20260224.4", { cache: "no-store" });
      if (!response.ok) return [];
      const parsed = await response.json();
      if (Array.isArray(parsed)) return parsed;
      if (parsed && Array.isArray(parsed.content)) return parsed.content;
      return [];
    } catch (error) {
      return [];
    }
  }

  function normalizeItems(items) {
    return items
      .map((item) => ({
        ...item,
        type: item.type || "blog",
        title: item.title || "Untitled",
        subheading: item.subheading || "",
        date: item.date || "No date",
        category: item.category || (item.type === "poem" ? "Poetry" : "Thoughts and Society"),
        content: item.content || "",
      }))
      .sort((a, b) => new Date(b.dateAdded || b.date || 0) - new Date(a.dateAdded || a.date || 0));
  }

  function excerpt(text, length = 220) {
    const clean = String(text).replace(/\s+/g, " ").trim();
    if (clean.length <= length) return clean;
    return clean.slice(0, length).trim() + "...";
  }

  const localPosts = readLocalContent();
  const sharedPosts = await readSharedContent();
  const activeSource = sharedPosts.length > 0 ? sharedPosts : localPosts;
  const posts = normalizeItems(activeSource);

  if (posts.length === 0) {
    container.innerHTML = `
      <article class="blog-card">
        <div class="blog-meta">
          <span class="tag">Update</span>
          <span class="date">No posts yet</span>
        </div>
        <h2>New posts will appear here</h2>
        <p>Add writing in <code>assets/data/writing.json</code> and publish the site. You can still draft locally from <a class="read-more" href="admin.html">admin panel</a>.</p>
      </article>
    `;
    return;
  }

  container.innerHTML = posts
    .map((post, idx) => {
      const title = escapeHtml(post.title);
      const subheading = escapeHtml(post.subheading);
      const date = escapeHtml(post.date);
      const category = escapeHtml(post.category);
      const isPoem = post.type === "poem";
      const fullText = escapeHtml(post.content).replace(/\n/g, "<br>");
      const shortText = isPoem ? fullText : escapeHtml(excerpt(post.content));
      const contentClass = isPoem ? "blog-content blog-content-poem" : "blog-content";
      const subheadingHtml = subheading ? `<p class="blog-subheading">${subheading}</p>` : "";
      const toggleHtml = isPoem
        ? ""
        : `<button class="read-more js-read-more" data-target="post-${idx}" type="button">Read More</button>`;

      return `
        <article class="blog-card">
          <div class="blog-meta">
            <span class="tag">${category}</span>
            <span class="date">${date}</span>
          </div>
          <h2>${title}</h2>
          ${subheadingHtml}
          <div class="${contentClass}" id="post-${idx}" data-expanded="false" data-full="${fullText}" data-short="${shortText}">
            ${shortText}
          </div>
          ${toggleHtml}
        </article>
      `;
    })
    .join("");

  container.querySelectorAll(".js-read-more").forEach((button) => {
    button.addEventListener("click", () => {
      const targetId = button.getAttribute("data-target");
      const contentNode = targetId ? document.getElementById(targetId) : null;
      if (!contentNode) return;

      const expanded = contentNode.getAttribute("data-expanded") === "true";
      if (expanded) {
        contentNode.innerHTML = contentNode.getAttribute("data-short") || "";
        contentNode.setAttribute("data-expanded", "false");
        button.textContent = "Read More";
      } else {
        contentNode.innerHTML = contentNode.getAttribute("data-full") || "";
        contentNode.setAttribute("data-expanded", "true");
        button.textContent = "Read Less";
      }
    });
  });
});

