# Task Dashboard — Claude Code Configuration

*St. Pete AI · Building Claude's Brain Workshop*

---

## About This Project

This is a task management web application built with vanilla HTML, CSS, and JavaScript.

The app provides a dashboard view of tasks with status tracking (To Do, In Progress, Done).

Users can add tasks, move them between columns, and see a summary count at the top.

**Stack:** HTML5, CSS3 (CSS Grid/Flexbox), vanilla JavaScript (ES6+), no frameworks.

This project is the reference build for the *Building Claude's Brain* 3-hour workshop produced by **St. Pete AI** — a nonprofit community of 300+ practitioners in Saint Petersburg, Florida building with AI, not just talking about it. Every file in this repository is also a teaching artifact. Write code that earns its place.

---

## Non-Negotiable Rules

1. Always use semantic HTML5 elements (`header`, `main`, `section`, `article`, `footer`).
2. Always write CSS custom properties (variables) for colors and spacing.
3. Never use inline styles. All styles go in `styles.css`.
4. All JavaScript is vanilla — no libraries, no frameworks.
5. Every function must have a single responsibility.

---

## Tech Stack

- **HTML5** (`index.html`) — semantic structure only
- **CSS3** (`styles.css`) — CSS Grid for board layout, Flexbox for components
- **JavaScript ES6+** (`app.js`) — arrow functions, template literals, const/let

---

## Layer Map

Every layer of the Building Claude's Brain framework is configured and committed to this repository.

| Layer | Location | Purpose |
|-------|----------|---------|
| 1. Constitution | CLAUDE.md | This file — rules, identity, architecture |
| 2. Settings | .claude/settings.json | Model selection, tool permissions |
| 3. MCP Servers | Registered in settings | GitHub connectivity |
| 4. Sub-Agents | .claude/agents/ | Developer and QA specialists |
| 5. Knowledge Base | docs/adr/ | Architecture decisions |
| 6. Slash Commands | .claude/commands/ | /build-feature pipeline |
| 7. Skills | .claude/skills/ | Auto-QA on every JS edit |

---

## Architecture Decisions

- **No frameworks** — zero dependencies, opens by double-clicking index.html. See docs/adr/001-no-frameworks.md.
- **No build step** — no npm, no webpack, no bundler. Pure browser-native.
- **Single source of truth** — all task state lives in the tasks array in app.js.
- **CSS-only animations** — all transitions and animations use CSS. No JS animation libraries.

---

## Memory

*Update this section at the end of significant working sessions.*

- Initial build complete: dashboard with three columns, task cards with move/delete, Add Task modal, header counts, keyboard accessibility, responsive layout, and seeded example tasks themed around the workshop layers.
- All seven framework layers are configured and committed.

---

*stpeteai.org*
