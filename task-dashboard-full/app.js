/**
 * Task Dashboard — app.js
 * St. Pete AI · Building Claude's Brain Workshop
 *
 * Rules enforced:
 *   ✓ Vanilla JavaScript — no libraries, no frameworks
 *   ✓ Every function has a single responsibility
 *   ✓ ES6+: arrow functions, template literals, const/let
 *   ✓ No inline styles — all styling via CSS classes
 */

/* ── Constants ─────────────────────────────────────────── */

const COLUMNS = ['todo', 'inprogress', 'done'];

const COLUMN_CONFIG = {
  todo:       { label: 'To Do',       nextColumn: 'inprogress', moveLabel: 'Start →' },
  inprogress: { label: 'In Progress', nextColumn: 'done',       moveLabel: 'Complete →' },
  done:       { label: 'Done',        nextColumn: null,         moveLabel: null },
};

/* ── State ─────────────────────────────────────────────── */

let tasks = [
  { id: generateId(), title: 'Create project CLAUDE.md',    column: 'todo' },
  { id: generateId(), title: 'Configure .claude/settings.json', column: 'todo' },
  { id: generateId(), title: 'Register GitHub MCP server',  column: 'todo' },
  { id: generateId(), title: 'Build Developer sub-agent',   column: 'inprogress' },
  { id: generateId(), title: 'Set up Knowledge Base (ADRs)', column: 'inprogress' },
  { id: generateId(), title: 'Install Claude Code',         column: 'done' },
  { id: generateId(), title: 'Attend Building Claude\'s Brain workshop', column: 'done' },
];

let nextId = tasks.length + 1;

/* ── ID Generation ─────────────────────────────────────── */

function generateId() {
  return `task-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

/* ── DOM Helpers ───────────────────────────────────────── */

const getElement = (id) => document.getElementById(id);

const getTaskList = (column) => getElement(`list-${column}`);

const getColumnCount = (column) => getElement(`col-count-${column}`);

const getHeaderCount = (column) => getElement(`num-${column}`);

const getEmptyState = (column) => getElement(`empty-${column}`);

/* ── Task Queries ──────────────────────────────────────── */

const getTasksByColumn = (column) => tasks.filter((t) => t.column === column);

const getTaskById = (id) => tasks.find((t) => t.id === id);

const countByColumn = (column) => getTasksByColumn(column).length;

/* ── Task Mutations ────────────────────────────────────── */

const addTask = (title) => {
  const task = { id: generateId(), title: title.trim(), column: 'todo' };
  tasks = [...tasks, task];
  return task;
};

const moveTask = (id) => {
  const task = getTaskById(id);
  if (!task) return;
  const next = COLUMN_CONFIG[task.column].nextColumn;
  if (!next) return;
  tasks = tasks.map((t) => (t.id === id ? { ...t, column: next } : t));
};

const deleteTask = (id) => {
  tasks = tasks.filter((t) => t.id !== id);
};

/* ── Card DOM Builder ──────────────────────────────────── */

const createMoveButton = (task) => {
  const config = COLUMN_CONFIG[task.column];
  if (!config.moveLabel) return null;

  const btn = document.createElement('button');
  btn.className = 'btn-move';
  btn.type = 'button';
  btn.setAttribute('aria-label', `Move "${task.title}" to ${COLUMN_CONFIG[config.nextColumn].label}`);
  btn.textContent = config.moveLabel;
  btn.addEventListener('click', () => handleMoveTask(task.id));
  return btn;
};

const createDeleteButton = (task) => {
  const btn = document.createElement('button');
  btn.className = 'btn-delete';
  btn.type = 'button';
  btn.setAttribute('aria-label', `Delete "${task.title}"`);
  btn.textContent = '✕';
  btn.addEventListener('click', () => handleDeleteTask(task.id));
  return btn;
};

const createTaskActions = (task) => {
  const actions = document.createElement('div');
  actions.className = 'task-actions';

  const moveBtn = createMoveButton(task);
  if (moveBtn) actions.appendChild(moveBtn);
  actions.appendChild(createDeleteButton(task));
  return actions;
};

const createTaskBody = (task) => {
  const body = document.createElement('div');
  body.className = 'task-body';

  const title = document.createElement('p');
  title.className = 'task-title';
  title.textContent = task.title;

  body.appendChild(title);
  return body;
};

const createTaskCard = (task) => {
  const li = document.createElement('li');
  li.className = `task-card${task.column === 'done' ? ' is-done' : ''}`;
  li.dataset.taskId = task.id;
  li.setAttribute('role', 'listitem');

  li.appendChild(createTaskBody(task));
  li.appendChild(createTaskActions(task));
  return li;
};

/* ── Column Render ─────────────────────────────────────── */

const renderColumn = (column) => {
  const list = getTaskList(column);
  const columnTasks = getTasksByColumn(column);
  const empty = getEmptyState(column);

  list.innerHTML = '';
  columnTasks.forEach((task) => list.appendChild(createTaskCard(task)));

  if (empty) {
    empty.classList.toggle('hidden', columnTasks.length > 0);
  }
};

const renderAllColumns = () => {
  COLUMNS.forEach(renderColumn);
};

/* ── Count Updates ─────────────────────────────────────── */

const updateColumnCount = (column) => {
  const count = countByColumn(column);
  const colCount = getColumnCount(column);
  const headerCount = getHeaderCount(column);

  if (colCount) colCount.textContent = count;
  if (headerCount) headerCount.textContent = count;
};

const updateAllCounts = () => {
  COLUMNS.forEach(updateColumnCount);
};

/* ── Full Re-render ────────────────────────────────────── */

const render = () => {
  renderAllColumns();
  updateAllCounts();
};

/* ── Modal State ───────────────────────────────────────── */

const getModal = () => getElement('modal-overlay');

const openModal = () => {
  const modal = getModal();
  modal.hidden = false;
  clearFormError();
  clearFormInput();
  focusInput();
};

const closeModal = () => {
  const modal = getModal();
  modal.hidden = true;
  clearFormInput();
  clearFormError();
};

const clearFormInput = () => {
  const input = getElement('task-title-input');
  if (input) input.value = '';
};

const focusInput = () => {
  requestAnimationFrame(() => {
    const input = getElement('task-title-input');
    if (input) input.focus();
  });
};

/* ── Form Validation ───────────────────────────────────── */

const showFormError = () => {
  const err = getElement('form-error');
  const input = getElement('task-title-input');
  if (err) err.hidden = false;
  if (input) input.classList.add('is-invalid');
};

const clearFormError = () => {
  const err = getElement('form-error');
  const input = getElement('task-title-input');
  if (err) err.hidden = true;
  if (input) input.classList.remove('is-invalid');
};

const getInputValue = () => {
  const input = getElement('task-title-input');
  return input ? input.value.trim() : '';
};

const isInputValid = () => getInputValue().length > 0;

/* ── Event Handlers ────────────────────────────────────── */

const handleAddButtonClick = () => {
  openModal();
};

const handleCloseButtonClick = () => {
  closeModal();
};

const handleCancelButtonClick = () => {
  closeModal();
};

const handleOverlayClick = (event) => {
  if (event.target === getModal()) closeModal();
};

const handleKeydown = (event) => {
  if (event.key === 'Escape' && !getModal().hidden) closeModal();
};

const handleFormSubmit = (event) => {
  event.preventDefault();
  if (!isInputValid()) {
    showFormError();
    return;
  }
  addTask(getInputValue());
  closeModal();
  render();
};

const handleMoveTask = (id) => {
  moveTask(id);
  render();
};

const handleDeleteTask = (id) => {
  deleteTask(id);
  render();
};

const handleInputChange = () => {
  if (isInputValid()) clearFormError();
};

/* ── Event Binding ─────────────────────────────────────── */

const bindOpenButton = () => {
  const btn = getElement('btn-open-modal');
  if (btn) btn.addEventListener('click', handleAddButtonClick);
};

const bindCloseButton = () => {
  const btn = getElement('btn-close-modal');
  if (btn) btn.addEventListener('click', handleCloseButtonClick);
};

const bindCancelButton = () => {
  const btn = getElement('btn-cancel');
  if (btn) btn.addEventListener('click', handleCancelButtonClick);
};

const bindOverlayClick = () => {
  const overlay = getModal();
  if (overlay) overlay.addEventListener('click', handleOverlayClick);
};

const bindKeyboard = () => {
  document.addEventListener('keydown', handleKeydown);
};

const bindForm = () => {
  const form = getElement('task-form');
  if (form) form.addEventListener('submit', handleFormSubmit);
};

const bindInputChange = () => {
  const input = getElement('task-title-input');
  if (input) input.addEventListener('input', handleInputChange);
};

const bindAllEvents = () => {
  bindOpenButton();
  bindCloseButton();
  bindCancelButton();
  bindOverlayClick();
  bindKeyboard();
  bindForm();
  bindInputChange();
};

/* ── Init ──────────────────────────────────────────────── */

const init = () => {
  bindAllEvents();
  render();
};

document.addEventListener('DOMContentLoaded', init);
