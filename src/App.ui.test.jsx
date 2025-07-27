import React from 'react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import App from './App.jsx'

describe('App component', () => {
  let errorSpy

  beforeEach(() => {
    errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    errorSpy.mockRestore()
  })

  it('renders without console errors', () => {
    render(<App />)
    expect(errorSpy).not.toHaveBeenCalled()
  })
})
