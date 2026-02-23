// Writing Page - Load Content from Admin
// This script displays blog articles and poems added through the admin panel

document.addEventListener('DOMContentLoaded', function() {
  const blogContainer = document.getElementById('blogArticlesContainer');
  const poemsContainer = document.getElementById('poemsContainer');

  // Get stored content from localStorage
  function getStoredContent() {
    const stored = localStorage.getItem('portfolioContent');
    return stored ? JSON.parse(stored) : [];
  }

  // Load and display content
  function loadContent() {
    const allContent = getStoredContent();
    
    // Separate blog articles and poems
    const blogs = allContent.filter(item => item.type === 'blog');
    const poems = allContent.filter(item => item.type === 'poem');

    // Display blog articles
    if (blogs.length === 0) {
      blogContainer.innerHTML = '<p class="empty-message">No articles published yet. Check back soon.</p>';
    } else {
      blogContainer.innerHTML = blogs.map(blog => `
        <article class="writing-entry">
          <div class="entry-header">
            <h3 class="entry-title">${escapeHtml(blog.title)}</h3>
            <p class="entry-date">${escapeHtml(blog.date)}</p>
          </div>
          <div class="entry-content">
            ${blog.content.split('\n').map(paragraph => {
              const trimmed = paragraph.trim();
              return trimmed ? `<p>${escapeHtml(trimmed)}</p>` : '';
            }).join('')}
            <a href="#" class="read-more">Read Full Article →</a>
          </div>
        </article>
      `).join('');
    }

    // Display poems
    if (poems.length === 0) {
      poemsContainer.innerHTML = '<p class="empty-message">No poems published yet. Check back soon.</p>';
    } else {
      poemsContainer.innerHTML = poems.map(poem => `
        <article class="writing-entry poem-entry">
          <div class="entry-header">
            <h3 class="entry-title">${escapeHtml(poem.title)}</h3>
            <p class="entry-date">${escapeHtml(poem.date)}</p>
          </div>
          <div class="entry-content poem-content">
            <p>
              ${escapeHtml(poem.content).replace(/\n/g, '<br>')}
            </p>
          </div>
        </article>
      `).join('');
    }
  }

  // Helper function to escape HTML and prevent XSS
  function escapeHtml(text) {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
  }

  // Initial load
  loadContent();
});
