const users = {
  maya: {
    name: "maya",
    uid: 1000,
    primaryGroup: { name: "maya", gid: 1000 },
    supplementaryGroups: [{ name: "developers", gid: 2000 }],
    access: {
      allowed: true,
      explanation:
        "maya belongs to developers, so the group's read and write permissions apply.",
    },
  },
  noah: {
    name: "noah",
    uid: 1001,
    primaryGroup: { name: "noah", gid: 1001 },
    supplementaryGroups: [{ name: "design", gid: 2001 }],
    access: {
      allowed: false,
      explanation:
        "noah does not belong to developers, so the file's group permissions do not apply.",
    },
  },
  root: {
    name: "root",
    uid: 0,
    primaryGroup: { name: "root", gid: 0 },
    supplementaryGroups: [],
    access: {
      allowed: true,
      explanation:
        "root can bypass ordinary file permission checks through its administrative privileges.",
    },
  },
};

const lab = document.querySelector("[data-identity-lab]");
const fallback = document.querySelector("[data-identity-fallback]");
const picker = document.querySelector("[data-user-picker]");

const output = {
  whoami: document.querySelector("[data-whoami]"),
  id: document.querySelector("[data-id]"),
  groups: document.querySelector("[data-groups]"),
  userName: document.querySelector("[data-user-name]"),
  uid: document.querySelector("[data-uid]"),
  primaryName: document.querySelector("[data-primary-name]"),
  primaryGid: document.querySelector("[data-primary-gid]"),
  supplementaryList: document.querySelector("[data-supplementary-list]"),
  accessResult: document.querySelector("[data-access-result]"),
  accessSymbol: document.querySelector("[data-access-symbol]"),
  accessTitle: document.querySelector("[data-access-title]"),
  accessExplanation: document.querySelector("[data-access-explanation]"),
};

const renderSupplementaryGroups = (groups) => {
  if (!groups.length) {
    const emptyMessage = document.createElement("p");
    emptyMessage.className = "empty-groups";
    emptyMessage.textContent = "No supplementary groups";
    output.supplementaryList.replaceChildren(emptyMessage);
    return;
  }

  const groupChips = groups.map((group) => {
    const chip = document.createElement("div");
    chip.className = "group-chip";

    const symbol = document.createElement("span");
    symbol.setAttribute("aria-hidden", "true");
    symbol.textContent = "+";

    const name = document.createElement("strong");
    name.textContent = group.name;

    const gid = document.createElement("small");
    gid.textContent = `GID ${group.gid}`;

    chip.append(symbol, name, gid);
    return chip;
  });

  output.supplementaryList.replaceChildren(...groupChips);
};

const renderUser = (user) => {
  const allGroups = [user.primaryGroup, ...user.supplementaryGroups];
  const idGroups = allGroups
    .map((group) => `${group.gid}(${group.name})`)
    .join(",");

  output.whoami.textContent = user.name;
  output.id.textContent =
    `uid=${user.uid}(${user.name}) ` +
    `gid=${user.primaryGroup.gid}(${user.primaryGroup.name}) ` +
    `groups=${idGroups}`;
  output.groups.textContent = allGroups.map((group) => group.name).join(" ");
  output.userName.textContent = user.name;
  output.uid.textContent = String(user.uid);
  output.primaryName.textContent = user.primaryGroup.name;
  output.primaryGid.textContent = String(user.primaryGroup.gid);
  renderSupplementaryGroups(user.supplementaryGroups);

  output.accessResult.classList.toggle("is-allowed", user.access.allowed);
  output.accessResult.classList.toggle("is-denied", !user.access.allowed);
  output.accessSymbol.textContent = user.access.allowed ? "✓" : "×";
  output.accessTitle.textContent = user.access.allowed
    ? "Access allowed"
    : "Access denied";
  output.accessExplanation.textContent = user.access.explanation;
};

const canInitialize =
  lab &&
  fallback &&
  picker &&
  Object.values(output).every(Boolean);

if (canInitialize) {
  picker.addEventListener("change", (event) => {
    const selectedUser = users[event.target.value];
    if (selectedUser) renderUser(selectedUser);
  });

  renderUser(users.maya);
  lab.hidden = false;
  fallback.hidden = true;
}
