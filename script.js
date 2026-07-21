const playButton = document.querySelector("#playButton");
const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");
const navLinks = document.querySelectorAll(".main-nav a");
const currentYear = document.querySelector("#currentYear");

function closeMenu() {
  menuToggle?.setAttribute("aria-expanded", "false");
  mainNav?.classList.remove("open");
  document.body.classList.remove("menu-open");
}

menuToggle?.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  mainNav.classList.toggle("open");
  document.body.classList.toggle("menu-open");
});

navLinks.forEach(link => link.addEventListener("click", closeMenu));
currentYear.textContent = new Date().getFullYear();

const categories = [
  {
    key: "vision",
    title: "Program Vision and Leadership",
    short: "Program Vision",
    description: "Measures whether robotics has a clear educational purpose, shared ownership, and leadership support.",
    questions: [
      "Our school has clearly defined what students should learn through robotics.",
      "Robotics is connected to wider school, STEM, or curriculum priorities.",
      "School leadership actively supports the robotics program.",
      "Roles, responsibilities, and long-term goals are clearly documented."
    ]
  },
  {
    key: "teachers",
    title: "Teacher Capacity",
    short: "Teacher Capacity",
    description: "Measures whether enough staff have the knowledge, time, confidence, and support needed to sustain the program.",
    questions: [
      "More than one staff member can independently teach or support robotics.",
      "Teachers have access to relevant and ongoing professional learning.",
      "Teachers have adequate planning and preparation time for robotics.",
      "Staff can troubleshoot common hardware, software, and classroom implementation problems."
    ]
  },
  {
    key: "curriculum",
    title: "Curriculum and Assessment",
    short: "Curriculum",
    description: "Measures whether robotics is connected to coherent learning, curriculum outcomes, progression, and assessment.",
    questions: [
      "Robotics is meaningfully connected to curriculum outcomes.",
      "Students encounter robotics during regular classroom learning, not only clubs or competitions.",
      "The program includes a clear progression across grades or levels of difficulty.",
      "Student learning in robotics is assessed using clear criteria or evidence."
    ]
  },
  {
    key: "equipment",
    title: "Equipment and Infrastructure",
    short: "Equipment",
    description: "Measures whether equipment is appropriate, organized, maintained, supported, and actively used.",
    questions: [
      "Most robotics equipment is actively used during the school year.",
      "The school has an effective system for inventory, storage, and parts management.",
      "There is a reliable process for maintenance, repair, and replacement.",
      "Purchasing decisions are based on instructional goals rather than isolated opportunities."
    ]
  },
  {
    key: "equity",
    title: "Equity and Student Access",
    short: "Equity and Access",
    description: "Measures whether participation is broad, inclusive, and designed to reduce barriers.",
    questions: [
      "Robotics opportunities are available beyond a small selected team or club.",
      "Participation is intentionally encouraged across gender, background, ability, and prior experience.",
      "Activities include supports for students with different learning needs.",
      "Fees, schedules, transportation, or selection processes do not create major access barriers."
    ]
  },
  {
    key: "sustainability",
    title: "Sustainability and Program Continuity",
    short: "Sustainability",
    description: "Measures whether the program can survive staff changes, funding changes, and growth over time.",
    questions: [
      "Core lessons, procedures, equipment systems, and technical information are documented.",
      "The program could continue if the current robotics lead left the school.",
      "Funding is reasonably stable and not dependent on a single short-term grant.",
      "The school reviews program participation, use, and impact each year."
    ]
  },
  {
    key: "ai",
    title: "Robotics and AI Readiness",
    short: "Robotics + AI",
    description: "Measures whether students are progressing toward sensors, data, automation, autonomy, AI, and ethical decision-making.",
    questions: [
      "Students learn how sensors and data influence robotic behaviour.",
      "Students explore the difference between programmed, automated, and adaptive behaviour.",
      "The program introduces age-appropriate AI or machine-learning concepts.",
      "Students examine ethical, safety, or social implications of intelligent and autonomous systems."
    ]
  }
];

const responseLabels = [
  { value: 0, label: "Not in place" },
  { value: 1, label: "Beginning" },
  { value: 2, label: "Partly in place" },
  { value: 3, label: "Mostly in place" },
  { value: 4, label: "Fully in place" },
  { value: "unknown", label: "Not sure" }
];

const screens = {
  welcome: document.querySelector("#auditWelcome"),
  profile: document.querySelector("#profileScreen"),
  questions: document.querySelector("#questionScreen"),
  results: document.querySelector("#resultsScreen")
};

const state = {
  currentCategory: 0,
  answers: {},
  profile: {}
};

function showScreen(screenName) {
  Object.values(screens).forEach(screen => screen.classList.remove("active"));
  screens[screenName].classList.add("active");
  document.querySelector("#audit-tool").scrollIntoView({ behavior: "smooth", block: "start" });
}
document.querySelector("#startProfileButton")
  .addEventListener("click", () => showScreen("profile"));
document.querySelector("#startProfileButton").addEventListener("click", () => showScreen("profile"));
document.querySelector("#backToWelcomeButton").addEventListener("click", () => showScreen("welcome"));

document.querySelector("#beginQuestionsButton").addEventListener("click", () => {
  state.profile = {
    schoolName: document.querySelector("#schoolName").value.trim(),
    role: document.querySelector("#userRole").value,
    gradeLevels: document.querySelector("#gradeLevels").value,
    population: document.querySelector("#studentPopulation").value,
    teacherCount: document.querySelector("#teacherCount").value,
    programModel: document.querySelector("#programModel").value,
    budgetLevel: document.querySelector("#budgetLevel").value,
    goal: document.querySelector("#auditGoal").value
  };

  showScreen("questions");
  renderCategory();
});

function answerKey(categoryIndex, questionIndex) {
  return `${categoryIndex}-${questionIndex}`;
}

function renderCategoryNav() {
  const nav = document.querySelector("#categoryNav");
  nav.innerHTML = "";

  categories.forEach((category, index) => {
    const button = document.createElement("button");
    button.type = "button";
    if (index === state.currentCategory) button.classList.add("active");
    if (isCategoryComplete(index)) button.classList.add("complete");

    button.innerHTML = `<span>${isCategoryComplete(index) ? "✓" : index + 1}</span><b>${category.short}</b>`;
    button.addEventListener("click", () => {
      state.currentCategory = index;
      renderCategory();
    });
    nav.appendChild(button);
  });
}

function isCategoryComplete(categoryIndex) {
  return categories[categoryIndex].questions.every((_, questionIndex) =>
    Object.prototype.hasOwnProperty.call(state.answers, answerKey(categoryIndex, questionIndex))
  );
}

function renderCategory() {
  const category = categories[state.currentCategory];
  document.querySelector("#progressText").textContent = `${state.currentCategory + 1} of ${categories.length}`;
  document.querySelector("#progressBar").style.width = `${((state.currentCategory + 1) / categories.length) * 100}%`;
  document.querySelector("#categoryNumber").textContent = `Category ${state.currentCategory + 1} of ${categories.length}`;
  document.querySelector("#categoryTitle").textContent = category.title;
  document.querySelector("#categoryDescription").textContent = category.description;

  const list = document.querySelector("#questionList");
  list.innerHTML = "";

  category.questions.forEach((question, questionIndex) => {
    const key = answerKey(state.currentCategory, questionIndex);
    const card = document.createElement("article");
    card.className = "audit-question-card";

    const title = document.createElement("h4");
    title.textContent = `${questionIndex + 1}. ${question}`;
    card.appendChild(title);

    const scale = document.createElement("div");
    scale.className = "response-scale";

    responseLabels.forEach(option => {
      const wrapper = document.createElement("div");
      wrapper.className = `response-option ${option.value === "unknown" ? "unknown" : ""}`;

      const input = document.createElement("input");
      input.type = "radio";
      input.name = `q-${key}`;
      input.id = `q-${key}-${option.value}`;
      input.value = option.value;
      input.checked = String(state.answers[key]) === String(option.value);

      input.addEventListener("change", () => {
        state.answers[key] = option.value;
        card.querySelector(".question-required")?.classList.add("hidden");
        renderCategoryNav();
      });

      const label = document.createElement("label");
      label.htmlFor = input.id;
      label.textContent = option.label;

      wrapper.append(input, label);
      scale.appendChild(wrapper);
    });

    const required = document.createElement("div");
    required.className = "question-required hidden";
    required.textContent = "Please answer this question or select Not sure.";

    card.append(scale, required);
    list.appendChild(card);
  });

  document.querySelector("#previousCategoryButton").textContent =
    state.currentCategory === 0 ? "Back to profile" : "Previous category";

  document.querySelector("#nextCategoryButton").textContent =
    state.currentCategory === categories.length - 1 ? "Generate my report" : "Next category";

  renderCategoryNav();
}

document.querySelector("#previousCategoryButton").addEventListener("click", () => {
  if (state.currentCategory === 0) {
    showScreen("profile");
  } else {
    state.currentCategory -= 1;
    renderCategory();
  }
});

document.querySelector("#nextCategoryButton").addEventListener("click", () => {
  if (!isCategoryComplete(state.currentCategory)) {
    const cards = document.querySelectorAll(".audit-question-card");
    categories[state.currentCategory].questions.forEach((_, questionIndex) => {
      const key = answerKey(state.currentCategory, questionIndex);
      if (!Object.prototype.hasOwnProperty.call(state.answers, key)) {
        cards[questionIndex].querySelector(".question-required").classList.remove("hidden");
      }
    });
    return;
  }

  if (state.currentCategory < categories.length - 1) {
    state.currentCategory += 1;
    renderCategory();
  } else {
    generateResults();
    showScreen("results");
  }
});

function calculateScores() {
  const categoryScores = {};
  let answeredNumeric = 0;
  let totalPossibleNumeric = categories.length * 4;

  categories.forEach((category, categoryIndex) => {
    let earned = 0;
    let possible = 0;

    category.questions.forEach((_, questionIndex) => {
      const answer = state.answers[answerKey(categoryIndex, questionIndex)];
      if (answer !== "unknown" && answer !== undefined) {
        earned += Number(answer);
        possible += 4;
        answeredNumeric += 1;
      }
    });

    categoryScores[category.key] = possible > 0 ? Math.round((earned / possible) * 100) : null;
  });

  const availableScores = Object.values(categoryScores).filter(score => score !== null);
  const overall = availableScores.length
    ? Math.round(availableScores.reduce((sum, score) => sum + score, 0) / availableScores.length)
    : 0;

  const confidencePercent = Math.round((answeredNumeric / totalPossibleNumeric) * 100);

  return { categoryScores, overall, confidencePercent };
}

function getReadinessLevel(score) {
  if (score < 20) return {
    name: "Fragile",
    text: "The program needs foundational planning before expansion. Focus first on purpose, people, systems, and continuity."
  };
  if (score < 40) return {
    name: "Emerging",
    text: "Some promising elements are in place, but the program remains inconsistent or dependent on individual effort."
  };
  if (score < 60) return {
    name: "Developing",
    text: "The school has a functioning base, but important gaps limit reach, continuity, or future growth."
  };
  if (score < 80) return {
    name: "Established",
    text: "The program is well developed, with clear strengths and manageable priorities for improvement."
  };
  return {
    name: "Future-Ready",
    text: "The program shows strong implementation, broad access, sustainability, and readiness to evolve toward intelligent systems."
  };
}

function getStatus(score) {
  if (score === null) return "Evidence gap";
  if (score < 30) return "Critical priority";
  if (score < 50) return "Development priority";
  if (score < 70) return "Moderate readiness";
  return "Established strength";
}

const categoryAdvice = {
  vision: {
    strength: "The program has a clear purpose and visible leadership support.",
    gap: "Clarify what students should learn, who owns the work, and how robotics supports wider school priorities.",
    immediate: "Write a one-page robotics purpose statement with clear student learning goals and assigned leadership.",
    medium: "Create an annual implementation plan aligned with school and curriculum priorities.",
    future: "Review and update the program vision as robotics and AI technologies change."
  },
  teachers: {
    strength: "Teacher knowledge and ownership are distributed across more than one person.",
    gap: "Build teacher confidence, shared expertise, planning time, and backup leadership.",
    immediate: "Identify a second staff member and document the most important setup and troubleshooting knowledge.",
    medium: "Provide targeted professional learning and protected collaborative planning time.",
    future: "Develop an internal mentoring model so new staff can enter the program."
  },
  curriculum: {
    strength: "Robotics is connected to meaningful curriculum, progression, and assessment.",
    gap: "Move robotics beyond isolated activities by linking it to curriculum and evidence of learning.",
    immediate: "Select one existing robotics activity and map it to a clear curriculum outcome and assessment.",
    medium: "Build a grade-level progression with common learning goals and assessment criteria.",
    future: "Create interdisciplinary robotics and intelligent-systems pathways across subjects."
  },
  equipment: {
    strength: "Equipment systems support reliable, active, and purposeful use.",
    gap: "Improve utilization, inventory, maintenance, and purchasing discipline before expanding hardware.",
    immediate: "Complete an inventory and identify unused, missing, damaged, or duplicated equipment.",
    medium: "Establish a documented repair, replacement, storage, and purchasing process.",
    future: "Use multi-year technology planning to maintain compatibility and avoid fragmented purchases."
  },
  equity: {
    strength: "Robotics access is intentionally broad and barriers are actively addressed.",
    gap: "Expand participation beyond selected students and examine barriers created by scheduling, cost, selection, or prior experience.",
    immediate: "Review who currently participates and identify one group that is underrepresented or excluded.",
    medium: "Add classroom or introductory experiences that do not require prior robotics experience.",
    future: "Track participation and belonging over time and redesign recruitment and supports where needed."
  },
  sustainability: {
    strength: "The program is supported by documentation, shared ownership, stable systems, and regular review.",
    gap: "Reduce dependence on one person or one funding source and strengthen program continuity.",
    immediate: "Create a shared folder containing lessons, contacts, procedures, inventory, and technical notes.",
    medium: "Build a succession plan, shared leadership structure, and recurring budget line.",
    future: "Use annual data and review cycles to guide growth and demonstrate value."
  },
  ai: {
    strength: "Students are beginning to connect robotics with sensing, data, autonomy, AI, and ethics.",
    gap: "Build a staged pathway from basic programming toward sensors, data, automation, autonomy, and ethical decision-making.",
    immediate: "Introduce one lesson comparing programmed, automated, and adaptive behaviour.",
    medium: "Add sensor-data and autonomous decision-making activities supported by teacher learning.",
    future: "Develop advanced learning in machine learning, computer vision, human–robot interaction, and ethics."
  }
};

function getSortedCategories(categoryScores) {
  return categories
    .map(category => ({
      ...category,
      score: categoryScores[category.key]
    }))
    .sort((a, b) => (b.score ?? -1) - (a.score ?? -1));
}

function buildPatterns(scores, overall) {
  const patterns = [];
  const p = state.profile;

  if (scores.equipment >= 70 && scores.curriculum < 45) {
    patterns.push({
      title: "Strong equipment, weak curriculum connection",
      text: "The school appears to have hardware capacity, but instructional integration is not keeping pace. Delay additional purchasing until curriculum and assessment are strengthened."
    });
  }

  if (p.programModel === "competition" && scores.equity < 50) {
    patterns.push({
      title: "Competition strength may be limiting broad access",
      text: "Competition robotics appears to be a major feature, but participation may be concentrated among a smaller group. Add classroom or entry-level pathways."
    });
  }

  if (overall >= 55 && (scores.teachers < 45 || scores.sustainability < 45 || p.teacherCount === "1")) {
    patterns.push({
      title: "A promising program with single-person risk",
      text: "The program shows strength but may be vulnerable because expertise and responsibility are concentrated in too few people."
    });
  }

  if (p.goal === "ai" && scores.ai < 40 && scores.teachers < 50) {
    patterns.push({
      title: "High AI ambition, weak implementation foundations",
      text: "Before investing in advanced AI-enabled robotics, build teacher knowledge in sensors, data, automation, and autonomous decision-making."
    });
  }

  if ((p.programModel === "competition" || p.programModel === "club") && scores.curriculum < 45) {
    patterns.push({
      title: "Extracurricular strength is not yet reaching classrooms",
      text: "Pilot one curriculum-linked robotics experience before attempting broad expansion."
    });
  }

  if (p.budgetLevel === "low" && scores.vision >= 70 && scores.equipment < 50) {
    patterns.push({
      title: "Clear direction, limited resources",
      text: "Use phased purchasing, shared equipment, low-cost platforms, and partnerships rather than trying to scale rapidly."
    });
  }

  if (scores.equipment >= 65 && scores.sustainability < 40) {
    patterns.push({
      title: "Equipment systems are stronger than program continuity",
      text: "Document processes, stabilize funding, and establish shared ownership before further growth."
    });
  }

  if (overall >= 70 && scores.ai < 50) {
    patterns.push({
      title: "A strong robotics program ready for its next transition",
      text: "The next stage should examine how sensing, data, autonomy, and AI change what students need to learn."
    });
  }

  if (!patterns.length) {
    patterns.push({
      title: "No major cross-category mismatch detected",
      text: "The strongest next steps are the priorities identified in the two lowest-scoring categories."
    });
  }

  return patterns.slice(0, 4);
}

function unique(items) {
  return [...new Set(items)];
}

function buildRoadmap(categoryScores) {
  const sortedAscending = categories
    .map(category => ({ ...category, score: categoryScores[category.key] }))
    .sort((a, b) => (a.score ?? 101) - (b.score ?? 101));

  const priorities = sortedAscending.slice(0, 3);
  const immediate = priorities.map(item => categoryAdvice[item.key].immediate);
  const medium = priorities.map(item => categoryAdvice[item.key].medium);

  let future = [];
  const foundationsStrong =
    categoryScores.vision >= 60 &&
    categoryScores.teachers >= 60 &&
    categoryScores.curriculum >= 60 &&
    categoryScores.sustainability >= 60;

  if (foundationsStrong) {
    future.push(categoryAdvice.ai.future);
  } else {
    future.push("Reassess the program after foundational actions are implemented and compare progress across all seven categories.");
  }

  if (categoryScores.equity < 60) future.push(categoryAdvice.equity.future);
  if (categoryScores.sustainability < 60) future.push(categoryAdvice.sustainability.future);
  if (categoryScores.equipment < 60) future.push(categoryAdvice.equipment.future);

  return {
    immediate: unique(immediate).slice(0, 3),
    medium: unique(medium).slice(0, 3),
    future: unique(future).slice(0, 3)
  };
}

function renderList(containerId, items, type = "result") {
  const container = document.querySelector(containerId);
  container.innerHTML = "";
  items.forEach(item => {
    const div = document.createElement("div");
    if (type === "action") {
      div.className = "action-item";
      div.textContent = item;
    } else {
      div.className = "result-item";
      div.innerHTML = `<strong>${item.title}</strong><p>${item.text}</p>`;
    }
    container.appendChild(div);
  });
}

function generateResults() {
  const { categoryScores, overall, confidencePercent } = calculateScores();
  const readiness = getReadinessLevel(overall);
  const sorted = getSortedCategories(categoryScores);

  const schoolName = state.profile.schoolName || "Your school";
  document.querySelector("#resultsSchoolName").textContent = `${schoolName}: readiness results`;
  document.querySelector("#resultsSummary").textContent =
    "The report identifies the strongest foundations, the most important constraints, and the next realistic stage of development.";

  document.querySelector("#overallScore").textContent = overall;
  document.querySelector("#readinessLevel").textContent = readiness.name;
  document.querySelector("#readinessInterpretation").textContent = readiness.text;

  let confidenceName = "Limited";
  let confidenceText = "Several answers were marked Not sure. Treat the report as preliminary and collect more evidence.";
  if (confidencePercent >= 90) {
    confidenceName = "High";
    confidenceText = "Responses were complete across nearly all questions.";
  } else if (confidencePercent >= 75) {
    confidenceName = "Moderate";
    confidenceText = "Most questions were answered, with some evidence gaps.";
  }
  document.querySelector("#confidenceLevel").textContent = `${confidenceName} (${confidencePercent}%)`;
  document.querySelector("#confidenceText").textContent = confidenceText;

  const categoryResults = document.querySelector("#categoryResults");
  categoryResults.innerHTML = "";
  categories.forEach(category => {
    const score = categoryScores[category.key];
    const card = document.createElement("article");
    card.className = "category-result-card";
    card.innerHTML = `
      <div class="category-result-top">
        <h4>${category.title}</h4>
        <strong>${score === null ? "—" : `${score}%`}</strong>
      </div>
      <span class="result-status">${getStatus(score)}</span>
      <div class="result-bar"><span style="width:${score ?? 0}%"></span></div>
    `;
    categoryResults.appendChild(card);
  });

  const strengths = sorted
    .filter(item => item.score !== null && item.score >= 60)
    .slice(0, 2)
    .map(item => ({ title: item.title, text: categoryAdvice[item.key].strength }));

  if (!strengths.length) {
    strengths.push({
      title: "A foundation is beginning to form",
      text: "The audit did not identify an established category strength yet. This is useful baseline information for future comparison."
    });
  }

  const gaps = [...sorted]
    .reverse()
    .filter(item => item.score !== null)
    .slice(0, 2)
    .map(item => ({ title: item.title, text: categoryAdvice[item.key].gap }));

  renderList("#strengthsList", strengths);
  renderList("#gapsList", gaps);

  const patterns = buildPatterns(categoryScores, overall);
  const patternContainer = document.querySelector("#patternFindings");
  patternContainer.innerHTML = "";
  patterns.forEach(pattern => {
    const card = document.createElement("article");
    card.className = "finding-card";
    card.innerHTML = `<strong>${pattern.title}</strong><p>${pattern.text}</p>`;
    patternContainer.appendChild(card);
  });

  const roadmap = buildRoadmap(categoryScores);
  renderList("#immediateActions", roadmap.immediate, "action");
  renderList("#mediumActions", roadmap.medium, "action");
  renderList("#futureActions", roadmap.future, "action");
}

document.querySelector("#restartAuditButton").addEventListener("click", () => {
  state.currentCategory = 0;
  state.answers = {};
  state.profile = {};
  document.querySelector("#profileForm").reset();
  showScreen("welcome");
});

document.querySelector("#printResultsButton").addEventListener("click", () => window.print());
