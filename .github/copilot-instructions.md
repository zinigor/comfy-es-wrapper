# ComfyUI ES Wrapper Library

ComfyUI ES Wrapper is a TypeScript library that provides ESM-compatible wrappers for ComfyUI frontend components, built with Vite and supporting both Vue and React ecosystems.

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Working Effectively

### Bootstrap, build, and test the repository:
- Environment setup: Node.js v20+ and npm v10+
- **CRITICAL**: Install dependencies with `PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 npm install` -- Required due to ComfyUI frontend dependency issues with Playwright browser downloads
- Run type checking: `npm run typecheck` -- takes ~2 seconds, NEVER CANCEL, set timeout to 30+ seconds
- Build the library: `npm run build` -- takes ~3 seconds, NEVER CANCEL, set timeout to 60+ seconds  
- Check for vulnerabilities: `npm audit` (typically clean on fresh installs)

### Development workflow:
- **ALWAYS** run the bootstrapping steps first before making any changes
- Watch mode for development: `npm run dev` -- runs Vite build in watch mode
- Type checking: `npm run typecheck` -- validates TypeScript without emitting files

### Build outputs:
- The build creates dual package (ESM + CJS) with TypeScript declarations in `dist/`
- Main exports: `dist/index.js` (ESM), `dist/index.cjs` (CommonJS), `dist/index.d.ts` (types)
- Component-specific exports: `dist/editor.js`, `dist/components.js` with corresponding .cjs and .d.ts files

## Validation

### Build validation:
- ALWAYS validate that imports work correctly after changes by testing: `node -e "import('file://$(pwd)/dist/index.js').then(m => console.log(Object.keys(m)))"`
- Expected exports: ComfyEditor, ComfyVueWrapper, apiUtils, canvasUtils, checkCompatibility, loadStyles, nodeUtils, workflowUtils
- ALWAYS run `npm run typecheck` before committing to ensure TypeScript correctness

### Manual testing scenarios:
- Test basic import: Verify all main exports are available and of correct types (functions/objects)
- The library provides wrappers for ComfyUI but cannot be functionally tested without a ComfyUI backend
- React adapter testing: Check that React component wrapper exists at `src/adapters/adapter-react.tsx`

### Before committing:
- ALWAYS run `npm audit` and fix any vulnerabilities with `npm audit fix` if needed
- ALWAYS run `npm run typecheck` to validate TypeScript
- ALWAYS run `npm run build` to ensure clean build
- Verify the build succeeded by checking `dist/` directory contains expected files

## Common tasks

The following are outputs from frequently run commands. Reference them instead of viewing, searching, or running bash commands to save time.

### Repository root structure
```
ls -la
.git/            .gitignore       LICENSE          README.md        
package-lock.json package.json     pnpm-lock.yaml   pnpm-workspace.yaml
src/             tsconfig.json    vite.config.js
```

### Source structure  
```
src/
├── adapters/           # Framework adapters (React, etc.)
├── assets/            # CSS and static assets
├── components/        # Vue component wrappers
├── editor/           # Main ComfyUI editor wrapper
├── types/            # TypeScript type definitions
├── utils/            # Utility functions and helpers
└── index.ts          # Main entry point
```

### package.json scripts
```json
{
  "build": "vite build",
  "dev": "vite build --watch", 
  "typecheck": "tsc --noEmit"
}
```

### Key dependencies
- **Peer**: @comfyorg/litegraph (^0.7.0)
- **Runtime**: @comfyorg/comfyui-frontend, vue, react, pinia
- **Dev**: vite, typescript, @vitejs/plugin-vue, vite-plugin-dts

### Installation command that works
```bash
PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 npm install
```

### Typical build output
```
vite v7.1.3 building for production...
transforming...
✓ 5 modules transformed.
rendering chunks...
[vite:dts] Start generate declaration files...
computing gzip size...
dist/components.js  0.56 kB │ gzip: 0.28 kB
dist/editor.js      0.57 kB │ gzip: 0.32 kB  
dist/index.js       4.41 kB │ gzip: 1.67 kB
[vite:dts] Declaration files built in 1643ms.
dist/editor.cjs      0.50 kB │ gzip: 0.32 kB
dist/components.cjs  0.52 kB │ gzip: 0.30 kB
dist/index.cjs       3.33 kB │ gzip: 1.51 kB
✓ built in 1.78s
```

## Project Structure and Navigation

### Key files to know:
- `src/index.ts` - Main library entry point, exports all public APIs
- `src/editor/index.ts` - ComfyEditor class, main wrapper for ComfyUI canvas
- `src/components/index.ts` - Vue component wrappers and factories
- `src/adapters/adapter-react.tsx` - React adapter for ComfyEditor
- `src/types/index.ts` - TypeScript interfaces for ComfyUI types
- `src/utils/index.ts` - Utility functions for workflows, nodes, API, canvas
- `vite.config.js` - Build configuration with dual package setup
- `tsconfig.json` - TypeScript configuration with ComfyUI path aliases

### Common editing patterns:
- When adding new functionality, update both the implementation and the corresponding export in `src/index.ts`
- Always check `src/types/index.ts` when working with ComfyUI types
- React integrations go in `src/adapters/`, Vue integrations in `src/components/`

## Important Notes

### Package manager:
- Use **npm** for all commands, not pnpm (despite presence of pnpm lock files)
- The project has both npm and pnpm lock files but npm is the working package manager

### Dependencies and external packages:
- **CRITICAL**: Installation requires `PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1` environment variable
- The @comfyorg/litegraph dependency is deprecated but required for functionality
- ComfyUI frontend is installed from GitHub, not npm registry

### Build system specifics:
- Vite-based with plugin for TypeScript declarations
- Builds both ESM and CommonJS formats
- External dependencies (Vue, React, LiteGraph) are not bundled
- CSS files are copied from ComfyUI frontend during build

### No testing infrastructure:
- This project currently has no test suite or testing framework
- Validation relies on build success and manual import testing
- Do not add testing frameworks unless specifically requested

### Security considerations:
- Check `npm audit` for vulnerabilities (typically clean on fresh installs)
- Dependencies include deprecated packages that are still functional (@comfyorg/litegraph)