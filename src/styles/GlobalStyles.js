import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
:root {

  /* ── Luxe-Naturalist Design System ── */

  &, &.light-mode {
    /* Surface palette – from Stitch design spec */
    --color-grey-0: #ffffff;
    --color-grey-50: #f9f9ff;
    --color-grey-100: #f1f3ff;
    --color-grey-200: #dce2f7;
    --color-grey-300: #c1c8c2;
    --color-grey-400: #717973;
    --color-grey-500: #414844;
    --color-grey-600: #293040;
    --color-grey-700: #1a1f2e;
    --color-grey-800: #141b2b;
    --color-grey-900: #0d0c0b;

    /* Dashboard tertiary surface (warm cream) */
    --color-tertiary-bg: #f9f6f0;
    --color-tertiary-card: #ffffff;
    --color-tertiary-border: #f1ede4;

    /* Brand – Forest Greens */
    --color-brand-50: #e8f5ee;
    --color-brand-100: #c1ecd4;
    --color-brand-200: #a5d0b9;
    --color-brand-500: #3f6653;
    --color-brand-600: #1b4332;
    --color-brand-700: #143a2a;
    --color-brand-800: #0e2e20;
    --color-brand-900: #012d1d;

    /* Accent – Earthy warm browns/oranges */
    --color-accent-100: #ffdbc7;
    --color-accent-500: #8d4e21;
    --color-accent-600: #70370b;
    --color-accent-700: #773d11;

    /* Semantic – Status Colors */
    --color-blue-100: #e0f2fe;
    --color-blue-700: #0369a1;
    --color-green-100: #dcfce7;
    --color-green-700: #15803d;
    --color-yellow-100: #fef9c3;
    --color-yellow-700: #a16207;
    --color-silver-100: #e5e7eb;
    --color-silver-700: #374151;
    --color-indigo-100: #e0e7ff;
    --color-indigo-700: #4338ca;

    --color-red-100: #fee2e2;
    --color-red-700: #b91c1c;
    --color-red-800: #991b1b;

    --backdrop-color: rgba(27, 67, 50, 0.15);

    --shadow-sm: 0 1px 3px rgba(20, 27, 43, 0.04);
    --shadow-md: 0 4px 24px rgba(20, 27, 43, 0.06);
    --shadow-lg: 0 12px 40px rgba(20, 27, 43, 0.1);

    --image-grayscale: 0;
    --image-opacity: 100%;
  }
  
  &.dark-mode {
    /* Surface palette – deep charcoal slate */
    --color-grey-0: #1a1f2e;
    --color-grey-50: #141925;
    --color-grey-100: #1e2538;
    --color-grey-200: #2a3247;
    --color-grey-300: #3d4560;
    --color-grey-400: #6b7490;
    --color-grey-500: #9aa3b8;
    --color-grey-600: #c5cdd8;
    --color-grey-700: #dce2ea;
    --color-grey-800: #edf0f5;
    --color-grey-900: #f5f7fa;

    /* Dashboard tertiary surface (same as base in dark) */
    --color-tertiary-bg: #141925;
    --color-tertiary-card: #1a1f2e;
    --color-tertiary-border: #1e2538;

    /* Brand – Muted Emerald for dark mode */
    --color-brand-50: #0e2e20;
    --color-brand-100: #143a2a;
    --color-brand-200: #1b4332;
    --color-brand-500: #5a9e7c;
    --color-brand-600: #6fbc94;
    --color-brand-700: #a5d0b9;
    --color-brand-800: #c1ecd4;
    --color-brand-900: #e8f5ee;

    /* Accent */
    --color-accent-100: #3d2a14;
    --color-accent-500: #ffb688;
    --color-accent-600: #ffdbc7;
    --color-accent-700: #ffdbc7;

    --color-blue-100: #075985;
    --color-blue-700: #e0f2fe;
    --color-green-100: #166534;
    --color-green-700: #dcfce7;
    --color-yellow-100: #854d0e;
    --color-yellow-700: #fef9c3;
    --color-silver-100: #374151;
    --color-silver-700: #f3f4f6;
    --color-indigo-100: #3730a3;
    --color-indigo-700: #e0e7ff;

    --color-red-100: #fee2e2;
    --color-red-700: #b91c1c;
    --color-red-800: #991b1b;

    --backdrop-color: rgba(0, 0, 0, 0.45);

    --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.3);
    --shadow-md: 0 4px 24px rgba(0, 0, 0, 0.35);
    --shadow-lg: 0 12px 40px rgba(0, 0, 0, 0.45);

    --image-grayscale: 10%;
    --image-opacity: 90%;
  }

  /* ── Design Tokens ── */
  --border-radius-tiny: 4px;
  --border-radius-sm: 8px;
  --border-radius-md: 12px;
  --border-radius-lg: 16px;
  --border-radius-xl: 24px;

  /* Bento spacing */
  --spacing-bento-gap: 2.4rem;
  --spacing-container: 3.2rem;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;

  /* Smooth dark mode transitions */
  transition: background-color 0.3s ease, border-color 0.3s ease, color 0.15s ease;
}

html {
  font-size: 62.5%;
}

body {
  font-family: "Inter", "Poppins", sans-serif;
  color: var(--color-grey-700);

  transition: color 0.3s, background-color 0.3s;
  min-height: 100vh;
  line-height: 1.6;
  font-size: 1.4rem;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

input,
button,
textarea,
select {
  font: inherit;
  color: inherit;
}

button {
  cursor: pointer;
}

*:disabled {
  cursor: not-allowed;
}

select:disabled,
input:disabled {
  background-color: var(--color-grey-200);
  color: var(--color-grey-500);
}

input:focus,
button:focus,
textarea:focus,
select:focus {
  outline: 2px solid var(--color-brand-600);
  outline-offset: -1px;
}

/* Parent selector, finally 😃 */
button:has(svg) {
  line-height: 0;
}

a {
  color: inherit;
  text-decoration: none;
}

ul {
  list-style: none;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
  hyphens: auto;
}

img {
  max-width: 100%;

  /* For dark mode */
  filter: grayscale(var(--image-grayscale)) opacity(var(--image-opacity));
}

/* Scrollbar styling */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: var(--color-grey-300);
  border-radius: 100px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--color-grey-400);
}
`;

export default GlobalStyles;
