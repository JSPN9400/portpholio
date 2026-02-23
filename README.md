# 🌐 My Portfolio

Welcome to my personal portfolio website! A modern, fully responsive portfolio showcasing data analyst expertise with interactive features, admin content management, and professional design.

Built with **HTML5**, **CSS3**, and **JavaScript** - no frameworks needed.

---

## ✨ Features

### **🎯 Professional Showcase**
- ✅ **Modern Hero Section** — Value-focused messaging with strategic CTAs
- ✅ **Interactive Skills Cards** — Visual proficiency levels with progress bars
- ✅ **Featured Projects** — Data analytics projects with technical depth
- ✅ **Writing & Reflections** — Blog articles and poems section
- ✅ **Professional Contact** — Expanded contact section with social links

### **🔐 Admin Portal**
- ✅ **Password Protected** — Secure login (ID: jspn, Password: jspn_14102002)
- ✅ **Content Management** — Add blog articles and poems via simple form
- ✅ **Backup & Restore** — Download and restore content as JSON
- ✅ **Credential Management** — Change password anytime
- ✅ **Hidden from Viewers** — Admin link not visible to public

### **🎨 Design & UX**
- ✅ **Dark/Light Theme** — Automatic theme toggle with persistence
- ✅ **Responsive Layout** — Mobile, tablet, desktop optimized
- ✅ **Smooth Animations** — Professional transitions and hover effects
- ✅ **Modern Gradient** — Subtle backgrounds and accent elements
- ✅ **Accessibility** — Proper contrast, focus states, semantic HTML

---

## 🚀 Live Features

### **Hero Section**
- Compelling headline: "Data Analyst Solving Business Problems"
- Value-focused tagline
- 4 CTA buttons: View Projects, Hire Me, View Resume, Download Resume
- Subtle gradient background with animated accent orb
- Smooth hover animations on buttons

### **Skills Section**
- 8 interactive skill cards
- Proficiency levels (Expert, Advanced)
- Animated progress bars showing skill percentage
- Hover animations with shimmer effects
- Staggered load animations

### **Projects Page**
- Featured data analytics projects
- SQL query examples with code blocks
- Technical details and methodologies

### **Writing Page**
- Blog articles section
- Poems section
- Dynamic content loading from admin portal
- Empty state handling

### **Admin Portal** (`admin.html`)
- Password protected login (ID + Password)
- Add blog articles with title, date, content
- Add poems with title, date, poem text
- View all content with delete option
- Download backup as JSON
- Restore from backup file
- Change credentials anytime

### **Contact Section**
- Expanded, full-width design
- Social media links with hover animations
- Professional styling with gradient
- Icons with color transitions
- Responsive flexbox layout

---

## 📁 File Structure

```
portfolio/
├── index.html              # Home page with hero & skills
├── projects.html           # Projects showcase
├── writing.html            # Blog articles & poems
├── admin.html              # Admin portal (password protected)
├── resume.html             # Resume page
├── README.md               # This file
├── ADMIN_GUIDE.md          # Admin portal documentation
├── CONTENT_MANAGEMENT.md   # Content management guide
├── HERO_REDESIGN.md        # Hero section details
├── assets/
│   ├── css/
│   │   ├── style.css       # Main stylesheet (1500+ lines)
│   │   └── project.css     # Projects page styling
│   ├── js/
│   │   ├── script.js       # Theme toggle & animations
│   │   ├── admin.js        # Admin portal logic
│   │   ├── project.js      # Projects page logic
│   │   └── writing.js      # Writing page content loader
│   └── others/
│       ├── resume.pdf      # Downloadable resume
│       └── IMG_*.jpg       # Profile images
└── .gitignore
```

---

## 🔧 Getting Started

### **1. Clone & Setup**
```bash
git clone <repository-url>
cd portfolio
```

### **2. Open Locally**
```bash
# Simply open in browser
open index.html
# Or use Live Server in VS Code
```

### **3. Admin Portal Access**
- Navigate to: `admin.html`
- Login with: ID: `jspn`, Password: `jspn_14102002`
- Add content via simple form
- Content appears on Writing page instantly

### **4. Deploy to GitHub Pages**
```bash
git add .
git commit -m "Your message"
git push origin main
```
Then enable GitHub Pages in repo settings → main branch.

---

## 🎨 Customization

### **Change Admin Credentials**
In `admin.html`, go to "Forgot Password?" and set new credentials.

### **Update Hero Section**
Edit in `index.html`:
- `hero-title` — Main headline
- `hero-tagline` — Value proposition
- `cta-button` links — CTA destinations

### **Modify Skills**
Edit in `index.html` `skills` section:
- Add/remove skill cards
- Update percentages and levels
- Change proficiency badges

### **Update Projects**
Edit in `projects.html`:
- Add new project cards
- Update SQL queries
- Link to your projects

### **Customize Colors**
In `assets/css/style.css`, edit `:root` variables:
```css
:root {
  --color-accent: #4f46e5;
  --color-accent2: #5fa3d0;
  --color-bg: #ffffff;
  --color-text: #1a1a1a;
  /* ... more colors */
}
```

---

## 🔐 Security Notes

- Admin credentials stored in browser localStorage (survives browser restart)
- Clear browser cache/cookies to reset admin access
- Download regular backups to protect content
- Backup files are JSON format (human-readable)
- Content not persisted to server (client-side only)

---

## 📱 Device Support

- **Desktop**: Full-featured experience
- **Tablet**: Responsive layout, all features
- **Mobile**: Stack layout, touch-friendly buttons
- **Dark Mode**: All devices, automatic/manual toggle

---

## 📊 Performance

- **No dependencies** — Pure HTML/CSS/JavaScript
- **Fast load** — Minimal CSS (~1500 lines), efficient JS
- **GPU accelerated** — CSS animations use transform/opacity
- **Responsive images** — Lazy loading with proper sizing
- **Accessibility** — WCAG compliant, semantic HTML

---

## 🎯 Page Breakdown

| Page | Features | Key Sections |
|------|----------|--------------|
| **index.html** | Hero, About, Skills | Professional showcase |
| **projects.html** | Project cards, SQL queries | Technical depth |
| **writing.html** | Blog articles, Poems | Dynamic content |
| **admin.html** | Content management | Password protected |
| **resume.html** | Full resume | Education & experience |

---

## 🔄 Content Management Workflow

1. **Add Content**
   - Go to `admin.html`
   - Login with credentials
   - Fill form (title, date, content)
   - Click "Add Content"

2. **View Content**
   - Go to `writing.html`
   - Articles and poems appear instantly
   - Responsive, professional layout

3. **Backup Content**
   - Click "⬇️ Download Backup"
   - Save JSON file to cloud storage
   - Protects against data loss

4. **Restore Content**
   - Click "⬆️ Restore Backup"
   - Select JSON file
   - Content restored instantly

5. **Change Credentials**
   - Click "Forgot Password?" on login
   - Set new ID and password
   - Use new credentials next time

---

## 📈 Recent Updates (Feb 23, 2026)

✅ Hero section redesign with value-focused messaging  
✅ Interactive skills cards with proficiency levels  
✅ Expanded contact section with better styling  
✅ Admin portal with password protection  
✅ Content management system with backup/restore  
✅ Blog & poem management  
✅ Improved responsive design  
✅ Enhanced dark mode support  

---

## 🛠️ Technologies

- **HTML5** — Semantic markup
- **CSS3** — Gradients, animations, flexbox/grid
- **JavaScript (Vanilla)** — No frameworks, pure DOM manipulation
- **localStorage** — Client-side content persistence
- **GitHub Pages** — Free hosting

---

## 👨‍💻 Author

**Jaishankar Prasad Nirala**  
📊 Data Analyst | 🐍 Python Developer | 💻 Business Insights

**Expertise:**  
SQL • Python • Power BI • Excel • Data Analysis • KPI Reporting

---

## 📞 Contact & Links

- 📧 **Email**: [nirla9400@gmail.com](mailto:nirla9400@gmail.com)
- 🐙 **GitHub**: [JSPN9400](https://github.com/JSPN9400)
- 💼 **LinkedIn**: [Jaishankar Prasad Nirala](https://www.linkedin.com/in/jaishankar-prasad-nirala-440a44243/)
- 📱 **WhatsApp**: [+91 8084310066](https://wa.me/+918084310066)

---

## 📝 License

This portfolio is open source and available for personal use. Feel free to fork, customize, and use as inspiration for your own portfolio!

---

**Built with ❤️ | Last Updated: February 23, 2026**  
- 🧑‍💻 GitHub: [JSPN9400](https://github.com/JSPN9400)

---

> _“Code is like poetry — it deserves structure, beauty, and impact.”_

---

Thank you for visiting my portfolio! 🌟
python -c "import lxml; print('lxml OK')"
