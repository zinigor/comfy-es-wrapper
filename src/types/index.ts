// Core ComfyUI types
export interface ComfyWorkflow {
  nodes: ComfyNode[]
  connections: ComfyConnection[]
  metadata?: {
    version: string
    created: string
    modified: string
  }
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

// Editor configuration types
export interface ComfyTheme {
  name: 'dark' | 'light' | 'custom'
  colors: {
    background: string
    node: string
    connection: string
    text: string
  }
}

export interface ComfySettings {
  theme: ComfyTheme
  gridSize: number
  snapToGrid: boolean
  showMinimap: boolean
  autoSave: boolean
}

// Event types
export interface ComfyEditorEvents {
  workflowChange: (workflow: ComfyWorkflow) => void
  nodeSelect: (node: ComfyNode) => void
  nodeAdd: (node: ComfyNode) => void
  nodeDelete: (nodeId: string) => void
  connectionAdd: (connection: ComfyConnection) => void
  connectionDelete: (connection: ComfyConnection) => void
}

// Re-export LiteGraph types if needed
export type { LGraphNode, LGraph, LGraphCanvas } from '@comfyorg/litegraph'
