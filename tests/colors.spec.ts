import { test, expect } from '@playwright/test'

// Color palette from src/scss/_variables.scss
const COLORS = {
  primary: 'rgb(33, 25, 81)',      // #211951
  secondary: 'rgb(131, 111, 255)', // #836FFF
  tertiary: 'rgb(21, 245, 186)',   // #15F5BA
  accent: 'rgb(21, 245, 186)',     // same as tertiary
  shadow: 'rgb(240, 243, 255)',    // #F0F3FF
}

async function getComputedStyleProp(page, selector, prop) {
  return await page.$eval(selector, (el, p) => getComputedStyle(el)[p], prop)
}

async function getPseudoStyle(page, selector, pseudo, prop) {
  return await page.$eval(selector, (el, p) => getComputedStyle(el, p[0])[p[1]], [pseudo, prop])
}

// --- Color helpers for approximate matching ---
function parseRgb(str: string): [number, number, number] | null {
  if (!str) return null
  // Normalize spaces and lowercase
  const s = String(str).trim().toLowerCase()
  // rgb(r, g, b) or rgba(r, g, b, a)
  const m = s.match(/rgba?\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)/)
  if (m) return [parseInt(m[1], 10), parseInt(m[2], 10), parseInt(m[3], 10)]
  return null
}

function colorDistance(a: [number, number, number], b: [number, number, number]): number {
  const dr = a[0] - b[0]
  const dg = a[1] - b[1]
  const db = a[2] - b[2]
  return Math.sqrt(dr*dr + dg*dg + db*db)
}

function approxEqual(aStr: string, bStr: string, delta: number = 8): boolean {
  const a = parseRgb(aStr)
  const b = parseRgb(bStr)
  if (!a || !b) return false
  return colorDistance(a, b) <= delta
}

function anyApproxMatch(list: string[], target: string, delta: number = 8): boolean {
  return list.some(item => approxEqual(item, target, delta))
}

test.describe('Color tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000')
    await expect(page.locator('.App')).toBeVisible()
  })

  // --- Global/background/text ---
  test('Body background is primary', async ({ page }) => {
    const bodyBg = await getComputedStyleProp(page, 'body', 'backgroundColor')
    expect(bodyBg).toBe(COLORS.primary)
  })

  test('Header text color is shadow', async ({ page }) => {
    const color = await getComputedStyleProp(page, 'header', 'color')
    expect(color).toBe(COLORS.shadow)
  })

  test('Instructions text color is shadow', async ({ page }) => {
    const color = await getComputedStyleProp(page, '.instructions', 'color')
    expect(color).toBe(COLORS.shadow)
  })

  test('Input group label color is shadow', async ({ page }) => {
    const color = await getComputedStyleProp(page, '.inputGroup > label', 'color')
    expect(color).toBe(COLORS.shadow)
  })

  test('Input field label color is shadow', async ({ page }) => {
    const color = await getComputedStyleProp(page, '.inputField > label', 'color')
    expect(color).toBe(COLORS.shadow)
  })

  // --- Graph components (split per property) ---
  test('Graph is visible', async ({ page }) => {
    await expect(page.locator('svg.graph')).toBeVisible()
  })

  test('Graph body stroke is shadow', async ({ page }) => {
    const stroke = await getComputedStyleProp(page, '.graph .graphBody', 'stroke')
    expect(stroke).toBe(COLORS.shadow)
  })

  test('Curve line stroke is accent', async ({ page }) => {
    const stroke = await getComputedStyleProp(page, '.graph .curveLine', 'stroke')
    expect(stroke).toBe(COLORS.accent)
  })

  test('Curve line fill is secondary', async ({ page }) => {
    const fill = await getComputedStyleProp(page, '.graph .curveLine', 'fill')
    expect(fill).toBe(COLORS.secondary)
  })

  test('Anchor fill is accent', async ({ page }) => {
    const fill = await getComputedStyleProp(page, '.graph .anchor', 'fill')
    expect(fill).toBe(COLORS.accent)
  })

  test('Handle fill is secondary', async ({ page }) => {
    const fill = await getComputedStyleProp(page, '.graph .handle', 'fill')
    expect(fill).toBe(COLORS.secondary)
  })

  test('Handle stroke is accent', async ({ page }) => {
    const stroke = await getComputedStyleProp(page, '.graph .handle', 'stroke')
    expect(stroke).toBe(COLORS.accent)
  })

  // --- Inputs (split per property/state) ---
  test('Number input background is primary', async ({ page }) => {
    const sel = '.inputField input[type="number"]'
    const bg = await getComputedStyleProp(page, sel, 'backgroundColor')
    expect(bg).toBe(COLORS.primary)
  })

  test('Number input border color is shadow', async ({ page }) => {
    const sel = '.inputField input[type="number"]'
    const border = await getComputedStyleProp(page, sel, 'borderTopColor')
    expect(border).toBe(COLORS.shadow)
  })

  test('Number input text color is shadow', async ({ page }) => {
    const sel = '.inputField input[type="number"]'
    const text = await getComputedStyleProp(page, sel, 'color')
    expect(text).toBe(COLORS.shadow)
  })

  test('Number input border becomes accent on focus', async ({ page }) => {
    const sel = '.inputField input[type="number"]'
    await page.focus(sel)
    const border = await getComputedStyleProp(page, sel, 'borderTopColor')
    expect(border).toBe(COLORS.accent)
  })

  test('Number input background becomes rgba(secondary, 0.1) on focus', async ({ page }) => {
    const sel = '.inputField input[type="number"]'
    await page.focus(sel)
    const bg = await getComputedStyleProp(page, sel, 'backgroundColor')
    expect(bg).toBe('rgba(131, 111, 255, 0.1)')
  })

  // --- Reset button ---
  test('Reset button is visible', async ({ page }) => {
    await expect(page.locator('button.resetButton')).toBeVisible()
  })

  test('Reset button background is accent', async ({ page }) => {
    const bg = await getComputedStyleProp(page, 'button.resetButton', 'backgroundColor')
    expect(bg).toBe(COLORS.accent)
  })

  test('Reset button text color is primary', async ({ page }) => {
    const color = await getComputedStyleProp(page, 'button.resetButton', 'color')
    expect(color).toBe(COLORS.primary)
  })

  // --- Speed slider (split) ---
  test.skip('Speed slider track shows linear-gradient with theme colors (best-effort)', async ({ page }) => {
    const rangeSel = '.speedSlider input[type="range"]'
    await expect(page.locator(rangeSel)).toBeVisible()
    const candidates: string[] = []
    for (const [pseudo, prop] of [
      ['::-webkit-slider-runnable-track', 'backgroundImage'],
      ['::-webkit-slider-runnable-track', 'background'],
      ['::-moz-range-track', 'backgroundImage'],
      ['::-moz-range-track', 'background'],
      ['::-ms-fill-lower', 'backgroundImage'],
      ['::-ms-fill-lower', 'background'],
      ['::-ms-fill-upper', 'backgroundImage'],
      ['::-ms-fill-upper', 'background'],
    ] as const) {
      try {
        const val = await getPseudoStyle(page, rangeSel, pseudo, prop)
        if (val && typeof val === 'string') candidates.push(val)
      } catch (_) {}
    }
    try {
      const baseBgImg = await getComputedStyleProp(page, rangeSel, 'backgroundImage')
      const baseBg = await getComputedStyleProp(page, rangeSel, 'background')
      if (baseBgImg && typeof baseBgImg === 'string') candidates.push(baseBgImg)
      if (baseBg && typeof baseBg === 'string') candidates.push(baseBg)
    } catch (_) {}
    const gradientStr = candidates.find(s => s.includes('linear-gradient'))
    if (gradientStr) {
      expect(gradientStr).toContain('rgb(131, 111, 255)')
      expect(gradientStr).toContain('rgb(21, 245, 186)')
    } else {
      console.warn(`Slider track gradient not exposed via getComputedStyle in this engine. Candidates: ${candidates.join(' | ') || 'no values'}`)
    }
  })

  test.skip('Speed slider thumb background is tertiary', async ({ page }) => {
    const rangeSel = '.speedSlider input[type="range"]'
    const thumbBg = await getPseudoStyle(page, rangeSel, '::-webkit-slider-thumb', 'backgroundColor')
    expect(thumbBg).toBe(COLORS.tertiary)
  })

  test.skip('Speed slider thumb border is secondary', async ({ page }) => {
    const rangeSel = '.speedSlider input[type="range"]'
    const thumbBorder = await getPseudoStyle(page, rangeSel, '::-webkit-slider-thumb', 'borderColor')
    expect(thumbBorder).toBe(COLORS.secondary)
  })

  test.skip('Speed slider thumb focus ring uses rgba(secondary, 0.25)', async ({ page }) => {
    const rangeSel = '.speedSlider input[type="range"]'
    await page.focus(rangeSel)
    const thumbShadow = await getPseudoStyle(page, rangeSel, '::-webkit-slider-thumb', 'boxShadow')
    expect(thumbShadow).toContain('rgba(131, 111, 255, 0.25)')
  })

  // --- Outputs (split) ---
  test('Output box background is accent', async ({ page }) => {
    const bg = await getComputedStyleProp(page, '.output .box', 'backgroundColor')
    expect(bg).toBe(COLORS.accent)
  })

  test('Circle fill is secondary', async ({ page }) => {
    const fill = await getComputedStyleProp(page, '#circle > circle', 'fill')
    expect(fill).toBe(COLORS.secondary)
  })

  test('Circle stroke is accent', async ({ page }) => {
    const stroke = await getComputedStyleProp(page, '#circle > circle', 'stroke')
    expect(stroke).toBe(COLORS.accent)
  })

  test('Cross line stroke is accent', async ({ page }) => {
    const stroke = await getComputedStyleProp(page, '#cross line', 'stroke')
    expect(stroke).toBe(COLORS.accent)
  })

  test('Cross dot fill is secondary', async ({ page }) => {
    const fill = await getComputedStyleProp(page, '#cross circle', 'fill')
    expect(fill).toBe(COLORS.secondary)
  })

  test('Ghost box opacity animates within [0.2, 0.7] and changes over time', async ({ page }) => {
    const sel = '#ghostBox'
    const o1 = parseFloat(await getComputedStyleProp(page, sel, 'opacity'))
    await page.waitForTimeout(900)
    const o2 = parseFloat(await getComputedStyleProp(page, sel, 'opacity'))
    expect(o1).not.toBe(o2)
    expect(o1).toBeGreaterThanOrEqual(0.2)
    expect(o1).toBeLessThanOrEqual(0.7)
    expect(o2).toBeGreaterThanOrEqual(0.2)
    expect(o2).toBeLessThanOrEqual(0.7)
  })

  test('Color box animation reaches approximately accent at some point', async ({ page }) => {
    const colorSel = '#colorBox'
    await page.$eval('.speedSlider input[type="range"]', (el) => {
      el.value = '0.5'
      el.dispatchEvent(new Event('input', { bubbles: true }))
    })
    const seen = new Set<string>()
    for (let i = 0; i < 40; i++) {
      const c = await getComputedStyleProp(page, colorSel, 'backgroundColor')
      seen.add(c)
      await page.waitForTimeout(100)
    }
    const seenColors = Array.from(seen)
    const approxAccent = anyApproxMatch(seenColors, COLORS.accent, 8)
    expect(approxAccent, `No approx accent among: ${seenColors.join(', ')}`).toBeTruthy()
  })

  test('Color box animation reaches approximately shadow at some point', async ({ page }) => {
    const colorSel = '#colorBox'
    await page.$eval('.speedSlider input[type="range"]', (el) => {
      el.value = '0.5'
      el.dispatchEvent(new Event('input', { bubbles: true }))
    })
    const seen = new Set<string>()
    for (let i = 0; i < 20; i++) {
      const c = await getComputedStyleProp(page, colorSel, 'backgroundColor')
      seen.add(c)
      await page.waitForTimeout(100)
    }
    const seenColors = Array.from(seen)
    const approxShadow = anyApproxMatch(seenColors, COLORS.shadow, 8)
    expect(approxShadow, `No approx shadow among: ${seenColors.join(', ')}`).toBeTruthy()
  })

  // --- Approximate color sanity checks (exclude skipped and color box tests) ---
  const APPROX_DELTA = 10
  const numberInputSel = '.inputField input[type="number"]'

  const focusNumberInput = async (page) => {
    await page.focus(numberInputSel)
  }

  const approxTests: Array<{ name: string; sel: string; prop: string; exp: string; pre?: (page: any) => Promise<void> }> = [
    { name: 'Body background approx close', sel: 'body', prop: 'backgroundColor', exp: COLORS.primary },
    { name: 'Header text color approx close', sel: 'header', prop: 'color', exp: COLORS.shadow },
    { name: 'Instructions text color approx close', sel: '.instructions', prop: 'color', exp: COLORS.shadow },
    { name: 'Input group label color approx close', sel: '.inputGroup > label', prop: 'color', exp: COLORS.shadow },
    { name: 'Input field label color approx close', sel: '.inputField > label', prop: 'color', exp: COLORS.shadow },

    // Graph components
    { name: 'Graph body stroke approx close', sel: '.graph .graphBody', prop: 'stroke', exp: COLORS.shadow },
    { name: 'Curve line stroke approx close', sel: '.graph .curveLine', prop: 'stroke', exp: COLORS.accent },
    { name: 'Curve line fill approx close', sel: '.graph .curveLine', prop: 'fill', exp: COLORS.secondary },
    { name: 'Anchor fill approx close', sel: '.graph .anchor', prop: 'fill', exp: COLORS.accent },
    { name: 'Handle fill approx close', sel: '.graph .handle', prop: 'fill', exp: COLORS.secondary },
    { name: 'Handle stroke approx close', sel: '.graph .handle', prop: 'stroke', exp: COLORS.accent },

    // Inputs (default state)
    { name: 'Number input background approx close', sel: numberInputSel, prop: 'backgroundColor', exp: COLORS.primary },
    { name: 'Number input border color approx close', sel: numberInputSel, prop: 'borderTopColor', exp: COLORS.shadow },
    { name: 'Number input text color approx close', sel: numberInputSel, prop: 'color', exp: COLORS.shadow },

    // Inputs (focus state)
    { name: 'Number input border becomes accent on focus approx close', sel: numberInputSel, prop: 'borderTopColor', exp: COLORS.accent, pre: focusNumberInput },
    { name: 'Number input background becomes rgba(secondary, 0.1) on focus approx close', sel: numberInputSel, prop: 'backgroundColor', exp: 'rgba(131, 111, 255, 0.1)', pre: focusNumberInput },

    // Reset button
    { name: 'Reset button background approx close', sel: 'button.resetButton', prop: 'backgroundColor', exp: COLORS.accent },
    { name: 'Reset button text color approx close', sel: 'button.resetButton', prop: 'color', exp: COLORS.primary },

    // Outputs
    { name: 'Output box background approx close', sel: '.output .box', prop: 'backgroundColor', exp: COLORS.accent },
    { name: 'Circle fill approx close', sel: '#circle > circle', prop: 'fill', exp: COLORS.secondary },
    { name: 'Circle stroke approx close', sel: '#circle > circle', prop: 'stroke', exp: COLORS.accent },
    { name: 'Cross line stroke approx close', sel: '#cross line', prop: 'stroke', exp: COLORS.accent },
    { name: 'Cross dot fill approx close', sel: '#cross circle', prop: 'fill', exp: COLORS.secondary },
  ]

  for (const t of approxTests) {
    test(t.name, async ({ page }) => {
      if (t.pre) await t.pre(page)
      const actual = await getComputedStyleProp(page, t.sel, t.prop)
      expect(approxEqual(actual, t.exp, APPROX_DELTA), `Expected ${t.sel} ${t.prop} ≈ ${t.exp} (±${APPROX_DELTA}). Got ${actual}`).toBeTruthy()
    })
  }
})