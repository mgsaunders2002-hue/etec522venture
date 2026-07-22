const startAuditButton = document.getElementById("startAuditButton");
const sampleReportButton = document.getElementById("sampleReportButton");
const sampleReportModal = document.getElementById("sampleReportModal");
const closeSampleReportButton = document.getElementById("closeSampleReport");
const downloadResultsButton = document.getElementById("downloadResultsButton");
const restartAuditButton = document.getElementById("restartAuditButton");
const auditSection = document.getElementById("auditSection");
const resultsSection = document.getElementById("resultsSection");

/*
  START AUDIT
*/

startAuditButton.addEventListener("click", function () {
  auditSection.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
});

/*
  SAMPLE REPORT
*/

function openSampleReport() {
  sampleReportModal.classList.add("open");
  document.body.style.overflow = "hidden";
  closeSampleReportButton.focus();
}

function closeSampleReport() {
  sampleReportModal.classList.remove("open");
  document.body.style.overflow = "";
  sampleReportButton.focus();
}

sampleReportButton.addEventListener("click", openSampleReport);

closeSampleReportButton.addEventListener("click", closeSampleReport);

sampleReportModal.addEventListener("click", function (event) {
  if (event.target === sampleReportModal) {
    closeSampleReport();
  }
});

document.addEventListener("keydown", function (event) {
  if (
    event.key === "Escape" &&
    sampleReportModal.classList.contains("open")
  ) {
    closeSampleReport();
  }
});

/*
  SHOW PERSONALIZED RESULTS

  Call this function when your audit finishes calculating.
*/

function showAuditResults(resultData = {}) {
  const {
    score,
    level,
    summary,
    strengths,
    priorities,
    actionPlan
  } = resultData;

  if (Number.isFinite(score)) {
    document.getElementById("overallScore").textContent = score;
  }

  if (level) {
    document.getElementById("readinessLevel").textContent = level;
  }

  if (summary) {
    document.getElementById("readinessSummary").textContent = summary;
  }

  if (Array.isArray(strengths) && strengths.length > 0) {
    updateResultList("strengthsList", strengths);
  }

  if (Array.isArray(priorities) && priorities.length > 0) {
    updateResultList("prioritiesList", priorities);
  }

  if (actionPlan) {
    document.getElementById("actionPlanText").textContent = actionPlan;
  }

  const today = new Date();

  document.getElementById("reportDate").textContent =
    "Report generated " +
    today.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric"
    }) +
    ".";

  resultsSection.classList.add("visible");

  setTimeout(function () {
    resultsSection.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }, 100);
}

/*
  UPDATE STRENGTHS AND PRIORITIES LISTS
*/

function updateResultList(elementId, items) {
  const list = document.getElementById(elementId);

  if (!list) {
    return;
  }

  list.innerHTML = "";

  items.forEach(function (item) {
    const listItem = document.createElement("li");
    listItem.textContent = item;
    list.appendChild(listItem);
  });
}

/*
  DOWNLOAD RESULTS

  This opens the browser print window.
  The user can choose "Save as PDF."
*/

downloadResultsButton.addEventListener("click", function () {
  window.print();
});

/*
  RESTART AUDIT
*/

restartAuditButton.addEventListener("click", function () {
  resultsSection.classList.remove("visible");

  /*
    Replace this section with your existing audit reset function.

    Example:
    resetAudit();
  */

  auditSection.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
});

/*
  EXAMPLE CONNECTION TO YOUR AUDIT

  Place something like this inside your existing final scoring function:

  showAuditResults({
    score: 72,
    level: "Developing foundations",
    summary:
      "Your program has strong student engagement but requires more formal planning, shared staff capacity, and long-term continuity.",
    strengths: [
      "Strong student interest and participation",
      "Existing equipment and competition experience",
      "Support from school leadership"
    ],
    priorities: [
      "Reduce dependence on one teacher",
      "Strengthen curriculum integration",
      "Develop a multi-year funding and equipment plan"
    ],
    actionPlan:
      "Create a small robotics planning team and document the program's staffing, curriculum, equipment, access, and immediate priorities."
  });
*/
