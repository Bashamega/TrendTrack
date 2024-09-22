# Contributing to TrendTrack

Thank you for considering contributing to TrendTrack! We welcome all forms of contributions, including bug fixes, feature requests, documentation updates, and code improvements. This guide will help you get started.

## Table of Contents

- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
- [Code Style](#code-style)
- [Commit Messages](#commit-messages)
- [Submitting a Pull Request](#submitting-a-pull-request)
- [Reporting Issues](#reporting-issues)

## Getting Started

### 1. Fork the repository

1. Fork the [TrendTrack repository](https://github.com/Bashamega/TrendTrack).
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/TrendTrack.git
   ```

### 2. Install dependencies

We use `npm` for managing dependencies. To install the project's dependencies, run the following command:

```bash
npm install
```

### 3. Running the app locally

After installing the dependencies, you can start the development server:

```bash
npm run dev
```

The app will be accessible at `http://localhost:3000`.

### 4. Branching

Before making changes, ensure you're working on a new branch. The branch name should reflect the issue or feature you're working on. For example:

```bash
git checkout -b feature/new-feature
```

## How to Contribute

1. Look for issues labeled with `status: ready for dev`. These are tasks that are prepared and ready for implementation.
2. If you're working on an existing issue, assign it to yourself or leave a comment to avoid duplication of work.
3. For new features or enhancements, please discuss them by creating an issue before starting any major work.

## Code Style

- Follow the existing code style and structure.
- Use [ESLint](https://eslint.org/) to lint your code:
  ```bash
  npm run lint
  ```
- Format your code with [Prettier](https://prettier.io/):
  ```bash
  npm run format:write
  ```

## Commit Messages

Use clear and concise commit messages. Follow the format:

```
<type>(<scope>): <subject>
```

For example:

```
feat(navbar): add responsive design to the navigation bar
```

## Submitting a Pull Request

1. Push your branch to your fork:
   ```bash
   git push origin feature/new-feature
   ```
2. Create a pull request (PR) from your fork's branch to the `main` branch of the [TrendTrack repository](https://github.com/Bashamega/TrendTrack).
3. Ensure your PR description includes:
   - A clear summary of the changes.
   - Links to related issues if applicable.

## Reporting Issues

If you encounter bugs or have feature suggestions, please create an issue on the repository. Use a descriptive title and provide as much detail as possible to help us resolve the issue.

### Labels

Look for labels such as `bug`, `enhancement`, and `status: ready for dev` to guide your contribution.

Thank you for your contributions!
