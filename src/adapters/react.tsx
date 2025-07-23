import React, { useEffect, useRef } from 'react'
import { ComfyEditor, ComfyEditorConfig } from '../editor'

export interface ComfyEditorProps extends Omit<ComfyEditorConfig, 'container'> {
  className?: string
  style?: React.CSSProperties
}

export const ComfyEditorReact: React.FC<ComfyEditorProps> = ({
  className,
  style,
  ...config
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const editorRef = useRef<ComfyEditor | null>(null)

  useEffect(() => {
    if (containerRef.current && !editorRef.current) {
      editorRef.current = new ComfyEditor({
        ...config,
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
      className={className}
      style={style}
    />
  )
}

export default ComfyEditorReact
