# AGENTS.md

This document provides guidelines for AI agents working on the Personal Task Manager codebase.

## Project Overview

Personal Task Manager is a React 19 task management application with Material Design 3 styling. It features task management, habit tracking, and statistics with data persistence via localStorage.

## Build, Lint, and Test Commands

### Core Commands
- **Development server**: `npm run dev` - Start Vite dev server
- **Build for production**: `npm run build` - Create production build in `dist/`
- **Preview production build**: `npm run preview` - Preview built application
- **Run linter**: `npm run lint` - Run ESLint on all files

### Testing
- **Run all tests**: `npm run test` - Run Vitest with watch mode
- **Run tests once (CI)**: `npm run test:run` - Run tests without watch mode
- **Test UI**: `npm run test:ui` - Open Vitest UI for interactive testing
- **Run single test file**: `npm run test -- path/to/file.test.jsx` - Run specific test file
- **Run single test**: `npm run test -- -t "test name"` - Run tests matching description

### Linting Details
ESLint configuration is in `eslint.config.js`. The linter is configured with:
- React Hooks rules enabled
- React Refresh rules for HMR compatibility
- `no-unused-vars` with allowances for uppercase constants and underscore-prefixed params

## Code Style Guidelines

### File Organization
- Use `.jsx` extension for React components, `.js` for utilities and services
- Use named exports for components (`export default ComponentName`)
- Barrel exports from `src/hooks/index.js` for hooks
- Keep components in `src/components/` organized by feature: `common/`, `layout/`, `tasks/`, `stats/`

### Naming Conventions
- **Components**: PascalCase (`TaskCard`, `Modal`)
- **Hooks**: camelCase with `use` prefix (`useTasks`, `useLocalStorage`)
- **Services**: camelCase, suffixed with `Service` (`taskService`, `statsService`)
- **Variables and functions**: camelCase (`currentDate`, `getTasksForDate`)
- **Constants and enums**: UPPER_SNAKE_CASE or PascalCase for complex objects
- **CSS classes**: kebab-case for custom classes, follow Tailwind conventions
- **Files**: kebab-case for non-component files (`date-helpers.js`, `mock-data.js`)

### Component Structure
Use the following pattern for React components:

```jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Icon } from 'lucide-react';

function ComponentName({ prop1, prop2 = defaultValue }) {
  // Hooks first
  const [state, setState] = useState(initialValue);

  // Callbacks
  const handleClick = () => { ... };

  // Return JSX
  return <div>...</div>;
}

export default ComponentName;
```

For components requiring refs, use `forwardRef`:

```jsx
import { forwardRef } from 'react';

const Input = forwardRef(({ ...props }, ref) => {
  return <input ref={ref} {...props} />;
});

Input.displayName = 'Input';
export default Input;
```

### Imports and Exports
- Use absolute imports from `src/` (e.g., `import { Icon } from 'lucide-react'`)
- Use relative imports for local files: `import { dateHelpers } from '../utils/dateHelpers'`
- Group imports in this order:
  1. React imports
  3rd party libraries
  Local components/utils/services
  Context/hooks
- Use named exports for utilities and services
- Use default exports for page-level components

### Styling with Tailwind
- Use Tailwind utility classes for all styling
- Follow the custom color palette in `tailwind.config.js`:
  - Background: `background`, `surface`, `surface-highlight`
  - Text: `primary-text`, `primary-muted`
  - Accents: `accent-indigo`, `accent-purple`, `accent-rose`, `accent-emerald`
  - Categories: `category-work`, `category-study`, `category-sport`, `category-personal`
- Use consistent spacing: `p-4`, `m-2`, `gap-2`, etc.
- Use `rounded-lg` for most components, `rounded-3xl` for bento cards
- Use `shadow-bento` for card elevation, `shadow-glow-subtle` for subtle glows
- Custom animations: `animate-fade-in`, `animate-scale-in` defined in tailwind.config.js

### State Management
- Use React Context (`TaskContext`) for global app state
- Use local state (`useState`) for component-specific state
- Use hooks for reusable stateful logic (`useTasks`, `useStats`)
- Use `localStorage` keys with pattern `tasks_YYYY-MM-DD` for persistence

### Error Handling
- Throw descriptive errors for hook misuse: `throw new Error("useTasks must be used within TaskProvider")`
- Use try-catch in async service methods
- Validate props with default values for optional props
- Handle localStorage errors gracefully (check for null/undefined)

### Types and Data Structures
Tasks follow this structure:
```javascript
{
  id: string,
  title: string,
  category: 'work' | 'study' | 'sport' | 'personal',
  startTime: string,
  endTime: string,
  done: boolean,
  notes: string,
  isHabit: boolean,
  habitFrequency: 'daily' | 'weekdays' | 'weekly',
}
```

### Testing
- Test files: `src/tests/{Component,Context}.test.jsx`
- Use `@testing-library/react` and `@testing-library/user-event`
- Use `jsdom` environment configured in `vitest.config.js`
- Follow existing test patterns in `TaskContext.test.jsx` and `TaskForm.test.jsx`
- Tests are located in `src/tests/setup.js` with Jest DOM setup

### Performance
- Memoize expensive calculations with `useMemo`
- Use `useCallback` for event handlers passed to child components
- Avoid unnecessary re-renders by properly using React.memo
- Defer non-critical operations with `setTimeout` when appropriate (see habit creation logic)

### Accessibility
- Use semantic HTML elements
- Include proper focus management for modals
- Use `aria-label` for icon-only buttons
- Ensure sufficient color contrast (handled via Tailwind color palette)

### Git Conventions
- Commit messages: Present tense, descriptive (e.g., "Add task creation modal")
- Branch names: `feature/`, `fix/`, or `refactor/` prefixes
- No force pushes to main/master
- Run `npm run lint` before committing

### Important File Locations
- Config: `eslint.config.js`, `tailwind.config.js`, `vitest.config.js`, `vite.config.js`
- Context: `src/context/TaskContext.jsx`
- Services: `src/services/taskService.js`, `src/services/statsService.js`
- Utils: `src/utils/dateHelpers.js`
- Main entry: `src/main.jsx`, `src/App.jsx`
