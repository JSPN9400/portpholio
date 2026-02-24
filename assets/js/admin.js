// Admin Panel - Content Management
// Handles add, edit, delete, backup, and restore for writing content.

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contentForm");
  const contentListContainer = document.getElementById("contentListContainer");
  const successMessage = document.getElementById("successMessage");
  const contentTypeInputs = document.querySelectorAll('input[name="contentType"]');
  const contentLabel = document.querySelector('label[for="content"]');
  const poemHint = document.getElementById("poemHint");
  const submitBtn = document.getElementById("submitBtn");
  const cancelEditBtn = document.getElementById("cancelEditBtn");
  const editingIndexInput = document.getElementById("editingIndex");

  function escapeHtml(text) {
    const map = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" };
    return String(text).replace(/[&<>"']/g, (m) => map[m]);
  }

  function updateTypeUI(type) {
    if (type === "poem") {
      contentLabel.textContent = "Poem";
      document.getElementById("content").placeholder = "Write your poem here (line breaks are preserved)...";
      poemHint.style.display = "block";
    } else {
      contentLabel.textContent = "Content";
      document.getElementById("content").placeholder = "Write your blog article here...";
      poemHint.style.display = "none";
    }
  }

  contentTypeInputs.forEach((input) => {
    input.addEventListener("change", function () {
      updateTypeUI(this.value);
    });
  });

  function getStoredContent() {
    const stored = localStorage.getItem("portfolioContent");
    if (!stored) return [];
    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) return parsed;
      if (parsed && Array.isArray(parsed.content)) return parsed.content;
      return [];
    } catch (error) {
      return [];
    }
  }

  function saveContent(contentArray) {
    localStorage.setItem("portfolioContent", JSON.stringify(contentArray));
  }

  function normalizeContent(contentArray) {
    let hasChanges = false;
    const normalized = contentArray.map((item, index) => {
      const next = { ...item };
      if (!next.id) {
        next.id = `content-${Date.now()}-${index}`;
        hasChanges = true;
      }
      if (!Object.prototype.hasOwnProperty.call(next, "subheading")) {
        next.subheading = "";
        hasChanges = true;
      }
      if (!Object.prototype.hasOwnProperty.call(next, "category")) {
        next.category = next.type === "poem" ? "Poetry" : "Thoughts and Society";
        hasChanges = true;
      }
      return next;
    });

    if (hasChanges) saveContent(normalized);
    return normalized;
  }

  function resetEditState() {
    editingIndexInput.value = "";
    if (submitBtn) submitBtn.textContent = "Add Content";
    if (cancelEditBtn) cancelEditBtn.style.display = "none";
    successMessage.classList.remove("show");
  }

  function loadContent() {
    const content = normalizeContent(getStoredContent());

    if (content.length === 0) {
      contentListContainer.innerHTML =
        '<div class="empty-content-list">No content added yet. Fill out the form above to get started.</div>';
      return;
    }

    const sorted = [...content].sort((a, b) => new Date(b.dateAdded || 0) - new Date(a.dateAdded || 0));

    contentListContainer.innerHTML = sorted
      .map((item) => {
        const badgeLabel = item.type === "poem" ? "Poem" : "Article";
        const subtitleLine = item.subheading
          ? `<p style="margin-top:0.3rem;">${escapeHtml(item.subheading)}</p>`
          : "";

        return `
          <div class="content-item">
            <div class="content-item-info">
              <h3>
                <span class="content-type-badge ${item.type === "blog" ? "badge-blog" : "badge-poem"}">
                  ${badgeLabel}
                </span>
                ${escapeHtml(item.title || "Untitled")}
              </h3>
              ${subtitleLine}
              <p>${escapeHtml(item.date || "No date")} | ${escapeHtml(item.category || "")}</p>
            </div>
            <div class="content-actions">
              <button class="btn-edit" onclick="editContent('${item.id}')">Edit</button>
              <button class="btn-delete" onclick="deleteContent('${item.id}')">Delete</button>
            </div>
          </div>
        `;
      })
      .join("");
  }

  function showSuccess(message) {
    successMessage.textContent = message;
    successMessage.classList.add("show");
    setTimeout(() => {
      successMessage.classList.remove("show");
    }, 3500);
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const contentType = document.querySelector('input[name="contentType"]:checked').value;
    const title = document.getElementById("title").value.trim();
    const subheading = document.getElementById("subheading").value.trim();
    const category = document.getElementById("category").value.trim();
    const date = document.getElementById("date").value.trim();
    const content = document.getElementById("content").value.trim();
    const editingId = editingIndexInput.value;

    if (!title || !date || !content) {
      alert("Please fill out title, date, and content.");
      return;
    }

    const allContent = normalizeContent(getStoredContent());
    const payload = {
      type: contentType,
      title,
      subheading,
      category: category || (contentType === "poem" ? "Poetry" : "Thoughts and Society"),
      date,
      content,
    };

    if (editingId) {
      const idx = allContent.findIndex((item) => item.id === editingId);
      if (idx !== -1) {
        allContent[idx] = {
          ...allContent[idx],
          ...payload,
          dateUpdated: new Date().toISOString(),
        };
      }
      showSuccess("Content updated successfully.");
    } else {
      allContent.push({
        id: `content-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        ...payload,
        dateAdded: new Date().toISOString(),
      });
      showSuccess("Content added successfully.");
    }

    saveContent(allContent);
    form.reset();
    document.getElementById("typeBlog").checked = true;
    updateTypeUI("blog");
    resetEditState();
    loadContent();
  });

  if (cancelEditBtn) {
    cancelEditBtn.addEventListener("click", () => {
      form.reset();
      document.getElementById("typeBlog").checked = true;
      updateTypeUI("blog");
      resetEditState();
    });
  }

  form.addEventListener("reset", () => {
    setTimeout(() => {
      resetEditState();
      document.getElementById("typeBlog").checked = true;
      updateTypeUI("blog");
    }, 0);
  });

  window.editContent = function (id) {
    const allContent = normalizeContent(getStoredContent());
    const item = allContent.find((entry) => entry.id === id);
    if (!item) return;

    const typeInput = document.getElementById(item.type === "poem" ? "typePoem" : "typeBlog");
    if (typeInput) typeInput.checked = true;
    updateTypeUI(item.type);

    document.getElementById("title").value = item.title || "";
    document.getElementById("subheading").value = item.subheading || "";
    document.getElementById("category").value = item.category || "";
    document.getElementById("date").value = item.date || "";
    document.getElementById("content").value = item.content || "";
    editingIndexInput.value = id;

    if (submitBtn) submitBtn.textContent = "Update Content";
    if (cancelEditBtn) cancelEditBtn.style.display = "inline-block";

    form.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  window.deleteContent = function (id) {
    if (!confirm("Are you sure you want to delete this content?")) return;

    const allContent = normalizeContent(getStoredContent());
    const filtered = allContent.filter((item) => item.id !== id);
    saveContent(filtered);

    if (editingIndexInput.value === id) {
      form.reset();
      document.getElementById("typeBlog").checked = true;
      updateTypeUI("blog");
      resetEditState();
    }

    loadContent();
  };

  window.downloadBackup = function () {
    const content = normalizeContent(getStoredContent());
    const backup = {
      version: "2.0",
      exportDate: new Date().toISOString(),
      content,
    };

    const json = JSON.stringify(backup, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `portfolio-backup-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
    alert("Backup downloaded successfully.");
  };

  window.uploadBackup = function (event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      try {
        const backup = JSON.parse(e.target.result);
        if (backup.content && Array.isArray(backup.content)) {
          if (confirm("This will replace all current content. Continue?")) {
            saveContent(normalizeContent(backup.content));
            loadContent();
            alert("Backup restored successfully.");
          }
        } else {
          alert("Invalid backup file format.");
        }
      } catch (err) {
        alert("Error reading backup file.");
      }
    };
    reader.readAsText(file);
    event.target.value = "";
  };

  updateTypeUI("blog");
  resetEditState();
  loadContent();
});
