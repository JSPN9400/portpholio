const serviceCatalog = [
  {
    category: "Website Development",
    type: "website",
    icon: "W",
    benefit: "Conversion-ready websites that make your business look premium and trustworthy.",
    services: [
      { name: "Basic", price: 5999 },
      { name: "Advanced", price: 9999 },
      { name: "Dashboard", price: 14999 },
    ],
  },
  {
    category: "Data Analysis & Dashboard",
    type: "data",
    icon: "D",
    benefit: "Dashboards and reports that turn messy data into faster decisions.",
    services: [
      { name: "Basic", price: 3999 },
      { name: "Dashboard", price: 7999 },
      { name: "Advanced", price: 12999 },
    ],
  },
  {
    category: "SEO & Marketing",
    type: "marketing",
    icon: "S",
    benefit: "SEO that brings real leads, visibility, and stronger local discovery.",
    services: [
      { name: "Basic", price: 2999 },
      { name: "Local", price: 4999 },
      { name: "Advanced", price: 7999 },
    ],
  },
  {
    category: "Ads Management",
    type: "marketing",
    icon: "A",
    benefit: "Campaign systems built for qualified enquiries, not empty clicks.",
    services: [
      { name: "Google Ads", price: 3999 },
      { name: "Meta Ads", price: 3999 },
      { name: "Monthly", price: 6999 },
    ],
  },
  {
    category: "Automation Tools",
    type: "automation",
    icon: "M",
    benefit: "Automation flows that reduce manual work and capture leads faster.",
    services: [
      { name: "WhatsApp", price: 2999 },
      { name: "Lead System", price: 4999 },
      { name: "Custom", price: 8999 },
    ],
  },
];

const defaultReviews = [
  {
    clientName: "Rohit Kumar",
    serviceType: "Website",
    rating: 5,
    reviewText: "The website looked professional and made our business easier to explain to new customers.",
    date: "2026-04-09T10:30:00.000Z",
  },
  {
    clientName: "Anjali Verma",
    serviceType: "Data Analysis",
    rating: 5,
    reviewText: "Our monthly reporting became faster and clearer. The dashboard helped us see important numbers without confusion.",
    date: "2026-04-06T09:00:00.000Z",
  },
  {
    clientName: "Sahil Mehta",
    serviceType: "SEO",
    rating: 5,
    reviewText: "The local SEO work improved our search visibility and brought more serious enquiries from nearby customers.",
    date: "2026-03-31T12:15:00.000Z",
  },
  {
    clientName: "Priya Singh",
    serviceType: "Ads",
    rating: 4,
    reviewText: "The campaign structure was clean, tracked properly, and focused on leads instead of just clicks.",
    date: "2026-03-25T15:45:00.000Z",
  },
  {
    clientName: "Amit Raj",
    serviceType: "Automation",
    rating: 5,
    reviewText: "The WhatsApp lead flow reduced manual follow-up and helped us respond faster to interested customers.",
    date: "2026-03-18T11:20:00.000Z",
  },
  {
    clientName: "Neha Sharma",
    serviceType: "Website",
    rating: 5,
    reviewText: "The site felt modern, loaded smoothly, and gave our startup a more trustworthy first impression.",
    date: "2026-03-12T08:10:00.000Z",
  },
  {
    clientName: "Vikash Gupta",
    serviceType: "Data Analysis",
    rating: 4,
    reviewText: "The Excel and dashboard setup saved time in weekly reviews and made team performance easier to track.",
    date: "2026-03-02T13:00:00.000Z",
  },
];

let latestPdf = null;
let latestFileName = "service-quotation.pdf";
let viewedReviewContext = "";

function formatCurrency(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatPdfCurrency(value) {
  return `INR ${new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(value)}`;
}

function createQuotationFileName(clientName) {
  const safeName = String(clientName || "Client")
    .trim()
    .replace(/[^a-zA-Z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");

  return `Quotation_${safeName || "Client"}.pdf`;
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function normalizeReviewContext(value) {
  if (value === "website") return "Website";
  if (value === "data") return "Data Analysis";
  if (value === "marketing") return "Marketing";
  if (value === "automation") return "Automation";
  return value || "";
}

function getReviewStorage() {
  try {
    const stored = JSON.parse(localStorage.getItem("clientReviews") || "[]");
    return Array.isArray(stored) ? stored : [];
  } catch (error) {
    return [];
  }
}

function saveReviewStorage(reviews) {
  localStorage.setItem("clientReviews", JSON.stringify(reviews));
}

function getAllReviews() {
  return [...defaultReviews, ...getReviewStorage()].sort((a, b) => new Date(b.date) - new Date(a.date));
}

function reviewMatchesContext(review, context) {
  if (context === "Marketing") return review.serviceType === "SEO" || review.serviceType === "Ads";
  return review.serviceType === context;
}

function getActiveReviewContexts() {
  const selectedTypes = Array.from(new Set(getSelectedServices().map((item) => normalizeReviewContext(item.type))));
  if (selectedTypes.length > 0) return selectedTypes;
  return viewedReviewContext ? [viewedReviewContext] : [];
}

function formatRelativeTime(dateValue) {
  const timestamp = new Date(dateValue).getTime();
  const diffMs = Date.now() - timestamp;
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;
  const month = 30 * day;

  if (diffMs < hour) return "Today";
  if (diffMs < day) {
    const hours = Math.max(1, Math.floor(diffMs / hour));
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  }
  if (diffMs < week) {
    const days = Math.max(1, Math.floor(diffMs / day));
    return `${days} ${days === 1 ? "day" : "days"} ago`;
  }
  if (diffMs < month) {
    const weeks = Math.max(1, Math.floor(diffMs / week));
    return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
  }

  const months = Math.max(1, Math.floor(diffMs / month));
  return `${months} ${months === 1 ? "month" : "months"} ago`;
}

function renderStars(rating) {
  const value = Math.max(1, Math.min(5, Number(rating) || 5));
  return "&#9733;".repeat(value) + "&#9734;".repeat(5 - value);
}

function getInitials(name) {
  return String(name || "Client")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

function renderStarsHtml(rating) {
  const value = Math.max(1, Math.min(5, Number(rating) || 5));
  return "&#9733;".repeat(value) + "&#9734;".repeat(5 - value);
}

function getSelectedServices() {
  return Array.from(document.querySelectorAll(".service-checkbox:checked")).map((input) => ({
    category: input.dataset.category,
    name: input.dataset.name,
    price: Number(input.dataset.price),
    type: input.dataset.type,
  }));
}

function getDesignProfile(selected) {
  const types = new Set(selected.map((item) => item.type));
  const hasData = types.has("data");
  const hasWebsite = types.has("website");
  const hasMarketing = types.has("marketing");

  if (types.size > 1) {
    return {
      key: "mixed",
      title: "Integrated Growth Proposal",
      copy: "Your on-page preview combines analytics, digital presence, marketing, and automation cues cleanly.",
      pdfLine: "Integrated layout with service blocks for every selected business goal.",
    };
  }

  if (hasData) {
    return {
      key: "analytics",
      title: "Analytics Proposal",
      copy: "Your on-page preview uses dashboard-style cues for reporting, KPIs, and data-backed decisions.",
      pdfLine: "Analytics layout with KPI blocks, dashboard cues, and decision-focused reporting flow.",
    };
  }

  if (hasWebsite) {
    return {
      key: "tech",
      title: "Modern Tech Proposal",
      copy: "Your on-page preview uses a clean technology structure for website planning and delivery.",
      pdfLine: "Modern tech proposal layout with scope, build flow, and launch-ready presentation.",
    };
  }

  if (hasMarketing) {
    return {
      key: "growth",
      title: "Growth Marketing Proposal",
      copy: "Your on-page preview uses growth-focused cues for reach, leads, campaigns, and visibility.",
      pdfLine: "Growth marketing layout with campaign, reach, lead, and conversion sections.",
    };
  }

  return {
    key: "default",
    title: "Smart Business Proposal",
    copy: "Choose services to shape the on-page proposal preview around your business goal.",
    pdfLine: "Clean business proposal layout for selected services.",
  };
}

function renderCatalog() {
  const catalogGrid = document.getElementById("catalog-grid");
  if (!catalogGrid) return;

  catalogGrid.innerHTML = serviceCatalog
    .map((group) => {
      const options = group.services
        .map((service) => {
          const id = `${group.type}-${group.category}-${service.name}`.toLowerCase().replace(/[^a-z0-9]+/g, "-");
          return `
            <label class="service-option" for="${id}">
              <input class="service-checkbox" type="checkbox" id="${id}" data-category="${group.category}" data-name="${service.name}" data-price="${service.price}" data-type="${group.type}">
              <span class="service-name">${service.name}</span>
              <span class="service-price">${formatCurrency(service.price)}</span>
            </label>
          `;
        })
        .join("");

      return `
        <article class="service-category" data-review-context="${group.type}">
          <div class="service-category-head">
            <span class="service-icon">${group.icon}</span>
            <div>
              <h3>${group.category}</h3>
              <p>${group.benefit}</p>
            </div>
          </div>
          <div class="service-list">${options}</div>
        </article>
      `;
    })
    .join("");

  catalogGrid.querySelectorAll(".service-checkbox").forEach((checkbox) => {
    checkbox.addEventListener("change", updateSummary);
  });
}

function updateProposalStyle(selected) {
  const visual = document.getElementById("proposal-visual");
  const label = document.getElementById("proposal-style-label");
  const copy = document.getElementById("proposal-style-copy");
  const logicText = document.getElementById("design-logic-text");
  const profile = getDesignProfile(selected);

  if (visual) {
    visual.classList.remove("analytics", "tech", "growth", "mixed");
    if (profile.key !== "default") visual.classList.add(profile.key);
  }

  if (label) label.textContent = profile.title;
  if (copy) copy.textContent = profile.copy;
  if (logicText) logicText.textContent = profile.copy;
}

function updateSummary() {
  const selected = getSelectedServices();
  const total = selected.reduce((sum, item) => sum + item.price, 0);
  const selectedServices = document.getElementById("selected-services");
  const summaryTotal = document.getElementById("summary-total");
  const summaryTotalBottom = document.getElementById("summary-total-bottom");

  if (summaryTotal) summaryTotal.textContent = formatCurrency(total);
  if (summaryTotalBottom) summaryTotalBottom.textContent = formatCurrency(total);

  if (selectedServices) {
    selectedServices.innerHTML = selected.length
      ? selected
          .map(
            (item) => `
              <div class="selected-item">
                <span>${item.category} - ${item.name}</span>
                <strong>${formatCurrency(item.price)}</strong>
              </div>
            `
          )
          .join("")
      : '<p class="empty-state">No services selected yet.</p>';
  }

  updateProposalStyle(selected);
  renderReviews();
}

function renderReviews() {
  const grid = document.getElementById("reviews-grid");
  const averageRating = document.getElementById("average-rating");
  const totalClients = document.getElementById("total-clients");
  const filterNote = document.getElementById("review-filter-note");
  if (!grid) return;

  const allReviews = getAllReviews();
  const contexts = getActiveReviewContexts();
  const matchingReviews = contexts.length
    ? allReviews.filter((review) => contexts.some((context) => reviewMatchesContext(review, context)))
    : allReviews;
  const visibleReviews = matchingReviews.length
    ? matchingReviews
    : [...allReviews].sort((a, b) => Number(b.rating) - Number(a.rating) || new Date(b.date) - new Date(a.date)).slice(0, 4);

  const average = allReviews.length
    ? allReviews.reduce((sum, review) => sum + Number(review.rating), 0) / allReviews.length
    : 0;

  if (averageRating) averageRating.innerHTML = `&#9733; ${Math.max(4.8, average).toFixed(1)}/5`;
  if (totalClients) totalClients.textContent = `${Math.max(20, allReviews.length)}+`;
  if (filterNote) {
    filterNote.textContent = matchingReviews.length
      ? `Showing ${contexts.length ? contexts.join(" + ") : "all"} reviews matched to your current interest.`
      : "No exact match yet, so the top reviews are shown.";
  }

  grid.innerHTML = visibleReviews
    .map(
      (review, index) => `
        <article class="review-card${index === 0 ? " featured-review" : ""}">
          <div class="review-card-top">
            <div class="review-identity">
              <span class="review-avatar">${escapeHtml(getInitials(review.clientName))}</span>
              <div>
                <span class="review-client">${escapeHtml(review.clientName)}</span>
                <span class="review-tag">${escapeHtml(review.serviceType)}</span>
              </div>
            </div>
            <span class="review-time">${formatRelativeTime(review.date)}</span>
          </div>
          <span class="review-stars" aria-label="${Number(review.rating)} out of 5 stars">${renderStarsHtml(review.rating)}</span>
          <p class="review-text">&ldquo;${escapeHtml(review.reviewText)}&rdquo;</p>
          <div class="review-card-meta">
            <span>${contexts.length ? "Matched to your interest" : "Top client experience"}</span>
          </div>
        </article>
      `
    )
    .join("");
}

function initReviewContextObserver() {
  const categories = document.querySelectorAll(".service-category[data-review-context]");
  if (!("IntersectionObserver" in window) || categories.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible || getSelectedServices().length > 0) return;
      viewedReviewContext = normalizeReviewContext(visible.target.dataset.reviewContext);
      renderReviews();
    },
    { threshold: 0.45 }
  );

  categories.forEach((category) => observer.observe(category));
}

function initReviewForm() {
  const form = document.getElementById("review-form");
  const message = document.getElementById("review-message");
  if (!form || !message) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = Object.fromEntries(new FormData(form).entries());
    const review = {
      clientName: formData.clientName,
      serviceType: formData.serviceType,
      rating: Number(formData.rating),
      reviewText: formData.reviewText,
      date: new Date().toISOString(),
    };

    const savedReviews = getReviewStorage();
    savedReviews.push(review);
    saveReviewStorage(savedReviews);

    viewedReviewContext = review.serviceType === "SEO" || review.serviceType === "Ads" ? "Marketing" : review.serviceType;
    form.reset();
    message.className = "form-note success";
    message.textContent = "Thank you. Your review has been added to the client experience engine.";
    renderReviews();
  });
}

function initHeroParallax() {
  const hero = document.querySelector(".freelance-hero");
  const visual = document.querySelector(".proposal-visual");
  if (!hero || !visual) return;

  hero.addEventListener("pointermove", (event) => {
    if (window.matchMedia("(max-width: 980px)").matches) return;
    const rect = hero.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    visual.style.transform = `perspective(1200px) rotateY(${-7 + x * 5}deg) rotateX(${y * -4}deg) translate3d(${x * 10}px, ${y * 10}px, 0)`;
  });

  hero.addEventListener("pointerleave", () => {
    visual.style.transform = "";
  });
}

function createPdf(formData, selected) {
  const jsPdfLibrary = window.jspdf;
  if (!jsPdfLibrary || !jsPdfLibrary.jsPDF) {
    throw new Error("PDF library is still loading. Please try again in a moment.");
  }

  const { jsPDF } = jsPdfLibrary;
  const doc = new jsPDF();
  const total = selected.reduce((sum, item) => sum + item.price, 0);
  const page = { width: 210, height: 297, margin: 14 };
  const colors = {
    navy: [10, 31, 68],
    blue: [47, 107, 232],
    lightBlue: [232, 241, 255],
    ink: [24, 33, 51],
    muted: [86, 99, 118],
    line: [220, 226, 236],
    card: [255, 255, 255],
    shadow: [226, 232, 242],
    soft: [248, 249, 252],
  };
  let y = 50;

  function setColor(type, color) {
    if (type === "text") doc.setTextColor(...color);
    if (type === "fill") doc.setFillColor(...color);
    if (type === "draw") doc.setDrawColor(...color);
  }

  function addHeader() {
    setColor("fill", colors.navy);
    doc.rect(0, 0, page.width, 36, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(17);
    setColor("text", [255, 255, 255]);
    doc.text("Freelance Service Quotation", page.margin, 15);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text(`Custom Proposal for ${formData.clientName || "Client"}`, page.margin, 24);
    doc.text(new Date().toLocaleDateString("en-IN"), page.width - page.margin, 15, { align: "right" });
  }

  function addNewPage() {
    doc.addPage();
    setColor("fill", colors.soft);
    doc.rect(0, 0, page.width, page.height, "F");
    addHeader();
    y = 50;
  }

  function ensurePdfSpace(requiredHeight) {
    if (y + requiredHeight <= 270) return;
    addNewPage();
  }

  function drawCard(x, cardY, width, height, title, iconText) {
    setColor("fill", colors.shadow);
    doc.roundedRect(x + 1.5, cardY + 1.8, width, height, 3, 3, "F");
    setColor("fill", colors.card);
    setColor("draw", colors.line);
    doc.roundedRect(x, cardY, width, height, 3, 3, "FD");
    setColor("fill", colors.lightBlue);
    doc.circle(x + 9, cardY + 10, 5, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    setColor("text", colors.blue);
    doc.text(iconText, x + 9, cardY + 12.6, { align: "center" });
    doc.setFontSize(11);
    setColor("text", colors.navy);
    doc.text(title, x + 17, cardY + 12);
  }

  function drawLabelValue(x, lineY, label, value, maxWidth = 66) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    setColor("text", colors.muted);
    doc.text(label, x, lineY);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    setColor("text", colors.ink);
    doc.text(doc.splitTextToSize(String(value || "-"), maxWidth), x, lineY + 5);
  }

  function addTextCard(title, iconText, text, height = 34) {
    ensurePdfSpace(height + 8);
    drawCard(page.margin, y, 182, height, title, iconText);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    setColor("text", colors.ink);
    doc.text(doc.splitTextToSize(text, 158), 24, y + 23);
    y += height + 8;
  }

  doc.setProperties({
    title: "Freelance Service Quotation",
    subject: "Premium freelance service proposal",
    author: "Jaisankar Prasad Nirala",
  });

  setColor("fill", colors.soft);
  doc.rect(0, 0, page.width, page.height, "F");
  addHeader();

  drawCard(page.margin, y, 88, 46, "Client Details", "C");
  drawLabelValue(23, y + 24, "Client Name", formData.clientName);
  drawLabelValue(23, y + 35, "Business Type", formData.businessType);
  drawLabelValue(68, y + 35, "Contact", formData.clientContact, 32);

  drawCard(108, y, 88, 46, "Service Provider", "P");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  setColor("text", colors.ink);
  doc.text("Jaisankar Prasad Nirala", 117, y + 25);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.6);
  doc.text(doc.splitTextToSize("Freelance Data Analyst & Digital Solutions Provider", 68), 117, y + 32);
  y += 56;

  const serviceCardHeight = 32 + selected.length * 9 + 24;
  ensurePdfSpace(serviceCardHeight + 8);
  drawCard(page.margin, y, 182, serviceCardHeight, "Services & Pricing", "S");
  let tableY = y + 22;
  setColor("fill", colors.soft);
  doc.roundedRect(22, tableY, 166, 9, 2, 2, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  setColor("text", colors.navy);
  doc.text("Service", 26, tableY + 6);
  doc.text("Type", 108, tableY + 6);
  doc.text("Price", 184, tableY + 6, { align: "right" });
  tableY += 13;

  selected.forEach((item) => {
    setColor("draw", colors.line);
    doc.line(22, tableY - 4, 188, tableY - 4);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.8);
    setColor("text", colors.ink);
    doc.text(doc.splitTextToSize(item.name, 70), 26, tableY);
    setColor("text", colors.muted);
    doc.text(doc.splitTextToSize(item.category, 55), 108, tableY);
    doc.setFont("helvetica", "bold");
    setColor("text", colors.ink);
    doc.text(formatPdfCurrency(item.price), 184, tableY, { align: "right" });
    tableY += 9;
  });

  setColor("fill", colors.lightBlue);
  doc.roundedRect(116, y + serviceCardHeight - 18, 72, 12, 3, 3, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  setColor("text", colors.navy);
  doc.text("Total Cost", 122, y + serviceCardHeight - 10);
  doc.setFontSize(13);
  doc.text(formatPdfCurrency(total), 184, y + serviceCardHeight - 10, { align: "right" });
  y += serviceCardHeight + 8;

  const notes = (formData.requirementNotes || "").trim() || "To be discussed during project consultation.";
  addTextCard("Notes", "N", notes, Math.max(34, 26 + doc.splitTextToSize(notes, 158).length * 5));
  addTextCard(
    "Timeline",
    "T",
    "Project timeline will be defined based on the scope, complexity, and requirements after final discussion.",
    36
  );

  const paymentTerms = [
    "25% advance payment is required to start the project.",
    "Remaining payment will be completed in agreed milestones.",
    "For projects below \u20B950,000, work will proceed based on mutual agreement without formal MoU.",
    "Assurance: This does not affect service quality. A proper bill and signed document will be provided, clearly mentioning all requirements and deliverables.",
    "For projects above \u20B950,000, a formal MoU agreement will be created to ensure transparency and commitment.",
  ];
  const termLines = paymentTerms.flatMap((term) => doc.splitTextToSize(term, 154));
  const paymentHeight = Math.max(76, 25 + termLines.length * 5.2);
  ensurePdfSpace(paymentHeight + 24);
  drawCard(page.margin, y, 182, paymentHeight, "Payment & Agreement Terms", "P");
  let termY = y + 24;
  paymentTerms.forEach((term, index) => {
    const lines = doc.splitTextToSize(term, 154);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    setColor("text", colors.blue);
    doc.text(`${index + 1}.`, 24, termY);
    doc.setFont("helvetica", "normal");
    setColor("text", colors.ink);
    doc.text(lines, 32, termY);
    termY += lines.length * 5 + 4;
    if (index === 1) {
      setColor("draw", colors.line);
      doc.line(24, termY - 1, 186, termY - 1);
      termY += 4;
    }
  });
  y += paymentHeight + 12;

  ensurePdfSpace(24);
  setColor("draw", colors.line);
  doc.line(page.margin, y, 196, y);
  y += 8;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  setColor("text", colors.navy);
  doc.text("This is not just a service, it's a growth system for your business.", page.margin, y);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  setColor("text", colors.muted);
  doc.text("Prepared by Jaisankar Prasad Nirala", page.margin, y + 8);

  return doc;
}

function buildWhatsappLink(formData, selected) {
  const total = selected.reduce((sum, item) => sum + item.price, 0);
  const lines = [
    "Hi Jaishankar, I generated a service quotation.",
    `Name: ${formData.clientName}`,
    `Business Type: ${formData.businessType}`,
    `Contact: ${formData.clientContact}`,
    "Selected Services:",
    ...selected.map((item) => `- ${item.category} - ${item.name}: ${formatCurrency(item.price)}`),
    `Total: ${formatCurrency(total)}`,
    `Notes: ${formData.requirementNotes || "To be discussed"}`,
  ];

  return `https://wa.me/?text=${encodeURIComponent(lines.join("\n"))}`;
}

function initQuotationForm() {
  const form = document.getElementById("quote-form");
  const message = document.getElementById("quote-message");
  const actions = document.getElementById("quote-actions");
  const downloadButton = document.getElementById("download-quote");
  const whatsappLink = document.getElementById("send-whatsapp");
  const stickyWhatsapp = document.getElementById("sticky-whatsapp");

  if (!form || !message || !actions || !downloadButton || !whatsappLink) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    message.className = "form-note";
    message.textContent = "";

    const selected = getSelectedServices();
    if (selected.length === 0) {
      message.classList.add("error");
      message.textContent = "Please select at least one service before creating a quotation.";
      return;
    }

    const formData = Object.fromEntries(new FormData(form).entries());

    try {
      latestPdf = createPdf(formData, selected);
      latestFileName = createQuotationFileName(formData.clientName);

      const whatsappHref = buildWhatsappLink(formData, selected);
      whatsappLink.href = whatsappHref;
      if (stickyWhatsapp) stickyWhatsapp.href = whatsappHref;

      actions.hidden = false;
      message.classList.add("success");
      message.textContent = "Quotation is ready. Download the PDF or send the summary through WhatsApp.";
      latestPdf.save(latestFileName);
    } catch (error) {
      message.classList.add("error");
      message.textContent = error.message;
    }
  });

  downloadButton.addEventListener("click", () => {
    if (!latestPdf) return;
    latestPdf.save(latestFileName);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderCatalog();
  initReviewContextObserver();
  initReviewForm();
  initHeroParallax();
  updateSummary();
  initQuotationForm();
});
