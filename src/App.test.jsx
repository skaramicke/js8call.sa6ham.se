import React from 'react'
import { describe, it, expect } from 'vitest'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { parseFrontmatter, buildTree } from './utils'
import { Menu } from './App.jsx'

describe('parseFrontmatter', () => {
  it('extracts frontmatter data and content', () => {
    const raw = `---
title: Test Page
author: Alice
---
# Hello World
This is content.`
    const { data, content } = parseFrontmatter(raw)
    expect(data.title).toBe('Test Page')
    expect(data.author).toBe('Alice')
    expect(content.trim()).toBe('# Hello World\nThis is content.')
  })
})

describe('buildTree', () => {
  it('builds hierarchical tree from flat pages', () => {
    const pages = [
      { path: '/', title: 'Home' },
      { path: '/about', title: 'About' },
      { path: '/blog/post1', title: 'Post1' },
    ]
    const tree = buildTree(pages)
    expect(tree).toHaveLength(3)
    // Root page should be first
    expect(tree[0].name).toBe('Home')
    // About page
    expect(tree.find(n => n.name === 'about').page.title).toBe('About')
    // Blog subtree
    const blogNode = tree.find(n => n.name === 'blog')
    expect(blogNode).toBeDefined()
    expect(blogNode.children[0].name).toBe('post1')
    expect(blogNode.children[0].page.title).toBe('Post1')
  })
})

describe('Menu component', () => {
  it('renders links for nodes', () => {
    const nodes = [
      { name: 'Home', page: { path: '/', title: 'Home' }, children: [] },
    ]
    render(
      <MemoryRouter>
        <Menu nodes={nodes} />
      </MemoryRouter>
    )
    const link = screen.getByText('Home')
    expect(link).toBeInTheDocument()
    expect(link.closest('a')).toHaveAttribute('href', '/')
  })
})
