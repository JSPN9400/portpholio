# Jaishankar Prasad Nirala — Portfolio Website

## 🚀 How to Deploy on GitHub Pages

### Step 1: Upload all files to your GitHub repo
Upload the ENTIRE folder structure to: `https://github.com/JSPN9400/portpholio`

### File Structure:
```
portpholio/
├── index.html                    ← Main website file
├── README.md                     ← This file
└── assets/
    ├── css/
    │   └── main.css              ← All styles
    ├── js/
    │   └── app.js                ← All JavaScript
    ├── data/
    │   ├── projects.json         ← Edit to update projects
    │   ├── articles.json         ← Edit to add blog posts
    │   ├── timeline.json         ← Edit to update journey
    │   ├── testimonials.json     ← Edit to add testimonials
    │   └── Jaishankar_Prasad_Nirala_Resume.docx
    └── images/
        └── photo.jpg             ← ADD YOUR PHOTO HERE

### Step 2: Enable GitHub Pages
1. Go to repo Settings
2. Click "Pages" in left sidebar
3. Under "Source" → select "main" branch → "/ (root)"
4. Click Save
5. Wait 2-3 minutes → live at: https://jspn9400.github.io/portpholio/

### Step 3: Add Your Photo
- Name your photo: `photo.jpg`
- Upload to: `assets/images/photo.jpg`
- Best size: 400x400px, square crop

## ✏️ How to Update Content (No Coding Needed)

### Add a new project:
Edit `assets/data/projects.json` — copy an existing project block and change the values.

### Add a blog article:
Edit `assets/data/articles.json` — add a new entry at the top of the array.

### Update your journey:
Edit `assets/data/timeline.json` — add or edit entries.

### Add client testimonials:
Edit `assets/data/testimonials.json` — add new testimonial objects.

## 📧 Contact Form
The contact button opens the user's email client with your info pre-filled.
To change email: search `jaishankar.9400@gmail.com` in `assets/js/app.js`
