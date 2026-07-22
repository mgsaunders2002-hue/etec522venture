"use strict";

/* =========================================================
   ROBOSHIFT APP CONFIGURATION
========================================================= */

const STORAGE_KEYS = {
  audit: "roboshiftAuditState",
  results: "roboshiftAuditResults",
  actionPlan: "roboshiftActionPlan"
};

const categories = [
  {
    key: "vision",
    title: "Program Vision and Leadership",
    short: "Program Vision",
    description:
      "Measures whether robotics has a clear educational purpose, shared ownership, and leadership support.",
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
    description:
      "Measures whether enough staff have the knowledge, time, confidence, and support needed to sustain the program.",
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
    description:
      "Measures whether robotics is connected to coherent learning, curriculum outcomes, progression, and assessment.",
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
    description:
      "Measures whether equipment is appropriate, organized, maintained, supported, and actively used.",
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
    description:
      "Measures whether participation is broad, inclusive, and designed to reduce barriers.",
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
    description:
      "Measures whether the program can survive staff changes, funding changes, and growth over time.",
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
    description:
      "Measures whether students are progressing toward sensors, data, automation, autonomy, AI, and ethical decision-making.",
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

const categoryAdvice = {
  vision: {
    strength:
      "The program has a clear purpose, visible leadership support, and defined long-term direction.",
    gap:
      "Clarify what students should learn, who owns the work, and how robotics supports wider school priorities.",
    immediate:
      "Write a one-page robotics purpose statement with clear student learning goals and assigned leadership.",
    medium:
      "Create an annual implementation plan aligned with school and curriculum priorities.",
    future:
      "Review and update the program vision as robotics and AI technologies change."
  },

  teachers: {
    strength:
      "Teacher knowledge and program ownership are distributed across more than one person.",
    gap:
      "Build teacher confidence, shared expertise, planning time, and backup leadership.",
    immediate:
      "Identify a second staff member and document the most important setup and troubleshooting knowledge.",
    medium:
      "Provide targeted professional learning and protected collaborative planning time.",
    future:
      "Develop an internal mentoring model so new staff can enter the program."
  },

  curriculum: {
    strength:
      "Robotics is connected to meaningful curriculum, progression, and assessment.",
    gap:
      "Move robotics beyond isolated activities by linking it to curriculum and evidence of student learning.",
    immediate:
      "Select one existing robotics activity and map it to a clear curriculum outcome and assessment.",
    medium:
      "Build a grade-level progression with common learning goals and assessment criteria.",
    future:
      "Create interdisciplinary robotics and intelligent-systems pathways across subjects."
  },

  equipment: {
    strength:
      "Equipment systems support reliable, active, and purposeful use.",
    gap:
      "Improve utilization, inventory, maintenance, and purchasing discipline before expanding hardware.",
    immediate:
      "Complete an inventory and identify unused, missing, damaged, or duplicated equipment.",
    medium:
      "Establish a documented repair, replacement, storage, and purchasing process.",
    future:
      "Use multi-year technology planning to maintain compatibility and avoid fragmented purchases."
  },

  equity: {
    strength:
      "Robotics access is intentionally broad and barriers are actively addressed.",
    gap:
      "Expand participation beyond selected students and examine barriers created by scheduling, cost, selection, or prior experience.",
    immediate:
      "Review who currently participates and identify one group that may be underrepresented or excluded.",
    medium:
      "Add classroom or introductory experiences that do not require prior robotics experience.",
    future:
      "Track participation and belonging over time and redesign recruitment and supports where needed."
  },

  sustainability: {
    strength:
      "The program is supported by documentation, shared ownership, stable systems, and regular review.",
    gap:
      "Reduce dependence on one person or one funding source and strengthen program continuity.",
    immediate:
      "Create a shared folder containing lessons, contacts, procedures, inventory, and technical notes.",
    medium:
      "Build a succession plan, shared leadership structure, and recurring budget line.",
    future:
      "Use annual data and review cycles to guide growth and demonstrate value."
  },

  ai: {
    strength:
      "Students are beginning to connect robotics with sensing, data, autonomy, AI, and ethics.",
    gap:
      "Build a staged pathway from basic programming toward sensors, data, automation, autonomy, and ethical decision-making.",
    immediate:
      "Introduce one lesson comparing programmed, automated, and adaptive behaviour.",
    medium:
      "Add sensor-data and autonomous decision-making activities supported by teacher learning.",
    future:
      "Develop advanced learning in machine learning, computer vision, human–robot interaction, and ethics."
  }
};


/* =========================================================
   APP STATE
========================================================= */

const state = {
  currentPage: "homePage",
  currentAuditScreen: "welcome",
  currentCategory: 0,
  answers: {},
  profile: {},
  results: null
};


/* =========================================================
   DOM HELPERS
========================================================= */

function getElement(id) {
  return document.getElementById(id);
}

function queryAll(selector) {
  return Array.from(document.querySelectorAll(selector));
}

function setText(id, value) {
  const element = getElement(id);

  if (element) {
    element.textContent = value;
  }
}

function setHidden(element, hidden) {
  if (!element) {
    return;
  }

  element.classList.toggle("hidden", hidden);
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

function scrollToElement(element) {
  if (!element) {
    return;
  }

  element.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

function unique(items) {
  return [...new Set(items)];
}

function escapeHTML(value) {
  const container = document.createElement("div");
  container.textContent = String(value ?? "");
  return container.innerHTML;
}


/* =========================================================
   APP PAGE NAVIGATION
========================================================= */

function showPage(pageId, options = {}) {
  const requestedPage = getElement(pageId);

  if (!requestedPage) {
    console.error(`Page not found: ${pageId}`);
    return;
  }

  queryAll(".app-page").forEach((page) => {
    page.classList.remove("active");
  });

  requestedPage.classList.add("active");
  state.currentPage = pageId;

  queryAll(".nav-link").forEach((button) => {
    button.classList.toggle(
      "active",
      button.dataset.page === pageId
    );
  });

  closeMobileMenu();

  if (pageId === "resultsPage") {
    updateResultsPageVisibility();
  }

  if (pageId === "actionPlanPage") {
    prepareActionPlanPage();
  }

  if (pageId === "homePage") {
    updateDashboard();
  }

  if (!options.preserveScroll) {
    scrollToTop();
  }
}

function initializePageNavigation() {
  queryAll("[data-page]").forEach((button) => {
    button.addEventListener("click", () => {
      const pageId = button.dataset.page;

      if (pageId) {
        showPage(pageId);
      }
    });
  });
}


/* =========================================================
   MOBILE MENU
========================================================= */

function closeMobileMenu() {
  const menuToggle = getElement("menuToggle");
  const navigation = getElement("mainNavigation");

  menuToggle?.setAttribute("aria-expanded", "false");
  navigation?.classList.remove("open");
  document.body.classList.remove("menu-open");
}

function initializeMobileMenu() {
  const menuToggle = getElement("menuToggle");
  const navigation = getElement("mainNavigation");

  menuToggle?.addEventListener("click", () => {
    const isOpen =
      menuToggle.getAttribute("aria-expanded") === "true";

    menuToggle.setAttribute(
      "aria-expanded",
      String(!isOpen)
    );

    navigation?.classList.toggle("open", !isOpen);
    document.body.classList.toggle("menu-open", !isOpen);
  });
}


/* =========================================================
   AUDIT SCREEN NAVIGATION
========================================================= */

const auditScreens = {
  welcome: () => getElement("auditWelcome"),
  profile: () => getElement("profileScreen"),
  questions: () => getElement("questionScreen")
};

function showAuditScreen(screenName, shouldScroll = true) {
  Object.values(auditScreens).forEach((getScreen) => {
    getScreen()?.classList.remove("active");
  });

  const selectedScreen = auditScreens[screenName]?.();

  if (!selectedScreen) {
    console.error(`Audit screen not found: ${screenName}`);
    return;
  }

  selectedScreen.classList.add("active");
  state.currentAuditScreen = screenName;

  saveAuditState();
  updateDashboard();

  if (shouldScroll) {
    scrollToElement(getElement("audit-tool"));
  }
}


/* =========================================================
   PROFILE
========================================================= */

function collectProfile() {
  return {
    schoolName: getElement("schoolName")?.value.trim() || "",
    role: getElement("userRole")?.value || "",
    gradeLevels: getElement("gradeLevels")?.value || "",
    population:
      getElement("studentPopulation")?.value || "",
    teacherCount:
      getElement("teacherCount")?.value || "",
    programModel:
      getElement("programModel")?.value || "",
    budgetLevel:
      getElement("budgetLevel")?.value || "",
    goal: getElement("auditGoal")?.value || ""
  };
}

function restoreProfileForm() {
  const profile = state.profile || {};

  const fields = {
    schoolName: "schoolName",
    role: "userRole",
    gradeLevels: "gradeLevels",
    population: "studentPopulation",
    teacherCount: "teacherCount",
    programModel: "programModel",
    budgetLevel: "budgetLevel",
    goal: "auditGoal"
  };

  Object.entries(fields).forEach(([profileKey, elementId]) => {
    const element = getElement(elementId);

    if (element && profile[profileKey] !== undefined) {
      element.value = profile[profileKey];
    }
  });
}

function validateProfile(profile) {
  const requiredFields = [
    profile.role,
    profile.gradeLevels,
    profile.population,
    profile.teacherCount,
    profile.programModel,
    profile.budgetLevel,
    profile.goal
  ];

  return requiredFields.every((value) => value !== "");
}

function initializeProfileControls() {
  getElement("startProfileButton")?.addEventListener(
    "click",
    () => {
      showAuditScreen("profile");
    }
  );

  getElement("backToWelcomeButton")?.addEventListener(
    "click",
    () => {
      state.profile = collectProfile();
      showAuditScreen("welcome");
    }
  );

  getElement("beginQuestionsButton")?.addEventListener(
    "click",
    () => {
      const profile = collectProfile();
      const message = getElement("profileMessage");

      if (!validateProfile(profile)) {
        setHidden(message, false);
        message?.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });
        return;
      }

      setHidden(message, true);

      state.profile = profile;
      state.currentCategory = Math.max(
        0,
        Math.min(
          state.currentCategory,
          categories.length - 1
        )
      );

      showAuditScreen("questions", false);
      renderCategory();
      saveAuditState();

      scrollToElement(getElement("audit-tool"));
    }
  );

  getElement("profileForm")?.addEventListener(
    "input",
    () => {
      state.profile = collectProfile();
      saveAuditState();
    }
  );
}


/* =========================================================
   AUDIT QUESTIONS
========================================================= */

function answerKey(categoryIndex, questionIndex) {
  return `${categoryIndex}-${questionIndex}`;
}

function hasAnswer(categoryIndex, questionIndex) {
  const key = answerKey(categoryIndex, questionIndex);

  return Object.prototype.hasOwnProperty.call(
    state.answers,
    key
  );
}

function isCategoryComplete(categoryIndex) {
  return categories[categoryIndex].questions.every(
    (_, questionIndex) =>
      hasAnswer(categoryIndex, questionIndex)
  );
}

function getAnsweredQuestionCount() {
  return categories.reduce(
    (total, category, categoryIndex) => {
      const answeredInCategory =
        category.questions.filter(
          (_, questionIndex) =>
            hasAnswer(categoryIndex, questionIndex)
        ).length;

      return total + answeredInCategory;
    },
    0
  );
}

function getTotalQuestionCount() {
  return categories.reduce(
    (total, category) =>
      total + category.questions.length,
    0
  );
}

function getAuditCompletionPercent() {
  const total = getTotalQuestionCount();

  if (total === 0) {
    return 0;
  }

  return Math.round(
    (getAnsweredQuestionCount() / total) * 100
  );
}

function renderCategoryNavigation() {
  const navigation = getElement("categoryNav");

  if (!navigation) {
    return;
  }

  navigation.innerHTML = "";

  categories.forEach((category, index) => {
    const button = document.createElement("button");
    const isComplete = isCategoryComplete(index);

    button.type = "button";
    button.className = "category-nav-button";

    if (index === state.currentCategory) {
      button.classList.add("active");
    }

    if (isComplete) {
      button.classList.add("complete");
    }

    button.innerHTML = `
      <span class="category-nav-number">
        ${isComplete ? "✓" : index + 1}
      </span>

      <span class="category-nav-copy">
        <strong>${escapeHTML(category.short)}</strong>
        <small>
          ${isComplete ? "Complete" : "Not complete"}
        </small>
      </span>
    `;

    button.addEventListener("click", () => {
      state.currentCategory = index;
      renderCategory();
      saveAuditState();
    });

    navigation.appendChild(button);
  });
}

function renderCategory() {
  const category = categories[state.currentCategory];

  if (!category) {
    return;
  }

  const categoryPosition = state.currentCategory + 1;
  const progressPercent =
    (categoryPosition / categories.length) * 100;

  setText(
    "progressText",
    `${categoryPosition} of ${categories.length}`
  );

  setText(
    "mobileProgressText",
    `${categoryPosition} of ${categories.length}`
  );

  const progressBar = getElement("progressBar");
  const mobileProgressBar =
    getElement("mobileProgressBar");

  if (progressBar) {
    progressBar.style.width = `${progressPercent}%`;
  }

  if (mobileProgressBar) {
    mobileProgressBar.style.width =
      `${progressPercent}%`;
  }

  setText(
    "categoryNumber",
    `Category ${categoryPosition} of ${categories.length}`
  );

  setText("categoryTitle", category.title);
  setText(
    "categoryDescription",
    category.description
  );

  renderQuestions(category);
  renderCategoryNavigation();

  const previousButton =
    getElement("previousCategoryButton");

  const nextButton =
    getElement("nextCategoryButton");

  if (previousButton) {
    previousButton.textContent =
      state.currentCategory === 0
        ? "Back to Profile"
        : "Previous Category";
  }

  if (nextButton) {
    nextButton.textContent =
      state.currentCategory === categories.length - 1
        ? "Generate My Report"
        : "Next Category";
  }

  updateDashboard();
}

function renderQuestions(category) {
  const list = getElement("questionList");

  if (!list) {
    return;
  }

  list.innerHTML = "";

  category.questions.forEach(
    (question, questionIndex) => {
      const key = answerKey(
        state.currentCategory,
        questionIndex
      );

      const card = document.createElement("article");
      card.className = "audit-question-card";

      const heading = document.createElement("h3");
      heading.textContent =
        `${questionIndex + 1}. ${question}`;

      const scale = document.createElement("div");
      scale.className = "response-scale";

      responseLabels.forEach((option) => {
        const optionWrapper =
          document.createElement("div");

        optionWrapper.className =
          "response-option";

        if (option.value === "unknown") {
          optionWrapper.classList.add("unknown");
        }

        const input =
          document.createElement("input");

        const label =
          document.createElement("label");

        input.type = "radio";
        input.name = `q-${key}`;
        input.id = `q-${key}-${option.value}`;
        input.value = String(option.value);

        input.checked =
          String(state.answers[key]) ===
          String(option.value);

        label.htmlFor = input.id;
        label.textContent = option.label;

        input.addEventListener("change", () => {
          state.answers[key] = option.value;

          card
            .querySelector(".question-required")
            ?.classList.add("hidden");

          renderCategoryNavigation();
          saveAuditState();
          updateDashboard();
        });

        optionWrapper.append(input, label);
        scale.appendChild(optionWrapper);
      });

      const requiredMessage =
        document.createElement("p");

      requiredMessage.className =
        "question-required hidden";

      requiredMessage.textContent =
        "Please answer this question or select Not sure.";

      card.append(
        heading,
        scale,
        requiredMessage
      );

      list.appendChild(card);
    }
  );
}

function showMissingAnswerMessages() {
  const cards = queryAll(".audit-question-card");

  categories[state.currentCategory].questions.forEach(
    (_, questionIndex) => {
      const key = answerKey(
        state.currentCategory,
        questionIndex
      );

      if (
        !Object.prototype.hasOwnProperty.call(
          state.answers,
          key
        )
      ) {
        cards[questionIndex]
          ?.querySelector(".question-required")
          ?.classList.remove("hidden");
      }
    }
  );

  const firstMissing = document.querySelector(
    ".question-required:not(.hidden)"
  );

  firstMissing?.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
}

function initializeQuestionControls() {
  getElement("previousCategoryButton")
    ?.addEventListener("click", () => {
      if (state.currentCategory === 0) {
        state.profile = collectProfile();
        showAuditScreen("profile");
      } else {
        state.currentCategory -= 1;
        renderCategory();
        saveAuditState();

        scrollToElement(
          getElement("audit-tool")
        );
      }
    });

  getElement("nextCategoryButton")
    ?.addEventListener("click", () => {
      if (!isCategoryComplete(state.currentCategory)) {
        showMissingAnswerMessages();
        return;
      }

      if (
        state.currentCategory <
        categories.length - 1
      ) {
        state.currentCategory += 1;
        renderCategory();
        saveAuditState();

        scrollToElement(
          getElement("audit-tool")
        );

        return;
      }

      generateResults();
      showPage("resultsPage");
    });

  getElement("saveProgressButton")
    ?.addEventListener("click", () => {
      saveAuditState();

      const message =
        getElement("saveProgressMessage");

      if (message) {
        message.textContent =
          "Progress saved in this browser.";

        window.setTimeout(() => {
          message.textContent = "";
        }, 3000);
      }
    });
}


/* =========================================================
   RESPONSE HELP
========================================================= */

function initializeResponseHelp() {
  const button = getElement("responseHelpButton");
  const panel = getElement("responseHelpPanel");

  button?.addEventListener("click", () => {
    const isExpanded =
      button.getAttribute("aria-expanded") === "true";

    button.setAttribute(
      "aria-expanded",
      String(!isExpanded)
    );

    panel?.classList.toggle(
      "hidden",
      isExpanded
    );
  });
}


/* =========================================================
   SCORING
========================================================= */

function calculateScores() {
  const categoryScores = {};
  let answeredNumeric = 0;
  const totalQuestions = getTotalQuestionCount();

  categories.forEach(
    (category, categoryIndex) => {
      let earned = 0;
      let possible = 0;

      category.questions.forEach(
        (_, questionIndex) => {
          const answer =
            state.answers[
              answerKey(
                categoryIndex,
                questionIndex
              )
            ];

          if (
            answer !== "unknown" &&
            answer !== undefined
          ) {
            earned += Number(answer);
            possible += 4;
            answeredNumeric += 1;
          }
        }
      );

      categoryScores[category.key] =
        possible > 0
          ? Math.round(
              (earned / possible) * 100
            )
          : null;
    }
  );

  const availableScores = Object.values(
    categoryScores
  ).filter((score) => score !== null);

  const overall =
    availableScores.length > 0
      ? Math.round(
          availableScores.reduce(
            (sum, score) => sum + score,
            0
          ) / availableScores.length
        )
      : 0;

  const confidencePercent =
    totalQuestions > 0
      ? Math.round(
          (answeredNumeric / totalQuestions) *
            100
        )
      : 0;

  return {
    categoryScores,
    overall,
    confidencePercent
  };
}

function getReadinessLevel(score) {
  if (score < 20) {
    return {
      name: "Fragile",
      text:
        "The program needs foundational planning before expansion. Focus first on purpose, people, systems, and continuity."
    };
  }

  if (score < 40) {
    return {
      name: "Emerging",
      text:
        "Some promising elements are in place, but the program remains inconsistent or dependent on individual effort."
    };
  }

  if (score < 60) {
    return {
      name: "Developing",
      text:
        "The school has a functioning base, but important gaps limit reach, continuity, or future growth."
    };
  }

  if (score < 80) {
    return {
      name: "Established",
      text:
        "The program is well developed, with clear strengths and manageable priorities for improvement."
    };
  }

  return {
    name: "Future-Ready",
    text:
      "The program shows strong implementation, broad access, sustainability, and readiness to evolve toward intelligent systems."
  };
}

function getStatus(score) {
  if (score === null) {
    return "Evidence gap";
  }

  if (score < 30) {
    return "Critical priority";
  }

  if (score < 50) {
    return "Development priority";
  }

  if (score < 70) {
    return "Moderate readiness";
  }

  return "Established strength";
}

function getStatusClass(score) {
  if (score === null) {
    return "status-evidence";
  }

  if (score < 30) {
    return "status-critical";
  }

  if (score < 50) {
    return "status-development";
  }

  if (score < 70) {
    return "status-moderate";
  }

  return "status-strength";
}

function getConfidence(confidencePercent) {
  if (confidencePercent >= 90) {
    return {
      name: "High",
      text:
        "Responses were complete across nearly all questions."
    };
  }

  if (confidencePercent >= 75) {
    return {
      name: "Moderate",
      text:
        "Most questions were answered, with some evidence gaps."
    };
  }

  return {
    name: "Limited",
    text:
      "Several answers were marked Not sure. Treat the report as preliminary and collect more evidence."
  };
}

function getSortedCategories(categoryScores) {
  return categories
    .map((category) => ({
      ...category,
      score: categoryScores[category.key]
    }))
    .sort(
      (a, b) =>
        (b.score ?? -1) - (a.score ?? -1)
    );
}


/* =========================================================
   CROSS-CATEGORY PATTERNS
========================================================= */

function buildPatterns(scores, overall) {
  const patterns = [];
  const profile = state.profile;

  if (
    scores.equipment >= 70 &&
    scores.curriculum < 45
  ) {
    patterns.push({
      title:
        "Strong equipment, weak curriculum connection",
      text:
        "The school appears to have hardware capacity, but instructional integration is not keeping pace. Delay additional purchasing until curriculum and assessment are strengthened."
    });
  }

  if (
    profile.programModel === "competition" &&
    scores.equity < 50
  ) {
    patterns.push({
      title:
        "Competition strength may be limiting broad access",
      text:
        "Competition robotics appears to be a major feature, but participation may be concentrated among a smaller group. Add classroom or entry-level pathways."
    });
  }

  if (
    overall >= 55 &&
    (
      scores.teachers < 45 ||
      scores.sustainability < 45 ||
      profile.teacherCount === "1"
    )
  ) {
    patterns.push({
      title:
        "A promising program with single-person risk",
      text:
        "The program shows strength but may be vulnerable because expertise and responsibility are concentrated in too few people."
    });
  }

  if (
    profile.goal === "ai" &&
    scores.ai < 40 &&
    scores.teachers < 50
  ) {
    patterns.push({
      title:
        "High AI ambition, weak implementation foundations",
      text:
        "Before investing in advanced AI-enabled robotics, build teacher knowledge in sensors, data, automation, and autonomous decision-making."
    });
  }

  if (
    (
      profile.programModel === "competition" ||
      profile.programModel === "club"
    ) &&
    scores.curriculum < 45
  ) {
    patterns.push({
      title:
        "Extracurricular strength is not yet reaching classrooms",
      text:
        "Pilot one curriculum-linked robotics experience before attempting broad expansion."
    });
  }

  if (
    profile.budgetLevel === "low" &&
    scores.vision >= 70 &&
    scores.equipment < 50
  ) {
    patterns.push({
      title:
        "Clear direction, limited resources",
      text:
        "Use phased purchasing, shared equipment, low-cost platforms, and partnerships rather than trying to scale rapidly."
    });
  }

  if (
    scores.equipment >= 65 &&
    scores.sustainability < 40
  ) {
    patterns.push({
      title:
        "Equipment systems are stronger than program continuity",
      text:
        "Document processes, stabilize funding, and establish shared ownership before further growth."
    });
  }

  if (
    overall >= 70 &&
    scores.ai < 50
  ) {
    patterns.push({
      title:
        "A strong robotics program ready for its next transition",
      text:
        "The next stage should examine how sensing, data, autonomy, and AI change what students need to learn."
    });
  }

  if (
    scores.equity < 40 &&
    scores.curriculum >= 60
  ) {
    patterns.push({
      title:
        "Strong learning design is not yet reaching enough students",
      text:
        "The program has educational value, but participation barriers may prevent that value from being distributed broadly."
    });
  }

  if (
    scores.vision < 40 &&
    scores.equipment >= 60
  ) {
    patterns.push({
      title:
        "Purchasing has moved ahead of program direction",
      text:
        "Pause major expansion until the school has defined learning goals, ownership, and a longer-term robotics strategy."
    });
  }

  if (patterns.length === 0) {
    patterns.push({
      title:
        "No major cross-category mismatch detected",
      text:
        "The strongest next steps are the priorities identified in the two lowest-scoring categories."
    });
  }

  return patterns.slice(0, 4);
}


/* =========================================================
   ROADMAP
========================================================= */

function buildRoadmap(categoryScores) {
  const sortedAscending = categories
    .map((category) => ({
      ...category,
      score: categoryScores[category.key]
    }))
    .sort(
      (a, b) =>
        (a.score ?? 101) - (b.score ?? 101)
    );

  const priorities = sortedAscending
    .filter((item) => item.score !== null)
    .slice(0, 3);

  const immediate = priorities.map(
    (item) =>
      categoryAdvice[item.key].immediate
  );

  const medium = priorities.map(
    (item) =>
      categoryAdvice[item.key].medium
  );

  const future = [];

  const foundationsStrong =
    categoryScores.vision >= 60 &&
    categoryScores.teachers >= 60 &&
    categoryScores.curriculum >= 60 &&
    categoryScores.sustainability >= 60;

  if (foundationsStrong) {
    future.push(categoryAdvice.ai.future);
  } else {
    future.push(
      "Reassess the program after foundational actions are implemented and compare progress across all seven categories."
    );
  }

  if (categoryScores.equity < 60) {
    future.push(categoryAdvice.equity.future);
  }

  if (categoryScores.sustainability < 60) {
    future.push(
      categoryAdvice.sustainability.future
    );
  }

  if (categoryScores.equipment < 60) {
    future.push(
      categoryAdvice.equipment.future
    );
  }

  return {
    immediate: unique(immediate).slice(0, 3),
    medium: unique(medium).slice(0, 3),
    future: unique(future).slice(0, 3)
  };
}


/* =========================================================
   GENERATE RESULTS
========================================================= */

function generateResults() {
  state.profile = collectProfile();

  const {
    categoryScores,
    overall,
    confidencePercent
  } = calculateScores();

  const readiness =
    getReadinessLevel(overall);

  const confidence =
    getConfidence(confidencePercent);

  const sorted =
    getSortedCategories(categoryScores);

  const strengths = sorted
    .filter(
      (item) =>
        item.score !== null &&
        item.score >= 60
    )
    .slice(0, 3)
    .map((item) => ({
      key: item.key,
      title: item.title,
      score: item.score,
      text: categoryAdvice[item.key].strength
    }));

  if (strengths.length === 0) {
    strengths.push({
      key: "baseline",
      title:
        "A foundation is beginning to form",
      score: null,
      text:
        "The audit did not identify an established category strength yet. This is useful baseline information for future comparison."
    });
  }

  const gaps = [...sorted]
    .reverse()
    .filter((item) => item.score !== null)
    .slice(0, 3)
    .map((item) => ({
      key: item.key,
      title: item.title,
      score: item.score,
      text: categoryAdvice[item.key].gap
    }));

  const patterns =
    buildPatterns(categoryScores, overall);

  const roadmap =
    buildRoadmap(categoryScores);

  state.results = {
    generatedAt: new Date().toISOString(),
    profile: { ...state.profile },
    categoryScores,
    overall,
    confidencePercent,
    readiness,
    confidence,
    strengths,
    gaps,
    patterns,
    roadmap
  };

  saveResults();
  saveAuditState();
  renderResults();
  updateDashboard();
}

function renderResults() {
  const results = state.results;

  if (!results) {
    updateResultsPageVisibility();
    return;
  }

  const schoolName =
    results.profile.schoolName ||
    "Your school";

  setText(
    "resultsSchoolName",
    `${schoolName}: readiness results`
  );

  setText(
    "resultsSummary",
    "This report identifies the strongest foundations, the most important constraints, and the next realistic stage of development."
  );

  setText(
    "reportDate",
    `Report generated ${new Date(
      results.generatedAt
    ).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric"
    })}.`
  );

  setText("overallScore", results.overall);

  setText(
    "readinessLevel",
    results.readiness.name
  );

  setText(
    "readinessInterpretation",
    results.readiness.text
  );

  setText(
    "confidenceLevel",
    `${results.confidence.name} (${results.confidencePercent}%)`
  );

  setText(
    "confidenceText",
    results.confidence.text
  );

  renderCategoryResults(
    results.categoryScores
  );

  renderResultItems(
    "strengthsList",
    results.strengths
  );

  renderResultItems(
    "gapsList",
    results.gaps
  );

  renderPatterns(results.patterns);

  renderActionItems(
    "immediateActions",
    results.roadmap.immediate
  );

  renderActionItems(
    "mediumActions",
    results.roadmap.medium
  );

  renderActionItems(
    "futureActions",
    results.roadmap.future
  );

  updateResultsPageVisibility();
}

function renderCategoryResults(categoryScores) {
  const container = getElement("categoryResults");

  if (!container) {
    return;
  }

  container.innerHTML = "";

  categories.forEach((category) => {
    const score =
      categoryScores[category.key];

    const card =
      document.createElement("article");

    card.className =
      "category-result-card";

    card.innerHTML = `
      <div class="category-result-top">
        <h3>${escapeHTML(category.title)}</h3>

        <strong>
          ${score === null ? "—" : `${score}%`}
        </strong>
      </div>

      <span class="result-status ${getStatusClass(score)}">
        ${escapeHTML(getStatus(score))}
      </span>

      <div class="result-bar" aria-hidden="true">
        <span style="width: ${score ?? 0}%"></span>
      </div>

      <p>${escapeHTML(category.description)}</p>
    `;

    container.appendChild(card);
  });
}

function renderResultItems(containerId, items) {
  const container = getElement(containerId);

  if (!container) {
    return;
  }

  container.innerHTML = "";

  items.forEach((item) => {
    const resultItem =
      document.createElement("article");

    resultItem.className = "result-item";

    resultItem.innerHTML = `
      <div class="result-item-heading">
        <strong>${escapeHTML(item.title)}</strong>

        ${
          Number.isFinite(item.score)
            ? `<span>${item.score}%</span>`
            : ""
        }
      </div>

      <p>${escapeHTML(item.text)}</p>
    `;

    container.appendChild(resultItem);
  });
}

function renderPatterns(patterns) {
  const container =
    getElement("patternFindings");

  if (!container) {
    return;
  }

  container.innerHTML = "";

  patterns.forEach((pattern) => {
    const card =
      document.createElement("article");

    card.className = "finding-card";

    card.innerHTML = `
      <strong>${escapeHTML(pattern.title)}</strong>
      <p>${escapeHTML(pattern.text)}</p>
    `;

    container.appendChild(card);
  });
}

function renderActionItems(containerId, items) {
  const container = getElement(containerId);

  if (!container) {
    return;
  }

  container.innerHTML = "";

  items.forEach((item) => {
    const action =
      document.createElement("div");

    action.className = "action-item";
    action.textContent = item;

    container.appendChild(action);
  });
}

function updateResultsPageVisibility() {
  const emptyState =
    getElement("resultsEmptyState");

  const report =
    getElement("resultsReport");

  const hasResults = Boolean(state.results);

  setHidden(emptyState, hasResults);
  setHidden(report, !hasResults);

  if (hasResults) {
    renderResults();
  }
}


/* =========================================================
   DASHBOARD
========================================================= */

function updateDashboard() {
  const answered = getAnsweredQuestionCount();
  const total = getTotalQuestionCount();
  const percent = getAuditCompletionPercent();

  const progressBar =
    getElement("dashboardProgressBar");

  if (progressBar) {
    progressBar.style.width = `${percent}%`;
  }

  setText(
    "dashboardProgressText",
    `${percent}%`
  );

  if (state.results) {
    setText(
      "dashboardAuditStatus",
      `${state.results.readiness.name} readiness`
    );

    setText(
      "dashboardAuditMessage",
      `Your latest audit score is ${state.results.overall} out of 100. Review the report or continue into action planning.`
    );

    return;
  }

  if (answered > 0) {
    setText(
      "dashboardAuditStatus",
      "Audit in progress"
    );

    setText(
      "dashboardAuditMessage",
      `${answered} of ${total} questions have been answered. Continue from your saved progress.`
    );

    return;
  }

  if (
    Object.values(state.profile).some(Boolean)
  ) {
    setText(
      "dashboardAuditStatus",
      "School profile started"
    );

    setText(
      "dashboardAuditMessage",
      "Your school profile has been saved. Continue to the seven readiness categories."
    );

    return;
  }

  setText(
    "dashboardAuditStatus",
    "No audit started"
  );

  setText(
    "dashboardAuditMessage",
    "Begin a new assessment to create your school readiness profile and personalized roadmap."
  );
}


/* =========================================================
   SAVE AND RESTORE AUDIT
========================================================= */

function saveAuditState() {
  const savedState = {
    currentAuditScreen:
      state.currentAuditScreen,
    currentCategory:
      state.currentCategory,
    answers: state.answers,
    profile: state.profile
  };

  try {
    localStorage.setItem(
      STORAGE_KEYS.audit,
      JSON.stringify(savedState)
    );
  } catch (error) {
    console.warn(
      "Unable to save audit progress.",
      error
    );
  }
}

function loadAuditState() {
  try {
    const saved =
      localStorage.getItem(STORAGE_KEYS.audit);

    if (!saved) {
      return;
    }

    const parsed = JSON.parse(saved);

    state.currentAuditScreen =
      parsed.currentAuditScreen || "welcome";

    state.currentCategory =
      Number.isInteger(parsed.currentCategory)
        ? parsed.currentCategory
        : 0;

    state.answers =
      parsed.answers &&
      typeof parsed.answers === "object"
        ? parsed.answers
        : {};

    state.profile =
      parsed.profile &&
      typeof parsed.profile === "object"
        ? parsed.profile
        : {};
  } catch (error) {
    console.warn(
      "Unable to restore audit progress.",
      error
    );
  }
}

function saveResults() {
  try {
    localStorage.setItem(
      STORAGE_KEYS.results,
      JSON.stringify(state.results)
    );
  } catch (error) {
    console.warn(
      "Unable to save audit results.",
      error
    );
  }
}

function loadResults() {
  try {
    const saved =
      localStorage.getItem(
        STORAGE_KEYS.results
      );

    if (!saved) {
      return;
    }

    const parsed = JSON.parse(saved);

    if (
      parsed &&
      Number.isFinite(parsed.overall) &&
      parsed.categoryScores
    ) {
      state.results = parsed;
    }
  } catch (error) {
    console.warn(
      "Unable to restore audit results.",
      error
    );
  }
}

function clearAuditData() {
  state.currentAuditScreen = "welcome";
  state.currentCategory = 0;
  state.answers = {};
  state.profile = {};
  state.results = null;

  try {
    localStorage.removeItem(STORAGE_KEYS.audit);
    localStorage.removeItem(STORAGE_KEYS.results);
  } catch (error) {
    console.warn(
      "Unable to clear saved audit data.",
      error
    );
  }

  getElement("profileForm")?.reset();
}


/* =========================================================
   START, CONTINUE, AND RESTART AUDIT
========================================================= */

function startNewAudit() {
  const existingProgress =
    getAnsweredQuestionCount() > 0 ||
    Object.values(state.profile).some(Boolean) ||
    Boolean(state.results);

  if (existingProgress) {
    const shouldRestart = window.confirm(
      "Starting a new audit will clear the current audit responses and results. Continue?"
    );

    if (!shouldRestart) {
      return;
    }
  }

  clearAuditData();
  restoreProfileForm();
  showPage("auditPage");
  showAuditScreen("welcome");
  updateDashboard();
}

function continueAudit() {
  showPage("auditPage");

  if (
    state.currentAuditScreen === "questions"
  ) {
    showAuditScreen("questions", false);
    renderCategory();
  } else if (
    state.currentAuditScreen === "profile"
  ) {
    showAuditScreen("profile", false);
  } else {
    showAuditScreen("welcome", false);
  }

  scrollToElement(getElement("audit-tool"));
}

function restartAudit() {
  const confirmed = window.confirm(
    "This will clear your current responses and generated results. Start again?"
  );

  if (!confirmed) {
    return;
  }

  clearAuditData();
  restoreProfileForm();
  prepareActionPlanPage();
  showPage("auditPage");
  showAuditScreen("welcome");
  updateDashboard();
}

function initializeAuditEntryButtons() {
  getElement("homeStartAuditButton")
    ?.addEventListener("click", (event) => {
      event.stopImmediatePropagation();
      startNewAudit();
    });

  getElement("continueAuditButton")
    ?.addEventListener("click", (event) => {
      event.stopImmediatePropagation();
      continueAudit();
    });

  getElement("dashboardOpenAuditButton")
    ?.addEventListener("click", (event) => {
      event.stopImmediatePropagation();
      continueAudit();
    });

  getElement("auditHeroStartButton")
    ?.addEventListener("click", () => {
      if (
        getAnsweredQuestionCount() > 0 ||
        Object.values(state.profile).some(Boolean)
      ) {
        continueAudit();
      } else {
        showAuditScreen("welcome");
      }
    });

  getElement("restartAuditButton")
    ?.addEventListener(
      "click",
      restartAudit
    );
}


/* =========================================================
   PRINT / DOWNLOAD RESULTS
========================================================= */

function initializePrintControls() {
  getElement("printResultsButton")
    ?.addEventListener("click", () => {
      document.body.classList.add(
        "printing-results"
      );

      window.print();

      window.setTimeout(() => {
        document.body.classList.remove(
          "printing-results"
        );
      }, 500);
    });
}


/* =========================================================
   ACTION PLAN
========================================================= */

function getPriorityCategories() {
  if (!state.results) {
    return [];
  }

  return categories
    .map((category) => ({
      ...category,
      score:
        state.results.categoryScores[
          category.key
        ]
    }))
    .filter((category) => category.score !== null)
    .sort(
      (a, b) =>
        (a.score ?? 101) - (b.score ?? 101)
    );
}

function prepareActionPlanPage() {
  const emptyState =
    getElement("actionPlanEmptyState");

  const builder =
    getElement("actionPlanBuilder");

  const hasResults = Boolean(state.results);

  setHidden(emptyState, hasResults);
  setHidden(builder, !hasResults);

  if (!hasResults) {
    return;
  }

  populatePrioritySelect();
  restoreActionPlan();
}

function populatePrioritySelect() {
  const select =
    getElement("actionPrioritySelect");

  if (!select || !state.results) {
    return;
  }

  const currentValue = select.value;

  select.innerHTML = `
    <option value="">
      Choose a priority
    </option>
  `;

  getPriorityCategories().forEach(
    (category) => {
      const option =
        document.createElement("option");

      option.value = category.key;
      option.textContent =
        `${category.title} (${category.score}%)`;

      select.appendChild(option);
    }
  );

  if (
    currentValue &&
    categories.some(
      (category) =>
        category.key === currentValue
    )
  ) {
    select.value = currentValue;
  }

  if (
    !select.value &&
    select.options.length > 1
  ) {
    select.selectedIndex = 1;
  }

  updateRecommendedPriority();
}

function updateRecommendedPriority() {
  const select =
    getElement("actionPrioritySelect");

  const category =
    categories.find(
      (item) => item.key === select?.value
    );

  if (!category) {
    setText(
      "recommendedPriorityTitle",
      "Select a priority from your results"
    );

    setText(
      "recommendedPriorityExplanation",
      "Your lowest-scoring readiness areas are available as suggested priorities."
    );

    return;
  }

  setText(
    "recommendedPriorityTitle",
    category.title
  );

  setText(
    "recommendedPriorityExplanation",
    categoryAdvice[category.key].gap
  );

  prefillActionPlan(category.key);
}

function prefillActionPlan(categoryKey) {
  const advice =
    categoryAdvice[categoryKey];

  if (!advice) {
    return;
  }

  const fields = {
    action30: advice.immediate,
    action60: advice.medium,
    action90: advice.future
  };

  Object.entries(fields).forEach(
    ([fieldId, suggestedValue]) => {
      const field = getElement(fieldId);

      if (field && !field.value.trim()) {
        field.value = suggestedValue;
      }
    }
  );
}

function collectActionPlan() {
  return {
    priority:
      getElement("actionPrioritySelect")
        ?.value || "",

    action30:
      getElement("action30")?.value.trim() ||
      "",

    owner30:
      getElement("owner30")?.value.trim() ||
      "",

    evidence30:
      getElement("evidence30")
        ?.value.trim() || "",

    action60:
      getElement("action60")?.value.trim() ||
      "",

    owner60:
      getElement("owner60")?.value.trim() ||
      "",

    evidence60:
      getElement("evidence60")
        ?.value.trim() || "",

    action90:
      getElement("action90")?.value.trim() ||
      "",

    owner90:
      getElement("owner90")?.value.trim() ||
      "",

    evidence90:
      getElement("evidence90")
        ?.value.trim() || "",

    requiredResources:
      getElement("requiredResources")
        ?.value.trim() || "",

    likelyBarriers:
      getElement("likelyBarriers")
        ?.value.trim() || "",

    savedAt: new Date().toISOString()
  };
}

function saveActionPlan() {
  const plan = collectActionPlan();

  try {
    localStorage.setItem(
      STORAGE_KEYS.actionPlan,
      JSON.stringify(plan)
    );

    const message =
      getElement("actionPlanSaveMessage");

    if (message) {
      message.textContent =
        "Action plan saved in this browser.";

      window.setTimeout(() => {
        message.textContent = "";
      }, 3000);
    }
  } catch (error) {
    console.warn(
      "Unable to save the action plan.",
      error
    );
  }
}

function restoreActionPlan() {
  let savedPlan = null;

  try {
    const saved =
      localStorage.getItem(
        STORAGE_KEYS.actionPlan
      );

    if (saved) {
      savedPlan = JSON.parse(saved);
    }
  } catch (error) {
    console.warn(
      "Unable to restore the action plan.",
      error
    );
  }

  if (!savedPlan) {
    updateRecommendedPriority();
    return;
  }

  const fieldMap = {
    priority: "actionPrioritySelect",
    action30: "action30",
    owner30: "owner30",
    evidence30: "evidence30",
    action60: "action60",
    owner60: "owner60",
    evidence60: "evidence60",
    action90: "action90",
    owner90: "owner90",
    evidence90: "evidence90",
    requiredResources: "requiredResources",
    likelyBarriers: "likelyBarriers"
  };

  Object.entries(fieldMap).forEach(
    ([savedKey, elementId]) => {
      const element = getElement(elementId);

      if (
        element &&
        savedPlan[savedKey] !== undefined
      ) {
        element.value = savedPlan[savedKey];
      }
    }
  );

  updateRecommendedPriority();
}

function downloadActionPlan() {
  saveActionPlan();

  document.body.classList.add(
    "printing-action-plan"
  );

  window.print();

  window.setTimeout(() => {
    document.body.classList.remove(
      "printing-action-plan"
    );
  }, 500);
}

function initializeActionPlanControls() {
  getElement("actionPrioritySelect")
    ?.addEventListener(
      "change",
      updateRecommendedPriority
    );

  getElement("saveActionPlanButton")
    ?.addEventListener(
      "click",
      saveActionPlan
    );

  getElement("downloadActionPlanButton")
    ?.addEventListener(
      "click",
      downloadActionPlan
    );

  getElement("actionPlanBuilder")
    ?.addEventListener("input", () => {
      const message =
        getElement("actionPlanSaveMessage");

      if (message) {
        message.textContent =
          "You have unsaved changes.";
      }
    });
}


/* =========================================================
   SAMPLE REPORT MODAL
========================================================= */

function openModal(modal) {
  if (!modal) {
    return;
  }

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");

  modal
    .querySelector(
      "button, [href], input, select, textarea"
    )
    ?.focus();
}

function closeModal(modal) {
  if (!modal) {
    return;
  }

  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

function initializeSampleReportModal() {
  const modal =
    getElement("sampleReportModal");

  const openButtons = [
    getElement("sampleReportButton"),
    getElement("welcomeSampleReportButton")
  ].filter(Boolean);

  openButtons.forEach((button) => {
    button.addEventListener("click", () => {
      openModal(modal);
    });
  });

  getElement("closeSampleReport")
    ?.addEventListener("click", () => {
      closeModal(modal);
    });

  getElement("closeSampleReportBottom")
    ?.addEventListener("click", () => {
      closeModal(modal);
    });

  getElement("sampleStartAuditButton")
    ?.addEventListener("click", () => {
      closeModal(modal);
      showPage("auditPage");

      if (
        getAnsweredQuestionCount() > 0 ||
        Object.values(state.profile).some(Boolean)
      ) {
        continueAudit();
      } else {
        showAuditScreen("welcome");
      }
    });

  modal?.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal(modal);
    }
  });
}


/* =========================================================
   RESOURCE FILTER AND PREVIEW
========================================================= */

function filterResources(category) {
  queryAll(".resource-card").forEach(
    (card) => {
      const shouldShow =
        category === "all" ||
        card.dataset.category === category;

      card.classList.toggle(
        "hidden",
        !shouldShow
      );
    }
  );
}

function initializeResourceControls() {
  getElement("resourceFilter")
    ?.addEventListener("change", (event) => {
      filterResources(event.target.value);
    });

  const modal =
    getElement("resourceModal");

  queryAll(".resource-link").forEach(
    (button) => {
      button.addEventListener("click", () => {
        const card =
          button.closest(".resource-card");

        const title =
          card?.querySelector("h3")
            ?.textContent.trim() ||
          "Resource preview";

        const description =
          card?.querySelector("p")
            ?.textContent.trim() ||
          "";

        setText(
          "resourceModalTitle",
          title
        );

        setText(
          "resourceModalDescription",
          description
        );

        openModal(modal);
      });
    }
  );

  getElement("closeResourceModal")
    ?.addEventListener("click", () => {
      closeModal(modal);
    });

  getElement("resourceModalCloseButton")
    ?.addEventListener("click", () => {
      closeModal(modal);
    });

  modal?.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal(modal);
    }
  });
}


/* =========================================================
   KEYBOARD ACCESSIBILITY
========================================================= */

function initializeKeyboardControls() {
  document.addEventListener(
    "keydown",
    (event) => {
      if (event.key !== "Escape") {
        return;
      }

      queryAll(".modal.open").forEach(
        (modal) => closeModal(modal)
      );

      closeMobileMenu();
    }
  );
}


/* =========================================================
   CURRENT YEAR
========================================================= */

function initializeCurrentYear() {
  setText(
    "currentYear",
    new Date().getFullYear()
  );
}


/* =========================================================
   INITIAL AUDIT DISPLAY
========================================================= */

function restoreAuditInterface() {
  restoreProfileForm();

  if (
    state.currentAuditScreen === "questions" &&
    Object.keys(state.answers).length > 0
  ) {
    showAuditScreen("questions", false);
    renderCategory();
    return;
  }

  if (
    state.currentAuditScreen === "profile" ||
    Object.values(state.profile).some(Boolean)
  ) {
    showAuditScreen("profile", false);
    return;
  }

  showAuditScreen("welcome", false);
}


/* =========================================================
   APP INITIALIZATION
========================================================= */

function initializeApp() {
  loadAuditState();
  loadResults();

  initializePageNavigation();
  initializeMobileMenu();
  initializeProfileControls();
  initializeQuestionControls();
  initializeResponseHelp();
  initializeAuditEntryButtons();
  initializePrintControls();
  initializeActionPlanControls();
  initializeSampleReportModal();
  initializeResourceControls();
  initializeKeyboardControls();
  initializeCurrentYear();

  restoreAuditInterface();

  if (state.results) {
    renderResults();
  } else {
    updateResultsPageVisibility();
  }

  prepareActionPlanPage();
  updateDashboard();
  showPage("homePage", {
    preserveScroll: true
  });
}

document.addEventListener(
  "DOMContentLoaded",
  initializeApp
);
