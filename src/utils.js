// Utility functions for markdown parsing and menu tree building

// Parse YAML frontmatter from a markdown string
export function parseFrontmatter(raw) {
  const fmRegex = /^---\n([\s\S]*?)\n---\n?/
  const match = fmRegex.exec(raw)
  let data = {}, content = raw
  if (match) {
    const fm = match[1]
    fm.split('\n').forEach(line => {
      const idx = line.indexOf(':')
      if (idx > -1) {
        const key = line.slice(0, idx).trim()
        const val = line.slice(idx + 1).trim()
        data[key] = val
      }
    })
    content = raw.slice(match[0].length)
  }
  return { data, content }
}

// Build hierarchical menu tree from a flat list of pages
export function buildTree(list) {
  const tree = []
  list.forEach(page => {
    const segments = page.path.split('/').filter(Boolean)
    if (segments.length === 0) {
      tree.push({ name: page.title, children: [], page })
      return
    }
    let current = tree
    segments.forEach((seg, idx) => {
      let node = current.find(n => n.name === seg)
      if (!node) {
        node = { name: seg, children: [], page: null }
        current.push(node)
      }
      if (idx === segments.length - 1) node.page = page
      current = node.children
    })
  })
  return tree
}
