# Meta Tags & Schema Markup Reference

**Website:** JSPN Portfolio  
**Date:** May 20, 2026

---

## 📄 Meta Tags Summary

### All Pages Include:
```html
<!-- Charset and Viewport -->
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<!-- Robots & Indexing -->
<meta name="robots" content="index, follow">

<!-- Theme Color -->
<meta name="theme-color" content="#0b1020">

<!-- Canonical URL -->
<link rel="canonical" href="https://jspn9400.github.io/portpholio/[page]">

<!-- Language Tags -->
<link rel="alternate" hreflang="en" href="https://jspn9400.github.io/portpholio/[page]">
<link rel="alternate" hreflang="x-default" href="https://jspn9400.github.io/portpholio/[page]">

<!-- Open Graph (Social Media) -->
<meta property="og:type" content="website">
<meta property="og:locale" content="en_US">
<meta property="og:site_name" content="JSPN Portfolio">
<meta property="og:title" content="...">
<meta property="og:description" content="...">
<meta property="og:url" content="https://jspn9400.github.io/portpholio/[page]">
<meta property="og:image" content="...">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="...">
<meta name="twitter:description" content="...">
<meta name="twitter:image" content="...">
```

---

## 📝 Page-Specific Meta Tags

### **index.html (Home Page)**
```
Title: Data Analyst Portfolio | Python, SQL & Power BI Expert
Description: Indian Data Analyst Portfolio showcasing Python, SQL reporting, Power BI dashboards & business automation. Hire an MIS reporting specialist.
Keywords: Data Analyst Portfolio, Python Data Analyst, SQL Reporting Specialist, Power BI Dashboard Developer, MIS Executive Portfolio, Jaishankar Prasad Nirala, JSPN portfolio, data analyst India, data analytics upwork
```

### **projects.html (Projects Page)**
```
Title: Projects | Jaishankar Prasad Nirala
Description: Case-study style data analytics projects by Jaishankar Prasad Nirala.
Keywords: data analytics projects, Python projects, SQL database projects, Power BI dashboards, analytics case studies, business intelligence portfolio, data analyst projects
```

### **freelance.html (Services Page)**
```
Title: Freelance Services & Quotation | Jaishankar Prasad Nirala
Description: Select website, analytics, SEO, ads, and automation services to generate a personalized quotation PDF instantly.
Keywords: freelance data analyst, freelance Python developer, freelance SQL specialist, Power BI services, reporting automation, business analytics services, freelance India
```

### **resume.html (Resume Page)**
```
Title: Resume | Jaishankar Prasad Nirala
Description: Resume of Jaishankar Prasad Nirala - Data Analyst, MIS and Business Reporting.
Keywords: resume, data analyst resume, SQL reporting, Python developer, Power BI specialist, MIS executive, business analytics resume, Jaishankar Prasad Nirala resume
```

### **writing.html (Writing Page)**
```
Title: Writing | Jaishankar Prasad Nirala
Description: Personal writing by Jaishankar Prasad Nirala on thoughts, society, politics, dharm, environment, poems, and data analysis.
Keywords: personal blog, thoughts, politics writing, dharm, environment, poems, analytics writing, Jaishankar Prasad Nirala
```

### **admin.html (Admin - NOT Indexed)**
```
<meta name="robots" content="noindex, nofollow">
```

---

## 🏷️ Schema Markup Implementation

### 1. **Person Schema** (index.html)
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Jaishankar Prasad Nirala",
  "image": "https://jspn9400.github.io/portpholio/assets/others/IMG_20260103_113121168.jpg",
  "jobTitle": "Data Analyst",
  "url": "https://jspn9400.github.io/portpholio/",
  "sameAs": [
    "https://github.com/JSPN9400",
    "https://www.linkedin.com/in/jaishankar-prasad-nirala-440a44243/"
  ],
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "IN",
    "countryName": "India"
  },
  "knowsAbout": [
    "Data Analysis", "SQL", "Python", "Power BI",
    "Business Automation", "Reporting", "Dashboard Development"
  ]
}
```

**Purpose:** Helps Google understand who you are and what you do

---

### 2. **Organization Schema** (index.html)
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "JSPN Portfolio",
  "url": "https://jspn9400.github.io/portpholio/",
  "logo": "https://jspn9400.github.io/portpholio/assets/others/IMG_20260103_113121168.jpg",
  "description": "Data Analytics and Business Automation Portfolio Services",
  "sameAs": [
    "https://github.com/JSPN9400",
    "https://www.linkedin.com/in/jaishankar-prasad-nirala-440a44243/"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "availableLanguage": ["en"]
  }
}
```

**Purpose:** Establishes business identity and connections

---

### 3. **WebSite Schema** (index.html)
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "JSPN Portfolio",
  "url": "https://jspn9400.github.io/portpholio/",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://jspn9400.github.io/portpholio/?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
}
```

**Purpose:** Enables site search functionality in Google results

---

### 4. **WebPage Schema** (All pages)
```json
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "[Page Title]",
  "url": "[Page URL]",
  "description": "[Page Description]",
  "inLanguage": "en",
  "isPartOf": {
    "@id": "https://jspn9400.github.io/portpholio/"
  }
}
```

**Purpose:** Describes each page's purpose and content

---

### 5. **CollectionPage Schema** (projects.html)
```json
{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Projects | Jaishankar Prasad Nirala",
  "url": "https://jspn9400.github.io/portpholio/projects.html",
  "description": "Impact-focused data analytics case studies with problem, solution, tools, and measurable outcomes.",
  "inLanguage": "en",
  "creator": {
    "@type": "Person",
    "name": "Jaishankar Prasad Nirala",
    "url": "https://jspn9400.github.io/portpholio/"
  }
}
```

**Purpose:** Identifies page as collection of projects

---

### 6. **LocalBusiness Schema** (freelance.html)
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "JSPN Freelance Services",
  "url": "https://jspn9400.github.io/portpholio/freelance.html",
  "description": "Data Analytics, Python, SQL, Power BI, and Automation freelance services.",
  "areaServed": "IN",
  "offers": [
    {
      "@type": "Offer",
      "name": "Data Analytics",
      "description": "SQL, Python, and Power BI analytics solutions"
    },
    {
      "@type": "Offer",
      "name": "Business Automation",
      "description": "Reporting automation and workflow optimization"
    },
    {
      "@type": "Offer",
      "name": "Dashboard Development",
      "description": "Custom Power BI and analytics dashboards"
    }
  ]
}
```

**Purpose:** Shows your services in search results

---

## 🔍 Open Graph Tags (Social Media)

### Implemented Across All Pages:
```
og:type: website
og:locale: en_US
og:site_name: JSPN Portfolio
og:title: [Page Title]
og:description: [Page Description]
og:url: [Page URL]
og:image: [Preview Image]
```

**Purpose:** 
- Improves appearance when shared on Facebook, LinkedIn, Twitter
- Makes links look professional on social media
- Increases click-through rates from social platforms

---

## 🐦 Twitter Card Tags

### Implemented Across All Pages:
```
twitter:card: summary_large_image
twitter:title: [Page Title]
twitter:description: [Page Description]
twitter:image: [Preview Image]
```

**Purpose:**
- Optimizes how links appear when shared on Twitter
- Creates rich preview with image
- Increases engagement on Twitter

---

## 📊 robots.txt Configuration

```
User-agent: *
Allow: /
Disallow: /admin.html
Disallow: /simple_form_test.html
Sitemap: https://jspn9400.github.io/portpholio/sitemap.xml
```

**Purpose:**
- Tells search engines which pages to crawl
- Protects admin pages from indexing
- Directs crawlers to sitemap

---

## 🗺️ Sitemap Structure

**File:** sitemap.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://jspn9400.github.io/portpholio/</loc>
    <lastmod>2026-05-20</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <!-- ... other URLs ... -->
</urlset>
```

**Priorities Set:**
- Homepage: 1.0 (highest)
- Projects: 0.9
- Freelance: 0.9
- Writing: 0.8
- Resume: 0.6 (lowest)

---

## ✅ Testing Tools

### Validate Your Meta Tags:
1. **Google Search Console**
   - https://search.google.com/search-console
   - View how pages appear in search

2. **Schema Markup Validator**
   - https://schema.org/docs/schemas.html
   - Validate JSON-LD implementation

3. **Meta Tags Preview**
   - https://metatags.io
   - Preview how links appear on social media

4. **PageSpeed Insights**
   - https://pagespeed.web.dev/
   - Check page speed and SEO score

---

## 📋 Checklist for Future Pages

When adding new pages, include:

- [ ] `<meta charset="UTF-8">`
- [ ] `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
- [ ] `<title>` (50-60 characters)
- [ ] `<meta name="description">` (150-160 characters)
- [ ] `<meta name="keywords">` (5-7 relevant keywords)
- [ ] `<meta name="robots" content="index, follow">`
- [ ] `<link rel="canonical">`
- [ ] `<link rel="alternate" hreflang="en">`
- [ ] Open Graph tags (og:)
- [ ] Twitter Card tags (twitter:)
- [ ] Appropriate schema markup (JSON-LD)
- [ ] Update sitemap.xml
- [ ] Submit to Google Search Console

---

## 🎯 Expected Improvements

With proper meta tags and schema markup:
- ✅ Better search result appearance
- ✅ Rich snippets in search results
- ✅ Higher click-through rates (CTR)
- ✅ Improved social media sharing
- ✅ Better crawling by search engines
- ✅ Enhanced knowledge panel generation

---

**Status:** ✅ All Meta Tags & Schema Properly Configured

Last Updated: May 20, 2026
