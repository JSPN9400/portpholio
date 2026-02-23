# Writing & Reflections - Content Management Guide

## Overview
Your Writing page starts **empty**. You control 100% of the content. This guide shows you how to add blog articles and poems.

---

## Adding Content to Your Website

### Step 1: Edit `writing.html`
Open the file: `writing.html` in your editor.

---

## ADDING A BLOG ARTICLE

Find this section:
```html
<!-- Blog Articles Section -->
<section class="writing-category">
  <h2 class="category-heading">Blog Articles</h2>
  <p class="empty-message">No articles published yet. Check back soon.</p>
  
  <!-- TEMPLATE: Copy this block to add a new article -->
```

**To add your first blog article:**

1. **Copy this template** (below the empty-message):
```html
<article class="writing-entry">
  <div class="entry-header">
    <h3 class="entry-title">Your Article Title Here</h3>
    <p class="entry-date">Month Year</p>
  </div>
  <div class="entry-content">
    <p>
      Your article introduction paragraph here. Write your analytical thoughts.
    </p>
    <p>
      Your second paragraph continues the analysis...
    </p>
    <a href="#" class="read-more">Read Full Article →</a>
  </div>
</article>
```

2. **Replace the placeholders:**
   - `Your Article Title Here` → Your actual title
   - `Month Year` → Date (e.g., "March 2024")
   - Add your article paragraphs inside `<p>` tags
   - You can add as many `<p>` tags as needed

3. **Example - Environmental Analysis:**
```html
<article class="writing-entry">
  <div class="entry-header">
    <h3 class="entry-title">Data-Driven Environmental Policy</h3>
    <p class="entry-date">March 2024</p>
  </div>
  <div class="entry-content">
    <p>
      Modern environmental policy requires data-driven analysis rather than ideology. 
      This article examines how analytical approaches reveal structural patterns in 
      environmental behavior across different populations.
    </p>
    <p>
      Statistical analysis shows that awareness alone doesn't drive behavior change. 
      Instead, systemic incentives and infrastructure determine outcomes...
    </p>
    <a href="#" class="read-more">Read Full Article →</a>
  </div>
</article>
```

4. **Remove the empty message** when you add your first article:
```html
<!-- Delete this line when you add content -->
<p class="empty-message">No articles published yet. Check back soon.</p>
```

---

## ADDING A POEM

Find this section:
```html
<!-- Poems Section -->
<section class="writing-category">
  <h2 class="category-heading">Poems</h2>
  <p class="empty-message">No poems published yet. Check back soon.</p>
```

**To add your first poem:**

1. **Copy this template:**
```html
<article class="writing-entry poem-entry">
  <div class="entry-header">
    <h3 class="entry-title">Your Poem Title</h3>
    <p class="entry-date">Month Year</p>
  </div>
  <div class="entry-content poem-content">
    <p>
      Line one of your poem,<br>
      Line two of your poem,<br>
      Line three continues...<br>
    </p>
    <p>
      New stanza begins here,<br>
      Second line of new stanza,<br>
    </p>
  </div>
</article>
```

2. **Replace the placeholders:**
   - `Your Poem Title` → Your poem title
   - `Month Year` → Date
   - Use `<br>` tags to create line breaks in your poem
   - Use separate `<p>` tags for different stanzas

3. **Example - Nature and Data:**
```html
<article class="writing-entry poem-entry">
  <div class="entry-header">
    <h3 class="entry-title">Patterns in Numbers</h3>
    <p class="entry-date">March 2024</p>
  </div>
  <div class="entry-content poem-content">
    <p>
      We count what we cannot see,<br>
      Numbers flowing where silence was.<br>
      Each transaction a sentence,<br>
      Each pattern a grammar of need.<br>
    </p>
    <p>
      In this language of metrics,<br>
      What voice remains unspoken?<br>
    </p>
  </div>
</article>
```

4. **Remove the empty message** when you add your first poem:
```html
<!-- Delete this line when you add content -->
<p class="empty-message">No poems published yet. Check back soon.</p>
```

---

## KEY POINTS

### Blog Articles vs. Poems
- **Blog Articles:** Use `class="writing-entry"` - standard layout for analytical writing
- **Poems:** Use `class="writing-entry poem-entry"` - preserves line breaks and formatting

### Blog Article Structure
- Title in `<h3 class="entry-title">`
- Date in `<p class="entry-date">`
- Paragraphs in `<p>` tags inside `entry-content`
- Optional "Read Full Article →" link at the bottom

### Poem Structure
- Title in `<h3 class="entry-title">`
- Date in `<p class="entry-date">`
- Lines separated by `<br>` tags
- Stanzas separated by closing `</p>` and opening `<p>` tags
- The `poem-content` class preserves formatting

### Formatting
- **Bold text:** Use `<strong>word</strong>`
- **Italic text:** Use `<em>word</em>`
- **Line breaks:** Use `<br>` (especially for poems)
- **New paragraph:** Use `<p>` tag

---

## WORKFLOW

1. ✅ Open `writing.html`
2. ✅ Find the Blog Articles section OR Poems section
3. ✅ Copy the template
4. ✅ Paste it in the correct section
5. ✅ Replace placeholders with your content
6. ✅ Remove the empty message when you have content
7. ✅ Save the file
8. ✅ Refresh your website to see the changes

---

## EXAMPLE: Complete Article Entry

```html
<article class="writing-entry">
  <div class="entry-header">
    <h3 class="entry-title">The Role of SQL in Data Storytelling</h3>
    <p class="entry-date">January 2024</p>
  </div>
  <div class="entry-content">
    <p>
      SQL queries are more than technical tools—they are instruments of analytical 
      thinking. When crafting queries to answer business questions, you're engaging 
      in structured problem-solving that mirrors the narrative arc of a story.
    </p>
    <p>
      Consider the question: "How does customer retention vary by product category?" 
      This query structure—the WHERE, GROUP BY, and ORDER BY clauses—forces you 
      to decompose the problem logically before execution.
    </p>
    <p>
      The best data analyses begin with clear questions, which translate into clear 
      queries. The discipline of SQL encourages this clarity of thought, making it 
      an essential skill for data-driven storytelling.
    </p>
    <a href="#" class="read-more">Read Full Article →</a>
  </div>
</article>
```

---

## STYLING NOTES

Your content automatically gets professional styling:
- Light mode: Clean white background with blue accents
- Dark mode: Dark background with light text
- Responsive: Works on all screen sizes
- Smooth transitions between light/dark modes

**You don't need to change any CSS** — just add your content to the HTML structure provided.

---

## Need Help?

If you need to edit an existing article:
1. Find the article in `writing.html`
2. Update the content inside the `<p>` tags
3. Update the title or date if needed
4. Save and refresh

If you want to delete an article:
1. Find the entire `<article class="writing-entry">...</article>` block
2. Delete it
3. Save and refresh

---

**Your professional blog page is ready. Add your unique voice and analytical perspective.**
