const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "http://127.0.0.1:5500/frontend";
}

// Task data
const tasks = {
  "task-1": {
    id: "task-1",
    title: "Improve cards readability",
    tags: [
      { label: "Feedback", color: "feedback" },
      { label: "Bug", color: "bug" },
    ],
    comments: 12,
    files: 0,
    assignees: ["U1"],
  },
  "task-2": {
    id: "task-2",
    title: "Improve cards readability",
    description: "As a team license owner, I want to use multiplied limits",
    tags: [{ label: "Design System", color: "design" }],
    dueDate: "21/03/22",
    dueDaysLeft: 18,
    comments: 12,
    files: 0,
    assignees: ["U1", "U2"],
  },
  "task-3": {
    id: "task-3",
    title: "D-3",
    description: "Update tokens",
    tags: [{ label: "Design System", color: "design" }],
    comments: 0,
    files: 0,
    assignees: ["U1"],
  },
  "task-4": {
    id: "task-4",
    title: "Improve cards readability",
    description: "As a team license owner, I want to use multiplied limits",
    tags: [{ label: "Feedback", color: "feedback" }],
    dueDate: "21/03/22",
    dueDaysLeft: 18,
    comments: 12,
    files: 0,
    assignees: ["U1", "U2"],
  },
  "task-5": {
    id: "task-5",
    title: "Improve cards readability",
    tags: [
      { label: "Feedback", color: "feedback" },
      { label: "Bug", color: "bug" },
    ],
    dueDate: "21/03/22",
    dueDaysLeft: 18,
    priority: "high",
    comments: 12,
    files: 0,
    assignees: ["U1", "U2"],
  },
  "task-6": {
    id: "task-6",
    title: "Improve cards readability",
    tags: [
      { label: "Feedback", color: "feedback" },
      { label: "Bug", color: "bug" },
      { label: "Design System", color: "design" },
    ],
    dueDate: "21/03/22",
    dueDaysLeft: 18,
    comments: 12,
    files: 0,
    assignees: ["U1", "U2"],
  },
  "task-7": {
    id: "task-7",
    title: "Improve cards readability",
    tags: [
      { label: "Design System", color: "design" },
      { label: "Bug", color: "bug" },
    ],
    dueDate: "21/03/22",
    dueDaysLeft: 18,
    priority: "high",
    comments: 12,
    files: 0,
    assignees: ["U1", "U2"],
  },
};

// Column data
const columns = {
  todo: {
    id: "todo",
    title: "To do",
    taskIds: ["task-1", "task-2", "task-3"],
  },
  inprogress: {
    id: "inprogress",
    title: "In progress",
    taskIds: ["task-4", "task-5"],
  },
  completed: {
    id: "completed",
    title: "Completed",
    taskIds: ["task-6", "task-7"],
  },
};

// Create task card HTML
function createTaskCard(task) {
  const card = document.createElement("div");
  card.className = "task-card";
  card.id = task.id;
  card.draggable = true;

  // Add tags
  let tagsHTML = "";
  if (task.tags && task.tags.length > 0) {
    tagsHTML = '<div class="task-tags">';
    task.tags.forEach((tag) => {
      tagsHTML += `<span class="task-tag ${tag.color}">${tag.label}</span>`;
    });
    tagsHTML += "</div>";
  }

  // Add title and more button
  const titleHTML = `
    <div class="task-header">
      <h4 class="task-title">${task.title}</h4>
      <button class="icon-btn small">
        <i class="fas fa-ellipsis-h"></i>
      </button>
    </div>
  `;

  // Add description if exists
  let descriptionHTML = "";
  if (task.description) {
    descriptionHTML = `<p class="task-description">${task.description}</p>`;
  }

  // Add due date if exists
  let dueDateHTML = "";
  if (task.dueDate) {
    const priorityClass = task.priority === "high" ? "high-priority" : "";
    dueDateHTML = `
      <div class="task-due-date ${priorityClass}">
        <i class="fas fa-flag"></i>
        <span>${task.dueDate}</span>
        <span class="days-left">D-${task.dueDaysLeft}</span>
      </div>
    `;
  }

  // Add assignees and meta info
  let assigneesHTML = '<div class="task-assignees">';
  if (task.assignees && task.assignees.length > 0) {
    task.assignees.forEach((assignee) => {
      assigneesHTML += `<div class="task-assignee">${assignee}</div>`;
    });
  }
  assigneesHTML += "</div>";

  const metaHTML = `
    <div class="task-meta">
      <div class="task-meta-item">
        <i class="fas fa-comment"></i>
        <span>${task.comments} comments</span>
      </div>
      <div class="task-meta-item">
        <i class="fas fa-file"></i>
        <span>${task.files} files</span>
      </div>
    </div>
  `;

  // Combine all parts
  card.innerHTML = `
    ${tagsHTML}
    ${titleHTML}
    ${descriptionHTML}
    ${dueDateHTML}
    <div class="task-footer">
      ${assigneesHTML}
      ${metaHTML}
    </div>
  `;

  // Add drag and drop event listeners
  card.addEventListener("dragstart", handleDragStart);
  card.addEventListener("dragend", handleDragEnd);

  return card;
}

// Render initial board
function renderBoard() {
  // Render each column's tasks
  Object.keys(columns).forEach((columnId) => {
    const column = columns[columnId];
    const columnElement = document.getElementById(`${columnId}-content`);
    columnElement.innerHTML = ""; // Clear column

    // Add tasks to column
    column.taskIds.forEach((taskId) => {
      const task = tasks[taskId];
      const taskCard = createTaskCard(task);
      columnElement.appendChild(taskCard);
    });

    // Update column count
    const countElement =
      columnElement.parentElement.querySelector(".column-count");
    if (countElement) {
      countElement.textContent = column.taskIds.length;
    }
  });
}

// Drag and Drop functionality
let draggedTask = null;

function handleDragStart(e) {
  draggedTask = this;
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("text/plain", this.id);
  this.classList.add("dragging");

  // For Firefox
  e.dataTransfer.setDragImage(this, 20, 20);
}

function handleDragEnd(e) {
  this.classList.remove("dragging");

  // Remove drag-over class from all columns
  document.querySelectorAll(".column-content").forEach((column) => {
    column.classList.remove("drag-over");
  });
}

// Add event listeners to columns
document.querySelectorAll(".column-content").forEach((column) => {
  column.addEventListener("dragover", function (e) {
    e.preventDefault();
    this.classList.add("drag-over");
  });

  column.addEventListener("dragleave", function (e) {
    this.classList.remove("drag-over");
  });

  column.addEventListener("drop", function (e) {
    e.preventDefault();
    this.classList.remove("drag-over");

    const taskId = e.dataTransfer.getData("text/plain");
    const task = document.getElementById(taskId);

    if (!task) return;

    // Find source and destination columns
    const sourceColumnId = task.parentElement.id.replace("-content", "");
    const destColumnId = this.id.replace("-content", "");

    // If same column, do nothing
    if (sourceColumnId === destColumnId) return;

    // Update data model
    const sourceColumn = columns[sourceColumnId];
    const destColumn = columns[destColumnId];

    // Remove from source column
    sourceColumn.taskIds = sourceColumn.taskIds.filter((id) => id !== taskId);

    // Add to destination column
    destColumn.taskIds.push(taskId);

    // Re-render the board
    renderBoard();
  });
});

// Theme toggle functionality
document
  .getElementById("theme-toggle-btn")
  .addEventListener("click", function () {
    const icon = this.querySelector("i");
    if (icon.classList.contains("fa-sun")) {
      icon.classList.remove("fa-sun");
      icon.classList.add("fa-moon");
      document.body.classList.add("dark-theme");
    } else {
      icon.classList.remove("fa-moon");
      icon.classList.add("fa-sun");
      document.body.classList.remove("dark-theme");
    }
  });

// Initialize the board
document.addEventListener("DOMContentLoaded", renderBoard);
