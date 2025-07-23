import { createApp, App as VueApp } from 'vue'
import { createPinia } from 'pinia'

// Import ComfyUI Vue components (adjust paths as needed)
// import NodeEditor from '@comfyui/components/NodeEditor.vue'
// import NodeLibrary from '@comfyui/components/NodeLibrary.vue'

export interface VueComponentWrapper {
  mount(element: HTMLElement): void
  unmount(): void
  updateProps(props: any): void
}

export class ComfyVueWrapper implements VueComponentWrapper {
  private app: VueApp | null = null
  private element: HTMLElement | null = null

  constructor(private component: any, private initialProps: any = {}) {}

  mount(element: HTMLElement) {
    this.element = element
    this.app = createApp(this.component, this.initialProps)
    this.app.use(createPinia())
    this.app.mount(element)
  }

  unmount() {
    if (this.app && this.element) {
      this.app.unmount()
      this.app = null
      this.element = null
    }
  }

  updateProps(props: any) {
    // Update component props dynamically
    if (this.app) {
      Object.assign(this.app._instance?.props || {}, props)
    }
  }
}

// Factory functions for easy component creation
export const createNodeEditor = (props: any) => {
  // return new ComfyVueWrapper(NodeEditor, props)
}

export const createNodeLibrary = (props: any) => {
  // return new ComfyVueWrapper(NodeLibrary, props)
}
