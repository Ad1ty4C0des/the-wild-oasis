---
name: The Wild Oasis
colors:
  surface: '#f9f9ff'
  surface-dim: '#d3daef'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f3ff'
  surface-container: '#e9edff'
  surface-container-high: '#e1e8fd'
  surface-container-highest: '#dce2f7'
  on-surface: '#141b2b'
  on-surface-variant: '#414844'
  inverse-surface: '#293040'
  inverse-on-surface: '#edf0ff'
  outline: '#717973'
  outline-variant: '#c1c8c2'
  surface-tint: '#3f6653'
  primary: '#012d1d'
  on-primary: '#ffffff'
  primary-container: '#1b4332'
  on-primary-container: '#86af99'
  inverse-primary: '#a5d0b9'
  secondary: '#8d4e21'
  on-secondary: '#ffffff'
  secondary-container: '#fdab76'
  on-secondary-container: '#773d11'
  tertiary: '#262623'
  on-tertiary: '#ffffff'
  tertiary-container: '#3c3c38'
  on-tertiary-container: '#a8a6a1'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#c1ecd4'
  primary-fixed-dim: '#a5d0b9'
  on-primary-fixed: '#002114'
  on-primary-fixed-variant: '#274e3d'
  secondary-fixed: '#ffdbc7'
  secondary-fixed-dim: '#ffb688'
  on-secondary-fixed: '#311300'
  on-secondary-fixed-variant: '#70370b'
  tertiary-fixed: '#e5e2dc'
  tertiary-fixed-dim: '#c9c6c1'
  on-tertiary-fixed: '#1c1c18'
  on-tertiary-fixed-variant: '#474743'
  background: '#f9f9ff'
  on-background: '#141b2b'
  surface-variant: '#dce2f7'
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 28px
    fontWeight: '600'
    lineHeight: '1.2'
  title-md:
    fontFamily: Hanken Grotesk
    fontSize: 20px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  container-padding: 32px
  bento-gap: 24px
  margin-sm: 16px
  margin-md: 24px
  margin-lg: 48px
---

## Brand & Style

The visual identity is defined by a "Luxe-Naturalist" aesthetic, blending the precision of high-end Swiss design with the organic warmth of a secluded forest retreat. This design system bridges the gap between functional hospitality management and the serene guest experience.

The style is primarily **Corporate Modern** with a **Glassmorphic** layer, utilizing clear structural hierarchies to manage complex data while employing organic textures and soft light-play to maintain an inviting, premium atmosphere. Every interaction is designed to feel intentional, quiet, and sophisticated, avoiding unnecessary clutter in favor of focus and calm.

## Colors

The palette is derived from nature's depths. The **Primary Forest Green** provides a grounded, stable foundation for the interface, used for main navigation and key brand moments. **Rich Earthy Brown** acts as a warm accent for secondary actions and high-touch details, mimicking wood and leather.

**Light Mode:** Uses a "Warm Cream" base instead of pure white to reduce eye strain and feel more organic. Neutral slates are used for text and borders to ensure professional legibility.
**Dark Mode:** Shifts to a deep charcoal and slate foundation, utilizing "Muted Emerald" for primary elements to maintain high contrast while preserving the "Oasis" atmosphere.

Functional colors (Success, Warning, Error) are desaturated to integrate seamlessly into the earthy palette without feeling jarring.

## Typography

This design system uses a dual-font approach to balance personality with utility. **Hanken Grotesk** is used for headlines and display text, offering a sharp, modern geometric feel that communicates premium quality. **Inter** is utilized for all body copy and UI labels, ensuring maximum readability in data-heavy management screens.

Scale and weight are used aggressively to create a clear scan-path. High-level dashboard stats use the Display-LG style, while complex tables rely on Inter’s tabular-numeric properties to keep financial data aligned and legible.

## Layout & Spacing

The system follows a **Bento Box** modular grid philosophy. On desktop, the layout is a 12-column fixed-margin grid where content is housed in self-contained, highly organized modules. 

- **Modular Ratios:** Components should occupy logical spans (e.g., 3-column, 6-column, or 12-column widths).
- **Whitespace:** Generous internal padding (32px) within modules ensures that the density of management data never feels overwhelming.
- **Responsiveness:** On mobile, the Bento grid collapses into a single-column stack, maintaining the 24px gap between modules to preserve the visual "breathing room."

## Elevation & Depth

Visual hierarchy is established through a multi-layered approach:

1.  **Base Layer:** The Warm Cream (#F9F6F0) background surface.
2.  **Bento Modules:** Elevated slightly via very soft, diffused shadows (Blur: 30px, Opacity: 4%, Color: #1B4332).
3.  **Glassmorphism:** Overlays, such as modal backdrops or side-panel filters, utilize a 12px backdrop blur with a 60% translucent white fill and a 1px "ghost border" (#FFFFFF 20%) to simulate polished glass.
4.  **Active States:** Buttons and selected cards use a subtle inner-shadow to appear "pressed," enhancing the tactile feel of the interface.

## Shapes

The shape language is defined by the **24px (1.5rem) corner radius** for all primary Bento modules. This significant rounding softens the professional nature of the system, making it feel more like a modern "app" and less like a legacy enterprise tool.

Smaller UI elements like buttons and input fields follow a 8px (0.5rem) radius to maintain crispness and functional density. Status chips and badges utilize a fully pill-shaped (999px) radius to distinguish them clearly from interactive buttons.

## Components

### Buttons
Primary buttons are solid Forest Green with white text, using a subtle vertical gradient (2%) to add weight. Secondary buttons use the Earthy Brown as a text color on a transparent background with a thin 1px border.

### Bento Cards
Every module must have a consistent 24px corner radius. Cards should include a "Glass" header area if they contain internal navigation or filtering actions.

### Status Indicators
Status changes (e.g., "Checked In", "Reserved") must use crisp micro-interactions. When a status changes, the background color of the chip should transition with a 200ms ease-in-out, accompanied by a subtle scale-up (1.05x) bounce.

### Input Fields
Inputs are minimalist, using a bottom-border-only style or a very light-grey stroke. Upon focus, the border transitions to the Primary Forest Green with a soft outer glow.

### Lists & Tables
To maintain the "Oasis" feel, table rows should have generous vertical padding (16px) and use alternating row colors that are only 1% different from the base, keeping the look exceptionally clean and sophisticated.