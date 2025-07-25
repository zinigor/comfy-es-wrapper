// Core exports
export * from './editor'
export * from './components'
export * from './types'
export * from './utils'

// CSS imports (make optional)
export const loadStyles = () => {
  // import('./assets/comfyui.css')
}

// Version compatibility check
export const checkCompatibility = () => {
  // Check ComfyUI version compatibility
  const comfyUIVersion = process.env.COMFYUI_VERSION
  console.log(`ComfyUI Wrapper compatible with ComfyUI ${comfyUIVersion}`)
}
