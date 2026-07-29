document.documentElement.classList.add("js");

const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const navigation = document.querySelector("[data-nav]");
const roadmapButtons = [...document.querySelectorAll(".roadmap-toggle")];
const retryButton = document.querySelector("[data-try-command]");
const typedCommand = document.querySelector("[data-command]");
const commandOutput = document.querySelector("[data-output]");
const year = document.querySelector("[data-year]");
const menuBackground = document.querySelectorAll(
  ".skip-link, #main-content, .site-footer",
);

const mobileMenuMedia = window.matchMedia("(max-width: 760px)");
const reducedMotionMedia = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
);

let headerIsScrolled;

const updateHeader = () => {
  const shouldBeScrolled = window.scrollY > 16;

  if (shouldBeScrolled === headerIsScrolled) return;
  headerIsScrolled = shouldBeScrolled;
  header?.classList.toggle("is-scrolled", shouldBeScrolled);
};

const setMenuOpen = (isOpen, { returnFocus = false } = {}) => {
  if (!menuToggle || !navigation) return;

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation" : "Open navigation",
  );
  navigation.classList.toggle("is-open", isOpen);
  navigation.inert = mobileMenuMedia.matches && !isOpen;
  menuBackground.forEach((element) => {
    element.inert = isOpen;
  });
  document.body.classList.toggle("menu-open", isOpen);

  if (returnFocus) menuToggle.focus();
};

menuToggle?.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") !== "true";
  setMenuOpen(isOpen);
});

navigation?.addEventListener("click", (event) => {
  if (event.target.closest("a")) setMenuOpen(false);
});

document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    menuToggle?.getAttribute("aria-expanded") === "true"
  ) {
    setMenuOpen(false, { returnFocus: true });
  }
});

mobileMenuMedia.addEventListener("change", () => setMenuOpen(false));
setMenuOpen(false);

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

const revealElements = document.querySelectorAll(".reveal");

if (!reducedMotionMedia.matches && "IntersectionObserver" in window) {
  revealElements.forEach((element) => element.classList.add("is-pending"));

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.14 },
  );

  revealElements.forEach((element) => revealObserver.observe(element));
}

const setRoadmapItemExpanded = (button, isExpanded) => {
  const item = button.closest(".roadmap-item");
  const panelId = button.getAttribute("aria-controls");
  const panel = panelId ? document.getElementById(panelId) : null;

  button.setAttribute("aria-expanded", String(isExpanded));
  item?.classList.toggle("is-active", isExpanded);
  if (panel) panel.hidden = !isExpanded;
};

const toggleRoadmapItem = (selectedButton) => {
  const shouldExpand =
    selectedButton.getAttribute("aria-expanded") !== "true";

  roadmapButtons.forEach((button) => {
    setRoadmapItemExpanded(button, button === selectedButton && shouldExpand);
  });
};

roadmapButtons.forEach((button, index) => {
  button.addEventListener("click", () => toggleRoadmapItem(button));
  button.addEventListener("keydown", (event) => {
    const keyTargets = {
      ArrowDown: (index + 1) % roadmapButtons.length,
      ArrowUp: (index - 1 + roadmapButtons.length) % roadmapButtons.length,
      Home: 0,
      End: roadmapButtons.length - 1,
    };
    const targetIndex = keyTargets[event.key];

    if (targetIndex === undefined) return;
    event.preventDefault();
    roadmapButtons[targetIndex].focus();
  });
});

const replayCommand = () => {
  if (!typedCommand || !commandOutput || !retryButton) return;

  const command = "pwd";

  if (reducedMotionMedia.matches) {
    typedCommand.textContent = command;
    commandOutput.textContent = "/home/learner";
    return;
  }

  typedCommand.textContent = "";
  commandOutput.textContent = "";
  commandOutput.setAttribute("aria-busy", "true");
  retryButton.disabled = true;

  let characterIndex = 0;
  const typeNextCharacter = () => {
    typedCommand.textContent += command[characterIndex];
    characterIndex += 1;

    if (characterIndex < command.length) {
      window.setTimeout(typeNextCharacter, 150);
      return;
    }

    window.setTimeout(() => {
      commandOutput.textContent = "/home/learner";
      commandOutput.setAttribute("aria-busy", "false");
      retryButton.disabled = false;
    }, 350);
  };

  window.setTimeout(typeNextCharacter, 150);
};

retryButton?.addEventListener("click", replayCommand);

if (year) {
  const currentYear = String(new Date().getFullYear());
  year.textContent = currentYear;
  year.dateTime = currentYear;
}
