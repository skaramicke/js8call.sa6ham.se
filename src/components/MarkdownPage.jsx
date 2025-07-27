import React from 'react'
import ReactMarkdown from 'react-markdown'

function MarkdownPage({ title, content }) {
  return (
    <div className="markdown-page">
      <h1>{title}</h1>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  )
}

export default MarkdownPage;
