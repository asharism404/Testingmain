
(() => {
  const grid = document.getElementById("subjectGrid");
  const search = document.getElementById("searchInput");
  const empty = document.getElementById("emptyState");
  const count = document.getElementById("subjectCount");
  const sidebar = document.getElementById("sidebar");

  let selectedYear = "all";
  let searchText = "";

  const yearNames = {
    1: "FIRST BHMS",
    2: "SECOND BHMS",
    3: "THIRD BHMS",
    4: "FOURTH BHMS"
  };

  count.textContent = window.BHMS_SUBJECTS.length;

  function renderSubjects() {
    const results = window.BHMS_SUBJECTS.filter(subject => {
      const matchesYear =
        selectedYear === "all" ||
        String(subject.year) === selectedYear;

      const searchable = [
        subject.name,
        subject.category,
        subject.description,
        yearNames[subject.year]
      ].join(" ").toLowerCase();

      return matchesYear && searchable.includes(searchText);
    });

    grid.innerHTML = results.map((subject, index) => `
      <article class="subject-card">
        <div class="subject-top">
          <span class="subject-symbol tone-${subject.tone}">
            ${subject.icon}
          </span>
          <span class="year-tag">
            ${yearNames[subject.year]}
          </span>
        </div>

        <h3>${subject.name}</h3>
        <p>${subject.description}</p>

        <div class="subject-bottom">
          <span>${subject.category}</span>
          <a href="${
            subject.name.toLowerCase().includes("materia medica")
              ? "#materia"
              : "https://www.nch.org.in/"
          }"
             aria-label="Explore ${subject.name}">↗</a>
        </div>
      </article>
    `).join("");

    empty.hidden = results.length !== 0;
    grid.hidden = results.length === 0;

    document.querySelectorAll(".filter").forEach(button => {
      button.classList.toggle(
        "active",
        button.dataset.year === selectedYear
      );
    });

    document.querySelectorAll(".year-button").forEach(button => {
      button.classList.toggle(
        "active",
        button.dataset.year === selectedYear
      );
    });
  }

  function changeYear(year) {
    selectedYear = year;
    renderSubjects();
  }

  document.querySelectorAll(".filter, .year-button")
    .forEach(button => {
      button.addEventListener("click", () => {
        changeYear(button.dataset.year);

        if (button.classList.contains("year-button")) {
          sidebar.classList.remove("open");
          document.getElementById("subjects")
            .scrollIntoView({ behavior: "smooth" });
        }
      });
    });

  search.addEventListener("input", event => {
    searchText = event.target.value.trim().toLowerCase();
    renderSubjects();
  });

  document.getElementById("menuToggle")
    .addEventListener("click", () => {
      sidebar.classList.toggle("open");
    });

  document.addEventListener("keydown", event => {
    if ((event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "k") {
      event.preventDefault();
      search.focus();
    }

    if (event.key === "Escape") {
      search.value = "";
      searchText = "";
      renderSubjects();
      search.blur();
      sidebar.classList.remove("open");
    }
  });

  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      sidebar.classList.remove("open");
      document.querySelectorAll(".nav-link").forEach(item => {
        item.classList.toggle("active", item === link);
      });
    });
  });

  renderSubjects();
})();
