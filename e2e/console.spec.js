import { test, expect } from '@playwright/test';

test('no console errors on load', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => {
    errors.push(error.message);
  });
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });

  await page.goto('/');
  // Wait for network and UI to fully load
  await page.waitForLoadState('networkidle');
  
  // Wait additional time for React components to mount and render
  await page.waitForTimeout(2000);
  
  // Try to find and interact with navigation elements to trigger any lazy-loaded errors
  const navElements = await page.locator('nav, [role="navigation"], button').all();
  if (navElements.length > 0) {
    try {
      await navElements[0].hover({ timeout: 1000 });
      await page.waitForTimeout(500);
    } catch {
      // Ignore hover errors, we just want to trigger component interactions
    }
  }

  expect(errors).toEqual([]);
});
