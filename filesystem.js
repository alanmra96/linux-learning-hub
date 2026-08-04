const filesystemData = {
  id: "root",
  name: "/",
  path: "/",
  title: "The root of everything",
  summary:
    "The top of the Linux file system. Every file, directory, device, and mounted disk appears somewhere beneath it.",
  what: "The single starting point for the entire directory hierarchy.",
  why:
    "It gives Linux one consistent tree where local disks, removable media, and virtual system data can all be reached.",
  contents: [
    ["/home", "people’s personal files"],
    ["/etc", "system-wide configuration"],
    ["/usr", "installed programs and shared data"],
  ],
  example: "Running `ls /` shows the major branches of your Linux system.",
  children: [
    {
      id: "bin",
      name: "bin",
      path: "/bin",
      title: "Essential command-line programs",
      summary:
        "The traditional home of commands needed for basic system operation and recovery.",
      what:
        "A directory containing fundamental executable programs, or a link to their modern location under `/usr`.",
      why:
        "Historically, these commands had to remain available even when other file systems could not be mounted.",
      contents: [
        ["ls", "lists directory contents"],
        ["cp", "copies files and directories"],
        ["sh", "starts a basic command shell"],
      ],
      example:
        "When you type `ls`, your shell commonly runs `/bin/ls` (often linked to `/usr/bin/ls`).",
    },
    {
      id: "boot",
      name: "boot",
      path: "/boot",
      title: "Files that start the system",
      summary:
        "Boot loaders use this directory to find the Linux kernel and supporting startup files.",
      what: "A small collection of files required during the early boot process.",
      why:
        "Keeping startup files together lets firmware and boot loaders locate them before the full system is running.",
      contents: [
        ["vmlinuz", "the compressed Linux kernel"],
        ["initramfs", "a temporary early-boot file system"],
        ["grub", "boot-loader configuration and modules"],
      ],
      example:
        "After a kernel update, a package manager normally places the new kernel and initramfs in `/boot`.",
    },
    {
      id: "dev",
      name: "dev",
      path: "/dev",
      title: "Devices represented as files",
      summary:
        "Linux exposes hardware and special data streams through device files in this virtual directory.",
      what:
        "A dynamically managed directory of interfaces to disks, terminals, audio devices, and other hardware.",
      why:
        "Representing devices as files lets programs use familiar read and write operations to communicate with hardware.",
      contents: [
        ["sda", "a disk device on some systems"],
        ["tty", "terminal devices"],
        ["null", "discards anything written to it"],
      ],
      example:
        "Redirecting unwanted output to `/dev/null` safely throws that output away.",
    },
    {
      id: "etc",
      name: "etc",
      path: "/etc",
      title: "System-wide configuration",
      summary:
        "Most settings that describe how the operating system and installed services should behave live here.",
      what:
        "A hierarchy of human-readable configuration files and service-specific directories.",
      why:
        "It separates machine-wide settings from programs in `/usr` and personal preferences in home directories.",
      contents: [
        ["passwd", "basic user-account information"],
        ["hosts", "local hostname mappings"],
        ["ssh", "OpenSSH settings"],
      ],
      example:
        "An administrator may edit `/etc/hosts` to give a local development server an easy-to-remember name.",
      children: [
        {
          id: "etc-systemd",
          name: "systemd",
          path: "/etc/systemd",
          title: "Local systemd configuration",
          summary:
            "System administrators place systemd overrides and locally managed unit configuration here.",
          what:
            "The configuration area for systemd, the service and system manager used by many Linux distributions.",
          why:
            "It provides a stable location for machine-specific settings that should take precedence over packaged defaults.",
          contents: [
            ["system", "system service units and overrides"],
            ["user", "user-service configuration"],
            ["journald.conf", "system journal settings"],
          ],
          example:
            "A service override created with `systemctl edit` is saved beneath `/etc/systemd/system`.",
        },
      ],
    },
    {
      id: "home",
      name: "home",
      path: "/home",
      title: "People’s home directories",
      summary:
        "Regular users usually receive a personal directory beneath `/home` for their files and preferences.",
      what: "The parent directory for most non-administrator user accounts.",
      why:
        "It keeps each person’s documents and settings separate from the operating system and from other users.",
      contents: [
        ["learner", "one user’s home directory"],
        ["ada", "another user’s home directory"],
        ["guest", "a possible guest account home"],
      ],
      example:
        "A user named Ada will commonly start in `/home/ada` after signing in.",
      children: [
        {
          id: "home-user",
          name: "learner",
          path: "/home/learner",
          title: "Your personal workspace",
          summary:
            "This example home directory is where a learner owns files, customizes applications, and begins terminal sessions.",
          what: "A private working area associated with one regular user account.",
          why:
            "It gives you a safe place to work without changing system-wide files or another person’s data.",
          contents: [
            [".bashrc", "shell preferences and startup commands"],
            ["Downloads", "downloaded files"],
            ["projects", "an example folder for your work"],
          ],
          example:
            "The shorthand `~` refers to your home directory, so `cd ~` brings you here.",
        },
      ],
    },
    {
      id: "opt",
      name: "opt",
      path: "/opt",
      title: "Optional application packages",
      summary:
        "Some self-contained or third-party software is installed beneath this directory.",
      what:
        "A location reserved for add-on application packages that keep most of their files together.",
      why:
        "It lets software outside the distribution’s normal package layout avoid scattering files across the system.",
      contents: [
        ["vendor", "a software vendor’s directory"],
        ["application", "a self-contained application tree"],
        ["bin", "program launchers within a package"],
      ],
      example:
        "A commercial editor might install its program files under `/opt/editor`.",
    },
    {
      id: "proc",
      name: "proc",
      path: "/proc",
      title: "A live view of processes and the kernel",
      summary:
        "This virtual file system turns current process and kernel information into files you can inspect.",
      what:
        "An in-memory interface generated by the kernel rather than ordinary data stored on disk.",
      why:
        "It gives programs and administrators a consistent way to inspect and tune the running system.",
      contents: [
        ["cpuinfo", "processor details"],
        ["meminfo", "memory usage and capacity"],
        ["[number]", "one directory for each process ID"],
      ],
      example:
        "Running `cat /proc/cpuinfo` displays information reported by the kernel about your processors.",
    },
    {
      id: "root-home",
      name: "root",
      path: "/root",
      title: "The administrator’s home",
      summary:
        "The special root account keeps its personal files here instead of beneath `/home`.",
      what: "The home directory belonging to the all-powerful root user.",
      why:
        "It keeps the administrator’s files available and separate from regular user homes, including during recovery work.",
      contents: [
        [".bashrc", "root’s shell preferences"],
        [".ssh", "administrator SSH configuration"],
        ["scripts", "a possible location for maintenance scripts"],
      ],
      example:
        "A root login normally starts in `/root`; regular users cannot browse it without elevated permission.",
    },
    {
      id: "run",
      name: "run",
      path: "/run",
      title: "Runtime state since boot",
      summary:
        "Services store short-lived information about the currently running system here.",
      what:
        "A temporary, memory-backed directory populated during boot and cleared when the machine restarts.",
      why:
        "Programs need a standard place for current process IDs, sockets, locks, and other runtime coordination data.",
      contents: [
        ["user", "per-user runtime data"],
        ["lock", "resource lock files"],
        ["systemd", "systemd runtime state"],
      ],
      example:
        "A service may place its communication socket beneath `/run` while it is active.",
    },
    {
      id: "sys",
      name: "sys",
      path: "/sys",
      title: "Kernel and hardware structure",
      summary:
        "This virtual file system describes devices, drivers, and kernel objects in a structured hierarchy.",
      what:
        "An in-memory interface, called sysfs, that exposes the kernel’s model of the machine.",
      why:
        "It lets system tools inspect hardware relationships and adjust supported device or driver settings.",
      contents: [
        ["class", "devices grouped by type"],
        ["block", "block-storage devices"],
        ["bus", "hardware buses and their drivers"],
      ],
      example:
        "Laptop tools can read files under `/sys/class/power_supply` to report battery information.",
    },
    {
      id: "tmp",
      name: "tmp",
      path: "/tmp",
      title: "Short-lived temporary files",
      summary:
        "Programs and users place temporary working data here when it does not belong in permanent storage.",
      what:
        "A shared scratch area that is commonly cleaned automatically, sometimes at every reboot.",
      why:
        "It provides a predictable writable location for transient files such as intermediate downloads or editor state.",
      contents: [
        ["temporary files", "short-lived application data"],
        ["sockets", "local communication endpoints"],
        ["locks", "some temporary coordination files"],
      ],
      example:
        "A script can unpack an archive in `/tmp`, process it, and remove the working files afterward.",
    },
    {
      id: "usr",
      name: "usr",
      path: "/usr",
      title: "Most installed software and shared data",
      summary:
        "This large hierarchy contains most user-facing commands, libraries, documentation, and architecture-independent data.",
      what:
        "A mostly shareable, read-only collection of programs and resources installed by the operating system.",
      why:
        "It organizes software separately from changing configuration in `/etc` and runtime data in `/var`.",
      contents: [
        ["bin", "most command-line programs"],
        ["lib", "program libraries"],
        ["share", "manuals, icons, locales, and shared data"],
      ],
      example:
        "A package manager commonly installs a command in `/usr/bin` and its manual in `/usr/share/man`.",
      children: [
        {
          id: "usr-local",
          name: "local",
          path: "/usr/local",
          title: "Software managed on this machine",
          summary:
            "Locally installed tools can live here without colliding with files managed by the Linux distribution.",
          what:
            "A hierarchy mirroring parts of `/usr`, reserved for software installed by the local administrator.",
          why:
            "It separates custom or manually compiled software from distribution-managed packages, making upgrades safer.",
          contents: [
            ["bin", "locally installed commands"],
            ["lib", "local software libraries"],
            ["share", "shared resources for local programs"],
          ],
          example:
            "A tool compiled from source may install its executable as `/usr/local/bin/tool`.",
        },
      ],
    },
    {
      id: "var",
      name: "var",
      path: "/var",
      title: "Data that changes over time",
      summary:
        "Logs, caches, queues, databases, and other frequently changing system data are kept here.",
      what:
        "The variable-data hierarchy for information that grows or changes while programs and services run.",
      why:
        "It separates changing data from relatively static programs, making storage management and backups more predictable.",
      contents: [
        ["log", "system and service logs"],
        ["cache", "re-creatable cached data"],
        ["lib", "persistent state owned by applications"],
      ],
      example:
        "When troubleshooting a service, an administrator often begins by examining its logs beneath `/var/log`.",
    },
  ],
};

const explorer = document.querySelector("[data-filesystem-explorer]");
const fallback = document.querySelector("[data-filesystem-fallback]");
const tree = document.querySelector("[data-directory-tree]");
const detailElements = {
  path: document.querySelector("[data-directory-path]"),
  title: document.querySelector("[data-directory-title]"),
  summary: document.querySelector("[data-directory-summary]"),
  what: document.querySelector("[data-directory-what]"),
  why: document.querySelector("[data-directory-why]"),
  contents: document.querySelector("[data-directory-contents]"),
  example: document.querySelector("[data-directory-example]"),
};

const directoryIndex = new Map();

const appendFormattedText = (element, value) => {
  const fragments = value.split(/(`[^`]+`)/g).filter(Boolean);
  const nodes = fragments.map((fragment) => {
    if (fragment.startsWith("`") && fragment.endsWith("`")) {
      const code = document.createElement("code");
      code.textContent = fragment.slice(1, -1);
      return code;
    }
    return document.createTextNode(fragment);
  });
  element.replaceChildren(...nodes);
};

const createTreeItem = (directory, level = 1) => {
  directoryIndex.set(directory.id, directory);

  const listItem = document.createElement("li");
  listItem.setAttribute("role", "none");

  const button = document.createElement("button");
  button.className = "tree-item";
  button.type = "button";
  button.setAttribute("role", "treeitem");
  button.setAttribute("aria-level", String(level));
  button.setAttribute("aria-selected", "false");
  button.tabIndex = -1;
  button.dataset.directory = directory.id;

  const hasChildren = Boolean(directory.children?.length);
  const disclosure = document.createElement("span");
  disclosure.className = hasChildren ? "tree-chevron" : "tree-spacer";
  disclosure.setAttribute("aria-hidden", "true");
  disclosure.textContent = hasChildren ? "›" : "";
  button.append(disclosure);

  const folder = document.createElement("span");
  folder.className = directory.id === "root"
    ? "folder-symbol root-symbol"
    : "folder-symbol";
  folder.setAttribute("aria-hidden", "true");
  if (directory.id === "root") folder.textContent = "/";
  button.append(folder);

  const name = document.createElement("strong");
  name.textContent = directory.name;

  if (directory.id === "root") {
    const label = document.createElement("span");
    const description = document.createElement("small");
    description.textContent = "root";
    label.append(name, description);
    button.append(label);
  } else {
    button.append(name);
  }

  listItem.append(button);

  if (hasChildren) {
    const isRoot = directory.id === "root";
    button.setAttribute("aria-expanded", String(isRoot));

    const group = document.createElement("ul");
    group.setAttribute("role", "group");
    group.hidden = !isRoot;
    directory.children.forEach((child) => {
      group.append(createTreeItem(child, level + 1));
    });
    listItem.append(group);
  }

  return listItem;
};

const getTreeItems = () => [...tree.querySelectorAll(".tree-item")];

const getVisibleTreeItems = () =>
  getTreeItems().filter((item) => !item.closest("ul[hidden]"));

const setExpanded = (item, shouldExpand) => {
  if (!item.hasAttribute("aria-expanded")) return;
  item.setAttribute("aria-expanded", String(shouldExpand));
  const childGroup = item.parentElement.querySelector(
    ":scope > ul[role='group']",
  );
  if (childGroup) childGroup.hidden = !shouldExpand;
};

const renderDirectory = (directory) => {
  detailElements.path.textContent = directory.path;
  detailElements.title.textContent = directory.title;
  appendFormattedText(detailElements.summary, directory.summary);
  appendFormattedText(detailElements.what, directory.what);
  appendFormattedText(detailElements.why, directory.why);
  appendFormattedText(detailElements.example, directory.example);

  const contents = directory.contents.map(([name, description]) => {
    const item = document.createElement("li");
    const code = document.createElement("code");
    const text = document.createElement("span");
    code.textContent = name;
    text.textContent = description;
    item.append(code, text);
    return item;
  });
  detailElements.contents.replaceChildren(...contents);
};

const selectTreeItem = (selectedItem) => {
  getTreeItems().forEach((item) => {
    const isSelected = item === selectedItem;
    item.classList.toggle("is-selected", isSelected);
    item.setAttribute("aria-selected", String(isSelected));
    item.tabIndex = isSelected ? 0 : -1;
  });

  const directory = directoryIndex.get(selectedItem.dataset.directory);
  if (directory) renderDirectory(directory);
};

const focusTreeItem = (item) => {
  if (!item) return;
  selectTreeItem(item);
  item.focus();
};

const handleTreeClick = (event) => {
  const item = event.target.closest(".tree-item");
  if (!item) return;

  selectTreeItem(item);
  if (item.hasAttribute("aria-expanded")) {
    setExpanded(item, item.getAttribute("aria-expanded") !== "true");
  }
};

const handleTreeKeydown = (event) => {
  const currentItem = event.target.closest(".tree-item");
  if (!currentItem) return;

  const visibleItems = getVisibleTreeItems();
  const currentIndex = visibleItems.indexOf(currentItem);
  let targetItem;

  if (event.key === "ArrowDown" && currentIndex < visibleItems.length - 1) {
    targetItem = visibleItems[currentIndex + 1];
  }
  if (event.key === "ArrowUp" && currentIndex > 0) {
    targetItem = visibleItems[currentIndex - 1];
  }
  if (event.key === "Home") targetItem = visibleItems[0];
  if (event.key === "End") targetItem = visibleItems.at(-1);

  if (event.key === "ArrowRight") {
    if (currentItem.getAttribute("aria-expanded") === "false") {
      setExpanded(currentItem, true);
    } else if (currentItem.getAttribute("aria-expanded") === "true") {
      targetItem = currentItem.parentElement.querySelector(
        ":scope > ul > li > .tree-item",
      );
    }
  }

  if (event.key === "ArrowLeft") {
    if (currentItem.getAttribute("aria-expanded") === "true") {
      setExpanded(currentItem, false);
    } else {
      const parentGroup = currentItem.closest("ul[role='group']");
      targetItem = parentGroup?.parentElement.querySelector(
        ":scope > .tree-item",
      );
    }
  }

  const handledKeys = [
    "ArrowDown",
    "ArrowUp",
    "ArrowRight",
    "ArrowLeft",
    "Home",
    "End",
  ];
  if (!handledKeys.includes(event.key)) return;

  event.preventDefault();
  focusTreeItem(targetItem);
};

const canInitialize =
  explorer &&
  fallback &&
  tree &&
  Object.values(detailElements).every(Boolean);

if (canInitialize) {
  tree.append(createTreeItem(filesystemData));
  const rootItem = tree.querySelector(".tree-item");
  selectTreeItem(rootItem);
  tree.addEventListener("click", handleTreeClick);
  tree.addEventListener("keydown", handleTreeKeydown);
  explorer.hidden = false;
  fallback.hidden = true;
}
