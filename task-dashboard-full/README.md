# Task Dashboard

**Building Claude's Brain Workshop · St. Pete AI**

A task management dashboard built with zero dependencies — vanilla HTML5, CSS3, and ES6+ JavaScript. This is the reference application built during the *Building Claude's Brain* 3-hour workshop.

---

## Quick Start

1. Clone or download this repository
2. Double-click `index.html`
3. That's it — no install, no build step, no server required

---

## Features

- **Three-column board** — To Do, In Progress, Done
- **Task cards** with move and delete actions
- **Add Task modal** — keyboard accessible (Escape to close, Enter to submit)
- **Live header counts** — always shows totals per column
- **Responsive** — works on desktop and mobile
- **Zero dependencies** — no npm, no frameworks, no CDN scripts beyond Google Fonts

---

## File Structure

```
task-dashboard/
├── index.html      # Semantic HTML5 structure
├── styles.css      # All styles — CSS custom properties, Grid, Flexbox
├── app.js          # Vanilla ES6+ — single-responsibility functions
├── CLAUDE.md       # Claude Code configuration (the "constitution")
└── README.md       # This file
```

---

## Code Rules (from CLAUDE.md)

1. Always use semantic HTML5 elements
2. Always write CSS custom properties for colors and spacing
3. Never use inline styles — all styles go in `styles.css`
4. All JavaScript is vanilla — no libraries, no frameworks
5. Every function has a single responsibility

---

## Extending This Project

This app is designed to be extended during the workshop using Claude Code with all 7 layers configured:

```bash
# After configuring your workspace layers, try:
/build-feature Add task priority levels (Low / Medium / High) with color indicators
/build-feature Add local storage persistence so tasks survive page refresh
/build-feature Add task search and filter bar to the header
```

---

## About St. Pete AI

St. Pete AI is a nonprofit community of 300+ practitioners in Saint Petersburg, Florida — and growing online — who are building with AI, not just talking about it.

**stpeteai.org**
