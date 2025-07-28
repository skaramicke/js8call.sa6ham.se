import { describe, it } from 'vitest'

describe('Integration: module imports', () => {
  it('imports App.jsx without errors', async () => {
    // This will throw if there are unresolved exports or build errors
    await import('./App.jsx')
  })
})
