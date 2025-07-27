import React from 'react'
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import { parseFrontmatter, buildTree } from './utils'
import './App.css'
import MarkdownPage from './components/MarkdownPage'

// Load all markdown files in pages as raw content
const modules = import.meta.glob('./pages/**/*.md', { eager: true, query: '?raw', import: 'default' })

// Build flat page list with path, title, and content
const pages = Object.entries(modules).map(([filePath, raw]) => {
  const { data, content } = parseFrontmatter(raw)
  let path = filePath.replace('./pages', '').replace(/\.md$/, '')
  if (path.endsWith('/index')) path = path.replace('/index', '')
  if (!path) path = '/'
  return { path, title: data.title, content }
})

// Build hierarchical menu tree from flat pages
const tree = buildTree(pages)

// Recursive menu component
export function Menu({ nodes }) {
  return (
    <ul className="menu">
      {nodes.map(node => (
        <li key={node.name}>
          {node.page ? (
            <NavLink to={node.page.path}>{node.page.title}</NavLink>
          ) : (
            <span>{node.name}</span>
          )}
          {node.children.length > 0 && <Menu nodes={node.children} />}
        </li>
      ))}
    </ul>
  )
}

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Menu nodes={tree} />
      </nav>
      <main>
        <Routes>
          {pages.map(page => (
            <Route key={page.path} path={page.path} element={<MarkdownPage title={page.title} content={page.content} />} />
          ))}
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
