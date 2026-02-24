# Contributing to @mookielianhd/n8n-nodes-instagram

Thank you for contributing to this project. This package provides Instagram integration for n8n, including publishing media, managing comments, sending messages, and interacting with the Instagram Graph API.

Please follow these guidelines to ensure contributions remain stable, consistent, and easy to review.

---

# Development setup

## Requirements

You must have:

* Node.js >= 22
* npm >= 9
* n8n >= 2.0
* Git

Install n8n globally if needed:

`npm install -g n8n`

---

## Clone and install

`git clone https://github.com/mookielianhd/n8n-nodes-instagram.git`
`cd n8n-nodes-instagram`
`npm install`

---

## Build

`npm run build`

---

## Development mode (watch)

`npm run dev`

This automatically rebuilds when files change.

---

## Link to local n8n

`npm link`

Create custom folder if it doesn't exist:

`mkdir -p ~/.n8n/custom`

Link package:

`cd ~/.n8n/custom`
`npm link @mookielianhd/n8n-nodes-instagram`

Start n8n:

`n8n start`

The node should now appear inside the editor.

---

# Project structure

Typical layout:

.
├── nodes/
├── credentials/
├── dist/                (generated, do not edit)
├── package.json
├── tsconfig.json
├── README.md

Rules:

* Edit only files inside `/nodes` and `/credentials`
* Never edit `/dist`
* Always rebuild after changes

---

# Development workflow

Create feature branch:

`git checkout -b feature/your-feature-name`

Install and build:

`npm install`
`npm run build`

Run dev mode:

`npm run dev`

Test inside n8n before submitting pull request.

---

# Code guidelines

General rules:

* Use TypeScript
* Follow existing structure and patterns
* Avoid breaking changes
* Keep changes minimal and focused
* Maintain backward compatibility when possible

---

## Naming conventions

Good examples:

`Instagram.node.ts`
`InstagramApi.credentials.ts`

Bad examples:

`node.ts`
`insta.ts`

---

## Error handling

Always use proper n8n error handling:

Good:

`throw new NodeApiError(this.getNode(), error);`

Bad:

`throw error;`

---

# Adding features

Allowed contributions:

* New Instagram API endpoints
* New node operations
* Bug fixes
* Performance improvements
* Documentation improvements

Not allowed:

* Breaking changes without discussion
* Editing generated dist files
* Unrelated refactors

---

# Testing

Before submitting pull request:

Build project:

`npm run build`

Test inside n8n and verify:

* Node loads correctly
* Credentials work
* Operations work correctly
* No runtime errors

---

# Pull request guidelines

Before submitting:

* Ensure project builds successfully
* Test feature locally
* Include only relevant changes
* Do not include dist edits manually

---

## Commit message format

Good examples:

`feat: add media publish operation`
`fix: correct container polling logic`
`docs: update credential instructions`

Bad examples:

`update`
`fix stuff`
`changes`

---

## Pull request must include

* Clear description
* Reason for change
* Steps to test

---

# Reporting issues

Include:

* n8n version
* package version
* Node.js version
* error message
* reproduction steps

Example:

n8n version: `2.9.2`
package version: `2.6.1`

Error: media publish fails with invalid container status

---

# Code of conduct

Be respectful and constructive when contributing.

---

# Questions and discussions

Open an issue for:

* Feature requests
* Bug reports
* Architecture discussion
* Breaking change proposals