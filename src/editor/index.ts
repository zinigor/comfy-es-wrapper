// src/editor/index.ts - Simplified approach
import { LGraph, LGraphCanvas } from '@comfyorg/litegraph'

export interface ComfyEditorConfig {
  container: HTMLElement
  width?: number
  height?: number
  onWorkflowChange?: (workflow: any) => void
}

export class ComfyEditor {
  private graph: LGraph
  private canvas: LGraphCanvas

  constructor(config: ComfyEditorConfig) {
    const canvas = document.createElement('canvas')
    canvas.width = config.width || 800
    canvas.height = config.height || 600
    config.container.appendChild(canvas)

    this.graph = new LGraph()
    this.canvas = new LGraphCanvas(canvas, this.graph)
  }

  // Simple workflow methods
  loadWorkflow(workflow: any) {
    this.graph.configure(workflow)
  }

  getWorkflow() {
    return this.graph.serialize()
  }

  getCanvas() {
    return this.canvas
  }

  destroy() {
    this.graph.clear()
  }
}
