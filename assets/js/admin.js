// Admin Panel - Content Management
// This script handles adding, displaying, and deleting content

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contentForm');
  const contentListContainer = document.getElementById('contentListContainer');
  const successMessage = document.getElementById('successMessage');
  const contentTypeInputs = document.querySelectorAll('input[name="contentType"]');
  const contentLabel = document.querySelector('label[for="content"]');
  const poemHint = document.getElementById('poemHint');

  // Update content type label when radio button changes
  contentTypeInputs.forEach(input => {
    input.addEventListener('change', function() {
      if (this.value === 'poem') {
        contentLabel.textContent = 'Poem';
        document.getElementById('content').placeholder = 'Write your poem here (each line will be preserved)...';
        poemHint.style.display = 'block';
      } else {
        contentLabel.textContent = 'Content';
        document.getElementById('content').placeholder = 'Write your blog article here...';
        poemHint.style.display = 'none';
      }
    });
  });

  // Load and display existing content
  function loadContent() {
    const content = getStoredContent();
    
    if (content.length === 0) {
      contentListContainer.innerHTML = '<div class="empty-content-list">No content added yet. Fill out the form above to get started!</div>';
      return;
    }

    // Sort by date (newest first)
    content.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));

    contentListContainer.innerHTML = content.map((item, index) => `
      <div class="content-item">
        <div class="content-item-info">
          <h3>
            <span class="content-type-badge ${item.type === 'blog' ? 'badge-blog' : 'badge-poem'}">
              ${item.type === 'blog' ? '📝 Article' : '✨ Poem'}
            </span>
            ${item.title}
          </h3>
          <p>📅 ${item.date}</p>
        </div>
        <button class="btn-delete" onclick="deleteContent(${index})">Delete</button>
      </div>
    `).join('');
  }

  // Get stored content from localStorage
  function getStoredContent() {
    const stored = localStorage.getItem('portfolioContent');
    return stored ? JSON.parse(stored) : [];
  }

  // Save content to localStorage
  function saveContent(contentArray) {
    localStorage.setItem('portfolioContent', JSON.stringify(contentArray));
  }

  // Handle form submission
  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const contentType = document.querySelector('input[name="contentType"]:checked').value;
    const title = document.getElementById('title').value.trim();
    const date = document.getElementById('date').value.trim();
    const content = document.getElementById('content').value.trim();

    // Validate inputs
    if (!title || !date || !content) {
      alert('Please fill out all fields');
      return;
    }

    // Create new content object
    const newContent = {
      type: contentType,
      title: title,
      date: date,
      content: content,
      dateAdded: new Date().toISOString()
    };

    // Add to storage
    const allContent = getStoredContent();
    allContent.push(newContent);
    saveContent(allContent);

    // Show success message
    successMessage.classList.add('show');
    setTimeout(() => {
      successMessage.classList.remove('show');
    }, 4000);

    // Reset form
    form.reset();
    document.getElementById('typeBlog').checked = true;
    contentLabel.textContent = 'Content';
    document.getElementById('content').placeholder = 'Write your blog article here...';
    poemHint.style.display = 'none';

    // Reload content list
    loadContent();
  });

  // Make deleteContent function global
  window.deleteContent = function(index) {
    if (confirm('Are you sure you want to delete this content?')) {
      const allContent = getStoredContent();
      allContent.splice(index, 1);
      saveContent(allContent);
      loadContent();
    }
  };

  // Download backup as JSON
  window.downloadBackup = function() {
    const content = getStoredContent();
    const backup = {
      version: '1.0',
      exportDate: new Date().toISOString(),
      content: content
    };
    
    const json = JSON.stringify(backup, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert('✅ Backup downloaded successfully!');
  };

  // Upload backup from JSON
  window.uploadBackup = function(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
      try {
        const backup = JSON.parse(e.target.result);
        if (backup.content && Array.isArray(backup.content)) {
          const confirmed = confirm('This will replace all current content. Continue?');
          if (confirmed) {
            saveContent(backup.content);
            loadContent();
            alert('✅ Backup restored successfully!');
          }
        } else {
          alert('❌ Invalid backup file format');
        }
      } catch (err) {
        alert('❌ Error reading backup file');
      }
    };
    reader.readAsText(file);
    
    // Reset input
    event.target.value = '';
  };

  // Initial load
  loadContent();
});
