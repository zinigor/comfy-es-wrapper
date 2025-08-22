# Copilot Coding Agent Onboarding Instructions

This document provides essential instructions for coding agents working on this repository. It is intended to dramatically reduce exploration overhead, minimize build/test failures, and ensure your code changes meet the validation and CI requirements.

---

## High-Level Repository Overview

- **Repository Purpose**:  
  `comfy-es-wrapper` appears to be a wrapper or integration layer, likely for Elasticsearch or a related system, designed to work within a TypeScript/JavaScript ecosystem. The exact functional details are minimal in the README, so consult source files in `src/` for implementation specifics.

- **Type & Size**:  
  - Multi-language monorepo, JavaScript/TypeScript.
  - Small-to-medium size (typical for wrapper packages).

- **Main Languages, Frameworks, Runtimes**:  
  - TypeScript (primary)
  - Node.js (runtime)
  - Vite (build tool)
  - PNPM (package manager)
  - Some configuration for workspace and locking files

---

## Build and Validation Instructions

**Always follow these steps in order to avoid build or validation failures:**

### 1. Environment Setup

- **Node.js Required**: Use Node.js version 18.x or higher for best compatibility.
- **Install PNPM**:  
  ```bash
  npm install -g pnpm
  ```
- **Install Dependencies**:  
  ```bash
  pnpm install
  ```
  *Always run this before any build or test step. Skipping this leads to build failures and missing dependencies.*

### 2. Bootstrap & Build

- **Build the Project**:  
  ```bash
  pnpm build
  ```
  *If pnpm build fails, ensure all dependencies are installed and Node version is correct. Building typically uses Vite (see `vite.config.js`).*

### 3. Test

- **Run Tests**:  
  ```bash
  pnpm test
  ```
  *If no test script is defined in `package.json`, verify presence and script name in the file; some repos use `pnpm run test` or similar variants.*

### 4. Lint

- **Lint the Codebase**:  
  ```bash
  pnpm lint
  ```
  *Linting configuration is typically in `.eslintrc`, or in `package.json`.*

### 5. Workspace/Monorepo Support

- For workspace operations, see `pnpm-workspace.yaml`.  
  *If you get workspace errors, ensure you are running all commands from the root directory.*

### 6. Cleaning

- **Clean Build Artifacts** (if needed):  
  ```bash
  pnpm clean
  ```
  *If this script does not exist, manually delete `dist/` or build output directories.*

### 7. Manual Validation

- **Post-build**:  
  - Check contents of the build directory (`dist/` or similar).
  - Run tests after any code change to validate correctness.

---

## Project Layout & Architecture

**Key Files & Directories:**

- `src/` — Main source code directory.
- `README.md` — Contains a short description. Refer to source code for details.
- `package.json`, `pnpm-lock.yaml`, `pnpm-workspace.yaml` — Dependency and workspace management.
- `tsconfig.json` — TypeScript configuration.
- `vite.config.js` — Vite build configuration.
- `.gitignore` — Files/directories to ignore in git.
- `LICENSE` — License details.

**Root File List:**  
- .gitignore  
- LICENSE  
- README.md  
- package-lock.json  
- package.json  
- pnpm-lock.yaml  
- pnpm-workspace.yaml  
- src/  
- tsconfig.json  
- vite.config.js  

**Configuration:**  
- All core build/test/lint scripts are expected in `package.json`.
- TypeScript settings: see `tsconfig.json`.
- Vite build config: see `vite.config.js`.
- Workspace configuration: see `pnpm-workspace.yaml`.

**Continuous Integration & Validation:**

- No explicit `.github/workflows` detected, but always check for CI in the repo for additional checks.
- Manual validation: Always run build, test, and lint locally before pushing or opening a PR.
- If in doubt, run all scripts in `package.json` to ensure validation.

---

## Additional Guidance

- **Trust these instructions.** Only perform additional exploration if you encounter errors or missing information.
- **If a command fails**:  
  - Check for missing dependencies (run `pnpm install`).
  - Verify your Node.js version.
  - Review the relevant config file for missing scripts or options.
- **To find main logic**: Start in `src/` directory; it contains the core implementation.
- **For edge cases or uncertainty**: Consult README.md and source files in `src/` for more details.

---

*Following these steps will minimize failed PRs, build/test errors, and reduce unnecessary exploration. If in doubt, validate with the build and test commands above before submitting changes.*
