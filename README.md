# comfy-es-wrapper

**Comfy-ES-Wrapper** is a frontend wrapper for ComfyUI, designed to provide ESM (ECMAScript Modules) imports and utilities for building, editing, and interacting with ComfyUI workflows in modern web applications. It offers a modular API for workflow and node manipulation, as well as integrations for Vue and React.

---

## Features

- **Workflow utilities:** Validate, convert, optimize, serialize, and deserialize ComfyUI workflows.
- **Node utilities:** Create, configure, and connect workflow nodes with type safety.
- **API utilities:** Fetch node types, execute workflows, monitor queue status, retrieve workflow history, and manage real-time WebSocket connections.
- **Editor Component:** Provides a `ComfyEditor` class for embedding and manipulating workflow graphs with ease.
- **Vue & React adapters:** Includes example wrappers for integration with popular frameworks.

---

## API Reference

### Workflow Utilities

```typescript
import { workflowUtils } from 'comfy-es-wrapper'
// or default import

const isValid = workflowUtils.validateWorkflow(workflow)
const optimized = workflowUtils.optimizeWorkflow(workflow)
const serialized = workflowUtils.serializeWorkflow(workflow)
const deserialized = workflowUtils.deserializeWorkflow(workflowString)
const nodes = workflowUtils.getWorkflowNodes(workflow)
const connections = workflowUtils.getWorkflowConnections(workflow)
```

### Node Utilities

```typescript
import { nodeUtils } from 'comfy-es-wrapper'

const node = nodeUtils.createNode('CustomType', { properties: { foo: 'bar' } })
const id = nodeUtils.generateNodeId()
nodeUtils.setNodeProperty(node, 'foo', 'baz')
const fooValue = nodeUtils.getNodeProperty(node, 'foo')
```

### API Utilities

```typescript
import { apiUtils } from 'comfy-es-wrapper'

const nodeTypes = await apiUtils.fetchNodeTypes()
const result = await apiUtils.executeWorkflow(workflow)
const queue = await apiUtils.getQueueStatus()
const history = await apiUtils.getHistory()
const ws = apiUtils.createWebSocketConnection((data) => { /* handle messages */ })
```

### Editor Integration

#### With Vanilla JS

```typescript
import { ComfyEditor } from 'comfy-es-wrapper'

const config = { container: document.getElementById('editor-container') }
const editor = new ComfyEditor(config)
editor.loadWorkflow(workflow)
const current = editor.getWorkflow()
editor.destroy()
```

#### With React

```tsx
import { ComfyEditorReact } from 'comfy-es-wrapper'

function MyComponent() {
  return (
    <ComfyEditorReact 
      className="editor"
      style={{ width: '100%', height: '600px' }}
      config={{ /* editor config */ }}
    />
  )
}
```

#### With Vue

```typescript
// Import Vue components (see src/components/index.ts)
// import NodeEditor from 'comfy-es-wrapper/components/NodeEditor.vue'
```

---

## Types

The package provides comprehensive TypeScript types for ComfyUI workflows and nodes:

```typescript
export interface ComfyWorkflow {
  nodes: ComfyNode[]
  connections: ComfyConnection[]
  metadata?: { version: string; created: string; modified: string }
}

export interface ComfyNode {
  id: string
  type: string
  pos: [number, number]
  size?: [number, number]
  properties: Record<string, any>
  inputs?: ComfyInput[]
  outputs?: ComfyOutput[]
}

export interface ComfyConnection {
  from: {
    nodeId: string
    outputIndex: number
  }
  to: {
    nodeId: string
    inputIndex: number
  }
}

export interface ComfyInput {
  name: string
  type: string
  required?: boolean
  defaultValue?: any
}

export interface ComfyOutput {
  name: string
  type: string
}
```

---

## Usage Example

```typescript
import { workflowUtils, nodeUtils, apiUtils, ComfyEditor } from 'comfy-es-wrapper'

// Build a simple workflow
const nodeA = nodeUtils.createNode('Input')
const nodeB = nodeUtils.createNode('Output')

const workflow = {
  nodes: [nodeA, nodeB],
  connections: [
    {
      from: { nodeId: nodeA.id, outputIndex: 0 },
      to: { nodeId: nodeB.id, inputIndex: 0 }
    }
  ]
}

const isValid = workflowUtils.validateWorkflow(workflow)

// Execute the workflow
apiUtils.executeWorkflow(workflow).then(result => {
  if (result.success) {
    console.log('Execution result:', result.data)
  } else {
    console.error('Workflow error:', result.error)
  }
})
```

---

## License

Distributed under the terms of the GNU General Public License (see LICENSE file for details).
