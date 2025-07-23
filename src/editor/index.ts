import { LGraph, LGraphCanvas, LGraphNode } from '@comfyorg/litegraph'
import type { ComfyApp } from '@comfyui/scripts/app'

export interface ComfyEditorConfig {
  container: HTMLElement
  width?: number
  height?: number
  onWorkflowChange?: (workflow: any) => void
  onNodeSelect?: (node: LGraphNode) => void
  theme?: 'dark' | 'light'
}

export class ComfyEditor {
  private graph: LGraph
  private canvas: LGraphCanvas
  private container: HTMLElement
  private config: ComfyEditorConfig

  constructor(config: ComfyEditorConfig) {
    this.config = config
    this.container = config.container
    this.setupCanvas()
    this.setupEventListeners()
  }

  private setupCanvas() {
    // Create canvas element
    const canvas = document.createElement('canvas')
    canvas.width = this.config.width || 800
    canvas.height = this.config.height || 600
    this.container.appendChild(canvas)

    // Initialize LiteGraph
    this.graph = new LGraph()
    this.canvas = new LGraphCanvas(canvas, this.graph)

    // Apply theme
    if (this.config.theme === 'dark') {
      this.canvas.background_image = null
      // Apply dark theme styles
    }
  }

  private setupEventListeners() {
    this.graph.onAfterExecute = () => {
      this.config.onWorkflowChange?.(this.getWorkflow())
    }

    this.canvas.onNodeSelected = (node: LGraphNode) => {
      this.config.onNodeSelect?.(node)
    }
  }

  // Public API
  loadWorkflow(workflow: any) {
    this.graph.configure(workflow)
  }

  getWorkflow() {
    return this.graph.serialize()
  }

  addNode(nodeType: string, position?: [number, number]) {
    const node = LiteGraph.createNode(nodeType)
    if (position) {
      node.pos = position
    }
    this.graph.add(node)
    return node
  }

  clear() {
    this.graph.clear()
  }

  destroy() {
    this.graph.clear()
    this.container.innerHTML = ''
  }
}

export default ComfyEditor
