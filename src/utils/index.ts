// Re-export useful utilities from ComfyUI
//import type { ComfyApp } from '@comfyui/scripts/app'

export interface ComfyApp {
  // Only define what you actually need
  graph?: any
  canvas?: any
  ui?: any
}

// Workflow utilities
export const workflowUtils = {
  validateWorkflow(workflow: any): boolean {
    // Validate workflow structure
    return workflow && typeof workflow === 'object' && workflow.nodes
  },

  convertWorkflow(workflow: any, targetFormat: string) {
    // Convert between different workflow formats
    return workflow
  },

  optimizeWorkflow(workflow: any) {
    // Remove unused nodes, optimize connections
    return workflow
  },

  serializeWorkflow(workflow: any): string {
    // Convert workflow to JSON string
    return JSON.stringify(workflow, null, 2)
  },

  deserializeWorkflow(workflowString: string): any {
    // Parse workflow from JSON string
    try {
      return JSON.parse(workflowString)
    } catch (error) {
      throw new Error('Invalid workflow JSON')
    }
  },

  getWorkflowNodes(workflow: any): any[] {
    // Extract all nodes from workflow
    return workflow?.nodes || []
  },

  getWorkflowConnections(workflow: any): any[] {
    // Extract all connections from workflow
    return workflow?.connections || []
  },

  findNodeById(workflow: any, nodeId: string): any | null {
    // Find a specific node by ID
    const nodes = this.getWorkflowNodes(workflow)
    return nodes.find(node => node.id === nodeId) || null
  }
}

// Node utilities
export const nodeUtils = {
  createNode(type: string, config: any = {}) {
    // Helper to create nodes with proper configuration
    return {
      id: this.generateNodeId(),
      type,
      pos: [0, 0],
      size: [200, 100],
      properties: {},
      inputs: [],
      outputs: [],
      ...config
    }
  },

  generateNodeId(): string {
    // Generate unique node ID
    return `node_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  },

  validateNodeConnection(fromNode: any, toNode: any, fromOutput: number, toInput: number): boolean {
    // Validate if two nodes can be connected
    if (!fromNode?.outputs?.[fromOutput] || !toNode?.inputs?.[toInput]) {
      return false
    }

    const outputType = fromNode.outputs[fromOutput].type
    const inputType = toNode.inputs[toInput].type

    // Allow any -> any connections, or exact type matches
    return outputType === '*' || inputType === '*' || outputType === inputType
  },

  getNodeInputs(node: any): any[] {
    // Get all inputs for a node
    return node?.inputs || []
  },

  getNodeOutputs(node: any): any[] {
    // Get all outputs for a node
    return node?.outputs || []
  },

  setNodeProperty(node: any, property: string, value: any): void {
    // Set a property on a node
    if (!node.properties) {
      node.properties = {}
    }
    node.properties[property] = value
  },

  getNodeProperty(node: any, property: string, defaultValue: any = null): any {
    // Get a property from a node
    return node?.properties?.[property] ?? defaultValue
  }
}

// API utilities
export const apiUtils = {
  async fetchNodeTypes(): Promise<any[]> {
    // Fetch available node types from ComfyUI
    try {
      const response = await fetch('/object_info')
      return await response.json()
    } catch (error) {
      console.warn('Could not fetch node types:', error)
      return []
    }
  },

  async executeWorkflow(workflow: any): Promise<{ success: boolean; data?: any; error?: string }> {
    // Execute workflow via ComfyUI API
    try {
      const response = await fetch('/prompt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt: workflow })
      })

      if (response.ok) {
        const data = await response.json()
        return { success: true, data }
      } else {
        return { success: false, error: `HTTP ${response.status}` }
      }
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  },

  async getQueueStatus(): Promise<any> {
    // Get current queue status
    try {
      const response = await fetch('/queue')
      return await response.json()
    } catch (error) {
      console.warn('Could not fetch queue status:', error)
      return { queue_running: [], queue_pending: [] }
    }
  },

  async getHistory(): Promise<any> {
    // Get execution history
    try {
      const response = await fetch('/history')
      return await response.json()
    } catch (error) {
      console.warn('Could not fetch history:', error)
      return {}
    }
  },

  createWebSocketConnection(onMessage?: (data: any) => void): WebSocket | null {
    // Create WebSocket connection for real-time updates
    try {
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:'
      const ws = new WebSocket(`${protocol}//${window.location.host}/ws`)

      if (onMessage) {
        ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data)
            onMessage(data)
          } catch (error) {
            console.warn('Could not parse WebSocket message:', error)
          }
        }
      }

      return ws
    } catch (error) {
      console.warn('Could not create WebSocket connection:', error)
      return null
    }
  }
}

// Canvas utilities
export const canvasUtils = {
  fitToCanvas(canvas: any, nodes: any[]): void {
    // Fit all nodes to canvas view
    if (!nodes.length) return

    let minX = Infinity, minY = Infinity
    let maxX = -Infinity, maxY = -Infinity

    nodes.forEach(node => {
      const [x, y] = node.pos
      const [w, h] = node.size || [200, 100]

      minX = Math.min(minX, x)
      minY = Math.min(minY, y)
      maxX = Math.max(maxX, x + w)
      maxY = Math.max(maxY, y + h)
    })

    const padding = 50
    const centerX = (minX + maxX) / 2
    const centerY = (minY + maxY) / 2
    const width = maxX - minX + padding * 2
    const height = maxY - minY + padding * 2

    if (canvas.ds) {
      canvas.ds.offset[0] = -centerX + canvas.canvas.width / 2
      canvas.ds.offset[1] = -centerY + canvas.canvas.height / 2

      const scaleX = canvas.canvas.width / width
      const scaleY = canvas.canvas.height / height
      canvas.ds.scale = Math.min(scaleX, scaleY, 1)
    }
  },

  centerOnNode(canvas: any, node: any): void {
    // Center canvas view on a specific node
    if (!node?.pos || !canvas.ds) return

    const [x, y] = node.pos
    canvas.ds.offset[0] = -x + canvas.canvas.width / 2
    canvas.ds.offset[1] = -y + canvas.canvas.height / 2
  },

  getCanvasMousePosition(canvas: any, event: MouseEvent): [number, number] {
    // Convert screen coordinates to canvas coordinates
    const rect = canvas.canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    if (canvas.ds) {
      return [
        (x - canvas.ds.offset[0]) / canvas.ds.scale,
        (y - canvas.ds.offset[1]) / canvas.ds.scale
      ]
    }

    return [x, y]
  }
}

// Export default (backward compatibility)
export { workflowUtils as default }
