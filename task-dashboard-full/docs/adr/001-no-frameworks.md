# ADR 001: Vanilla JavaScript — No Frameworks

**Status:** Accepted
**Date:** 2025
**Project:** Task Dashboard — St. Pete AI Workshop Reference Build

---

## Context

This application is the reference build for the *Building Claude's Brain* 3-hour workshop, produced by St. Pete AI — a nonprofit community of practitioners in Saint Petersburg, Florida learning to work with AI, not just use it.

The workshop is designed for participants ranging from complete non-developers to experienced engineers. The codebase must serve two masters simultaneously:

1. **It must work** — a functioning task management dashboard that demonstrates all seven layers of the Building Claude's Brain framework activating in real time.
2. **It must teach** — every file must be readable by a first-time developer at midnight. Complexity that cannot be explained in one sentence has no place here.

The central tension: modern JavaScript development leans heavily on frameworks (React, Vue, Svelte) and build tooling (Vite, webpack, esbuild). For an experienced developer, these tools reduce boilerplate and accelerate production. For a workshop participant with no prior development experience, they introduce a wall of abstraction that obscures what the code is actually doing.

---

## Options Considered

**React**
Rejected. Requires Node.js, npm, and a build step before a participant can see anything. Introduces JSX syntax that is unfamiliar to non-developers. The component model, while powerful, adds a layer of indirection between writing code and seeing it run. A participant who can't get the dev server started has failed before the workshop begins.

**Vue**
Rejected. Same reasons as React. Vue's Single File Component format is elegant for developers; it is opaque for learners. The progressive enhancement story is compelling but adds scope to a 3-hour session already packed with content.

**Svelte / SvelteKit**
Rejected. Compile-step required. Smaller community = less help available if a participant gets stuck.

**Vanilla JS (ES6+)**
Accepted. Zero dependencies. Opens by double-clicking `index.html`. Works on any computer made in the last fifteen years, including the lowest-spec laptop a workshop participant might bring. Every function is visible, every style is readable, every behavior is traceable without a debugger extension or dev tools knowledge. The code does exactly what it says.

---

## Decision

All JavaScript in this project is vanilla ES6+. No npm packages. No build steps. No bundlers.

The application must open by double-clicking `index.html` in any modern browser. No server required.

---

## Consequences

**Accepted trade-offs:**
- No component library. All UI components are hand-coded in HTML and CSS.
- State management is manual. A single `tasks` array in `app.js` is the source of truth. No reactive data binding.
- No hot module replacement. Saving a file requires a browser refresh.
- Deployment is drag-and-drop or GitHub Pages. No CI pipeline required.

**Preserved advantages:**
- Zero setup friction for workshop participants.
- Every line of code is readable without tooling knowledge.
- The codebase is a direct demonstration of how Claude Code works — editing real files, producing real output, with no build layer between the AI and the running application.
- Any participant can fork this repo and open it immediately, regardless of their local development environment.

---

## Future Consideration

If this project grows beyond its workshop-demo scope — for example, if St. Pete AI builds a production task management tool for community use — this ADR should be revisited. At that point, React or Vue would be appropriate choices, and this file should be superseded by a new ADR documenting that transition.

Until then: this decision stands.

---

*Architecture Decision Records are living documents. If this decision is superseded, update the Status field to "Superseded by ADR [number]" and create a new ADR explaining the change. Do not delete this file — the history matters.*
