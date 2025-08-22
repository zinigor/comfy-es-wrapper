# Copilot Coding Agent Onboarding Guide
## comfy-es-wrapper Repository

This guide provides comprehensive instructions for GitHub Copilot Coding Agents working on the comfy-es-wrapper repository. It includes step-by-step guidance for setup, build, test, and validation of code changes.

## Project Overview

**comfy-es-wrapper** is a TypeScript/Node.js library that provides an ESM-compatible wrapper for ComfyUI frontend components. It enables easy integration of ComfyUI functionality into modern JavaScript/TypeScript applications.

### Key Technologies
- **Language**: TypeScript
- **Package Manager**: PNPM (primary), npm (fallback)
- **Build System**: Vite + TypeScript
- **Frontend Frameworks**: Vue 3, React support
- **Architecture**: Monorepo with modular exports

## Environment Setup

### Prerequisites
1. **Node.js**: Version 20+ (check with `node --version`)
2. **Package Manager**: PNPM recommended, npm as fallback
3. **Git**: For version control

### Installation Steps

#### Option 1: PNPM (Recommended)
```bash
# Install PNPM if not available
npm install -g pnpm

# Install dependencies
cd /path/to/comfy-es-wrapper
pnpm install
```

#### Option 2: NPM (Fallback)
```bash
cd /path/to/comfy-es-wrapper
npm install
```

**⚠️ Common Installation Issues:**
- ComfyUI frontend dependencies may have installation conflicts
- Playwright browser downloads might fail (can be ignored for most development)
- Some dependencies are marked as deprecated (expected)

## Project Structure

```
comfy-es-wrapper/
├── src/
│   ├── index.ts              # Main entry point - exports all modules
│   ├── editor/
│   │   └── index.ts          # ComfyEditor class for node-based editing
│   ├── components/
│   │   └── index.ts          # Vue component wrappers
│   ├── types/
│   │   ├── index.ts          # Core TypeScript interfaces
│   │   └── comfyui.d.ts      # ComfyUI type definitions
│   └── utils/
│       └── index.ts          # Workflow, node, API, and canvas utilities
├── vite.config.js            # Vite build configuration
├── tsconfig.json             # TypeScript configuration
├── package.json              # Dependencies and scripts
├── pnpm-workspace.yaml       # PNPM workspace configuration
└── pnpm-lock.yaml           # Dependency lock file
```

### Core Modules

1. **Editor** (`src/editor/`): ComfyEditor class for creating node-based workflow editors
2. **Components** (`src/components/`): Vue component wrappers for ComfyUI elements
3. **Types** (`src/types/`): TypeScript interfaces for workflows, nodes, connections
4. **Utils** (`src/utils/`): Helper functions for workflows, nodes, API calls, canvas operations

## Build Commands

### Available Scripts
```bash
# Build the library (ES + CJS formats)
npm run build

# Development build with watch mode
npm run dev

# TypeScript type checking only
npm run typecheck
```

### Build Process
- **Input**: TypeScript files in `src/`
- **Output**: `dist/` directory with:
  - `index.js` (ESM format)
  - `index.cjs` (CommonJS format)
  - `types/` directory with `.d.ts` files
- **Formats**: ES modules and CommonJS for broad compatibility

## Development Workflow

### 1. Before Making Changes
```bash
# Ensure you're in the repository root
cd /home/runner/work/comfy-es-wrapper/comfy-es-wrapper

# Check current status
git status

# Try to build to understand current state
npm run build

# Run type checking
npm run typecheck
```

### 2. Making Code Changes
- **Focus on minimal changes**: Modify only what's necessary
- **Preserve existing interfaces**: Maintain backward compatibility
- **Follow TypeScript patterns**: Use existing type definitions

### 3. Validation Workflow
```bash
# 1. Type checking (fastest validation)
npm run typecheck

# 2. Full build (tests compilation and exports)
npm run build

# 3. Check build output
ls -la dist/
```

## Linting and Code Quality

### TypeScript Configuration
- **Strict mode enabled**: All type checking rules enforced
- **ESNext modules**: Modern JavaScript features supported
- **Vue support**: JSX and Vue SFC files supported
- **Path mapping**: Aliases for ComfyUI imports (`@comfyui/*`, `@/*`)

### Manual Validation
Since automated tests may not be available:
1. Verify TypeScript compilation: `npm run typecheck`
2. Test build output: `npm run build`
3. Check exports in `dist/` directory
4. Validate import/export statements

## Architecture Details

### Module System
The library uses a modular export system:
```typescript
// Main entry (src/index.ts)
export * from './editor'     // ComfyEditor class
export * from './components' // Vue wrappers
export * from './types'      // TypeScript interfaces
export * from './utils'      // Utility functions
```

### Key Components

1. **ComfyEditor**: Canvas-based workflow editor
   - Uses LiteGraph for node editing
   - Supports workflow load/save operations
   - Configurable container and dimensions

2. **Vue Components**: Wrapper for ComfyUI Vue components
   - Pinia store integration
   - Component lifecycle management
   - Dynamic prop updates

3. **Utilities**: Helper functions for:
   - Workflow validation and manipulation
   - Node creation and management
   - API interactions with ComfyUI backend
   - Canvas operations (zoom, fit, center)

### Dependencies

#### Core Dependencies
- **@comfyorg/comfyui-frontend**: Core ComfyUI frontend (GitHub Git dependency - requires network)
- **@comfyorg/litegraph**: Node graph editing library (v0.17.2, marked deprecated but functional)
- **Vue 3**: Primary framework for component system (v3.5.18)
- **React**: Secondary framework support (v19.1.1)
- **Pinia**: Vue state management (v3.0.3)

#### Development Dependencies
- **Vite**: Build tool and dev server (v7.1.2)
- **TypeScript**: Language compiler (v5.9.2)
- **@vitejs/plugin-vue**: Vue SFC support in Vite
- **vite-plugin-dts**: TypeScript declaration generation

#### Peer Dependencies
- **@comfyorg/litegraph**: Must be provided by consuming applications

**⚠️ Dependency Notes:**
- Some dependencies are marked deprecated but are still functional
- ComfyUI frontend is pulled from GitHub, requiring network access
- Installation may show warnings but typically succeeds

## Testing Strategy

### Manual Testing Approach
Since automated tests may not be extensive:
1. **Type Safety**: Use `npm run typecheck` for validation
2. **Build Verification**: Ensure `npm run build` succeeds
3. **Import Testing**: Verify exports work correctly
4. **API Testing**: Check utility functions with sample data

### Validation Checklist
- [ ] TypeScript compilation passes
- [ ] Build generates expected outputs
- [ ] No new TypeScript errors introduced
- [ ] Import/export statements work
- [ ] Existing functionality preserved

## Common Issues and Troubleshooting

### Installation Problems
**Issue**: Dependencies fail to install
**Solution**: 
```bash
# Clear cache and retry
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**Issue**: PNPM not available
**Solution**: Use npm as fallback or install PNPM globally

### Build Issues
**Issue**: `vite: command not found`
**Solution**: Dependencies not installed properly - retry installation

**Issue**: TypeScript errors about missing types
**Solution**: Check if `@types/node` and Vue types are installed

**Issue**: Module resolution errors
**Solution**: Verify path mappings in `tsconfig.json`

### Development Issues
**Issue**: Cannot find ComfyUI modules
**Solution**: ComfyUI frontend dependency uses Git source - network required

**Issue**: Vue component compilation errors
**Solution**: Ensure Vue 3 TypeScript configuration is correct

## Best Practices for Minimal Changes

### Do's ✅
- Modify only necessary files
- Preserve existing function signatures
- Use existing TypeScript interfaces
- Follow established code patterns
- Test changes with `npm run typecheck`
- Validate builds before committing

### Don'ts ❌
- Don't modify `package.json` unless necessary
- Don't change TypeScript configuration without reason
- Don't remove existing exports
- Don't add dependencies for minor changes
- Don't modify Git dependencies

### Change Validation Process
1. **Before changes**: Document current build status
2. **During changes**: Run type checking frequently
3. **After changes**: Full build and validation
4. **Commit**: Only when all validations pass

## Workspace Support

### IDE Configuration
- **VS Code**: TypeScript and Vue extensions recommended
- **Path intellisense**: Configured via `tsconfig.json` paths
- **Auto-imports**: Should work with module exports

### Debugging
- Use TypeScript compiler for error reporting
- Build logs provide detailed error information
- Vue devtools for component debugging (in browser)

## Practical Examples

### Example 1: Adding a New Utility Function
```typescript
// File: src/utils/index.ts
export const myNewUtil = {
  validateNodeType(nodeType: string): boolean {
    // Implementation here
    return nodeType && nodeType.length > 0
  }
}
```

**Validation Steps:**
1. `npm run typecheck` - Verify TypeScript compilation
2. `npm run build` - Ensure export works
3. Check `dist/types/utils.d.ts` contains new function

### Example 2: Extending an Interface
```typescript
// File: src/types/index.ts
export interface ComfyNode {
  id: string
  type: string
  pos: [number, number]
  size?: [number, number]
  properties: Record<string, any>
  inputs?: ComfyInput[]
  outputs?: ComfyOutput[]
  // New optional property
  metadata?: Record<string, any>
}
```

**Validation Steps:**
1. `npm run typecheck` - Check for breaking changes
2. Verify existing code still compiles
3. Build successfully generates updated type definitions

### Example 3: Fixing a Build Issue
```bash
# If you encounter "Cannot find module" errors:
1. Check import paths in the failing file
2. Verify the module exists in src/
3. Ensure proper export in index.ts files
4. Run: npm run typecheck --listFiles (to see all included files)
```

## Quick Reference

### Essential Commands
```bash
# Setup
npm install

# Development
npm run typecheck  # Quick validation
npm run build      # Full build
npm run dev        # Watch mode

# Validation
ls dist/           # Check build output
git status         # Check file changes
```

### Key Files to Understand
- `src/index.ts`: Main exports (17 lines)
- `src/utils/index.ts`: Largest module (261 lines)
- `src/types/index.ts`: Core interfaces (75 lines)
- `src/editor/index.ts`: Editor component (41 lines)
- `src/components/index.ts`: Vue wrappers (52 lines)
- `vite.config.js`: Build configuration
- `tsconfig.json`: TypeScript settings
- `package.json`: Dependencies and scripts

### File Size Reference
Understanding the relative complexity of each module:
- **utils** (261 lines): Workflow, node, API, and canvas utilities
- **types** (75 lines): TypeScript interfaces and type definitions  
- **components** (52 lines): Vue component wrappers with Pinia
- **editor** (41 lines): ComfyEditor class using LiteGraph
- **index** (17 lines): Main entry point with re-exports

### Support
For questions about this repository's architecture or build system, refer to:
- Package.json scripts section
- TypeScript configuration  
- Vite.js documentation
- ComfyUI frontend repository

---

## Additional Resources

### Documentation Links
- [Vite Documentation](https://vitejs.dev/) - Build tool configuration
- [TypeScript Handbook](https://www.typescriptlang.org/docs/) - Language reference
- [Vue 3 Documentation](https://vuejs.org/) - Component framework
- [PNPM Documentation](https://pnpm.io/) - Package manager

### Repository Specific
- ComfyUI Frontend: Check the GitHub dependency for upstream changes
- LiteGraph: Node-based graph editing library documentation

### Troubleshooting Resources
If you encounter issues not covered in this guide:
1. Check the repository's GitHub Issues
2. Verify Node.js and package manager versions
3. Try clearing caches (`npm cache clean --force`)
4. Use npm instead of PNPM if installation fails

**Remember**: This is a wrapper library - changes should focus on improving the wrapping functionality rather than modifying core ComfyUI behavior.