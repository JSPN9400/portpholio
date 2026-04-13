const serviceCatalog = [
  {
    category: "Website Development",
    type: "website",
    services: [
      { name: "Basic", price: 5999 },
      { name: "Advanced", price: 9999 },
      { name: "Dashboard", price: 14999 },
    ],
  },
  {
    category: "Data Analysis & Dashboard",
    type: "data",
    services: [
      { name: "Basic", price: 3999 },
      { name: "Dashboard", price: 7999 },
      { name: "Advanced", price: 12999 },
    ],
  },
  {
    category: "SEO & Marketing",
    type: "marketing",
    services: [
      { name: "Basic", price: 2999 },
      { name: "Local", price: 4999 },
      { name: "Advanced", price: 7999 },
    ],
  },
  {
    category: "Ads Management",
    type: "marketing",
    services: [
      { name: "Google Ads", price: 3999 },
      { name: "Meta Ads", price: 3999 },
      { name: "Monthly", price: 6999 },
    ],
  },
  {
    category: "Automation Tools",
    type: "automation",
    services: [
      { name: "WhatsApp", price: 2999 },
      { name: "Lead System", price: 4999 },
      { name: "Custom", price: 8999 },
    ],
  },
];

let latestPdf = null;
let latestFileName = "service-quotation.pdf";

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
        <article class="service-category">
          <h3>${group.category}</h3>
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
}

function createPdf(formData, selected) {
  const jsPdfLibrary = window.jspdf;
  if (!jsPdfLibrary || !jsPdfLibrary.jsPDF) {
    throw new Error("PDF library is still loading. Please try again in a moment.");
  }

  const { jsPDF } = jsPdfLibrary;
  const doc = new jsPDF();
  const total = selected.reduce((sum, item) => sum + item.price, 0);
  let y = 20;

  function ensurePdfSpace(requiredHeight) {
    if (y + requiredHeight <= 282) return;
    doc.addPage();
    y = 20;
  }

  function addSectionTitle(title) {
    ensurePdfSpace(16);
    doc.setTextColor(10, 31, 68);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(title, 14, y);
    y += 4;
    doc.setDrawColor(210, 218, 232);
    doc.line(14, y, 196, y);
    y += 8;
  }

  function addTextLine(label, value) {
    ensurePdfSpace(8);
    doc.setFontSize(10);
    doc.setTextColor(42, 52, 69);
    doc.setFont("helvetica", "bold");
    doc.text(`${label}:`, 14, y);
    doc.setFont("helvetica", "normal");
    doc.text(String(value || "-"), 52, y);
    y += 7;
  }

  function addParagraph(text, maxWidth = 182) {
    const lines = doc.splitTextToSize(text, maxWidth);
    ensurePdfSpace(lines.length * 5 + 3);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(58, 70, 88);
    doc.text(lines, 14, y);
    y += lines.length * 5 + 5;
  }

  function addBullet(text) {
    const lines = doc.splitTextToSize(text, 174);
    ensurePdfSpace(lines.length * 5 + 4);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(58, 70, 88);
    doc.text("-", 16, y);
    doc.text(lines, 22, y);
    y += lines.length * 5 + 4;
  }

  doc.setProperties({
    title: "Freelance Service Quotation",
    subject: "Professional freelance service quotation",
    author: "Jaisankar Prasad Nirala",
  });

  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, 210, 297, "F");
  doc.setTextColor(10, 31, 68);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("Freelance Service Quotation", 14, y);
  y += 7;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(86, 99, 118);
  doc.text(`Generated on ${new Date().toLocaleDateString("en-IN")}`, 14, y);
  y += 14;

  addSectionTitle("Client Details");
  addTextLine("Client Name", formData.clientName);
  addTextLine("Business Type", formData.businessType);
  addTextLine("Contact", formData.clientContact);
  y += 4;

  addSectionTitle("Service Provider");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(42, 52, 69);
  doc.text("Jaisankar Prasad Nirala", 14, y);
  y += 6;
  doc.setFont("helvetica", "normal");
  doc.text("Freelance Data Analyst & Digital Solutions Provider", 14, y);
  y += 11;

  addSectionTitle("Services & Pricing");
  doc.setFillColor(245, 247, 251);
  doc.rect(14, y, 182, 10, "F");
  doc.setTextColor(10, 31, 68);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text("Selected Service", 18, y + 7);
  doc.text("Price", 196, y + 7, { align: "right" });
  y += 12;

  selected.forEach((item) => {
    ensurePdfSpace(18);
    doc.setDrawColor(226, 232, 242);
    doc.line(14, y, 196, y);
    doc.setTextColor(42, 52, 69);
    doc.setFont("helvetica", "normal");
    doc.text(`${item.category} - ${item.name}`, 18, y + 7);
    doc.setFont("helvetica", "bold");
    doc.text(formatPdfCurrency(item.price), 196, y + 7, { align: "right" });
    y += 10;
  });

  ensurePdfSpace(18);
  doc.setDrawColor(10, 31, 68);
  doc.line(14, y, 196, y);
  y += 8;
  doc.setTextColor(10, 31, 68);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("Total Cost", 130, y);
  doc.text(formatPdfCurrency(total), 196, y, { align: "right" });
  y += 14;

  if ((formData.requirementNotes || "").trim()) {
    addSectionTitle("Requirement Notes");
    addParagraph(formData.requirementNotes.trim());
  }

  addSectionTitle("Timeline");
  addParagraph("Project timeline will be defined based on the scope, complexity, and requirements after final discussion.");

  addSectionTitle("Payment & Agreement Terms");
  addBullet("25% advance payment is required to start the project.");
  addBullet("Remaining payment will be completed in agreed milestones.");
  addBullet("For projects below \u20B950,000: Work will proceed based on mutual agreement without formal MoU.");
  addBullet("Assurance: This does not affect service quality. A proper bill and signed document will be provided, clearly mentioning all requirements and deliverables.");
  addBullet("For projects above \u20B950,000: A formal MoU (agreement) will be created to ensure transparency and commitment.");

  ensurePdfSpace(20);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(10, 31, 68);
  doc.text("This is not just a service, it's a growth system for your business.", 14, y + 6);

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
  updateSummary();
  initQuotationForm();
});
