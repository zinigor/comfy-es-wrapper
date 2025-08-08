/* @jsxRuntime classic */

import { useEffect, useRef } from 'react'
import { ComfyEditor } from '../editor/index'

import type { CSSProperties } from 'react'

interface EditorReactData {
  className: string,
  style: CSSProperties,
  config?: object
}

export const ComfyEditorReact = ( properties: EditorReactData ) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const editorRef = useRef<ComfyEditor | null>(null)

  useEffect(() => {
    if (containerRef.current && !editorRef.current) {
      editorRef.current = new ComfyEditor({
        ...properties.config,
        container: containerRef.current
      })
    }

    return () => {
      if (editorRef.current) {
        editorRef.current.destroy()
        editorRef.current = null
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={properties.className}
      style={properties.style}
    ></div>
  )
}

export default ComfyEditorReact
