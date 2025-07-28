import React from 'react'
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import { parseFrontmatter, buildTree } from './utils'
import './App.css'
import MarkdownPage from './components/MarkdownPage'
import { Box, Flex, Button, HStack } from "@chakra-ui/react";
// Inline icon component instead of importing from @chakra-ui/icons to avoid forwardRef issue
const ChevronRightIcon = () => (
  <Box as="span" ml={2} role="presentation">
    ›
  </Box>
);
import { Link as RouterLink } from "react-router-dom";

// Load all markdown files in pages as raw content
const modules = import.meta.glob("./pages/**/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

// Build flat page list with path, title, and content
const pages = Object.entries(modules).map(([filePath, raw]) => {
  const { data, content } = parseFrontmatter(raw);
  let path = filePath.replace("./pages", "").replace(/\.md$/, "");
  if (path.endsWith("/index")) path = path.replace("/index", "");
  if (!path) path = "/";
  return { path, title: data.title, content };
});

// Build hierarchical menu tree from flat pages
const tree = buildTree(pages);

// Recursive dropdown using simple buttons (Chakra UI v3 compatible)
function SubMenu({ node }) {
  if (!node.children.length) {
    return (
      <Button as={RouterLink} to={node.page.path} variant="ghost" size="sm">
        {node.page.title}
      </Button>
    );
  }
  return (
    <Box>
      <Button variant="ghost" size="sm">
        {node.page ? node.page.title : node.name}
        <ChevronRightIcon />
      </Button>
      <Box ml={4}>
        {node.page && (
          <Button as={RouterLink} to={node.page.path} variant="ghost" size="sm">
            {node.page.title}
          </Button>
        )}
        {node.children.map((child) => (
          <SubMenu key={child.name} node={child} />
        ))}
      </Box>
    </Box>
  );
}

export function Menu({ nodes }) {
  return (
    <HStack spacing={4}>
      {nodes.map((node) =>
        node.children.length > 0 ? (
          <Box key={node.name}>
            <Button variant="ghost">
              {node.page ? node.page.title : node.name}
              <ChevronRightIcon />
            </Button>
            <Box>
              {node.page && (
                <Button
                  as={RouterLink}
                  to={node.page.path}
                  variant="ghost"
                  size="sm"
                >
                  {node.page.title}
                </Button>
              )}
              {node.children.map((child) => (
                <SubMenu key={child.name} node={child} />
              ))}
            </Box>
          </Box>
        ) : (
          <Button
            key={node.name}
            as={RouterLink}
            to={node.page.path}
            variant="ghost"
          >
            {node.page.title}
          </Button>
        )
      )}
    </HStack>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Box as="nav" bg="gray.100" p={4} boxShadow="md">
        <Menu nodes={tree} />
      </Box>
      <Box as="main" p={8} maxW="960px" mx="auto">
        <Routes>
          {pages.map((page) => (
            <Route
              key={page.path}
              path={page.path}
              element={
                <MarkdownPage title={page.title} content={page.content} />
              }
            />
          ))}
          <Route
            path="*"
            element={
              <Box textAlign="center">
                <h1>Page Not Found</h1>
              </Box>
            }
          />
        </Routes>
      </Box>
    </BrowserRouter>
  );
}

export default App
