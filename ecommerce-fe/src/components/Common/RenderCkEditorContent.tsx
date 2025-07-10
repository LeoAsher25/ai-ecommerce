import React from 'react'
import 'ckeditor5/ckeditor5.css'
import '@/app/css/ckeditor5.css'

const RenderCkEditorContent = ({ content }: { content: string | undefined }) => {
  if (!content) return null

  return (
    <div className="ckeditor-wrap ck-editor">
      <div className="ck-content" dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  )
}

export default RenderCkEditorContent
