# AI Coding Agent Instructions

## Project Overview

This workspace contains two React PWA projects built with Vite, TypeScript, and Tailwind CSS:

- **`lunar-calendar-pwa/`**: Chinese lunar calendar with festival tracking and multi-language support
- **`foodie-app-pwa/`**: Food-focused application (early stage)

## Architecture Patterns

### Multi-Language Support Pattern

Use the `MultiLanguageText` interface for all user-facing text:

```typescript
interface MultiLanguageText {
  en: string;
  zh: string;
}
```

Always provide both English and Chinese translations. Example in `src/data/lunarFestivals.json`.

### Abstract Service Layer Pattern

All third-party libraries must be wrapped in abstract interfaces. See `src/services/lunarCalendarAdapter.ts`:

- Define interface first (`ILunarCalendarService`)
- Implement adapter class (`LunarJavaScriptAdapter`)
- Use factory function for singleton access (`getLunarCalendarService()`)
- Always include fallback implementations for reliability

### Async/Sync Dual Methods

For calendar utilities, provide both async (accurate) and sync (fallback) versions:

```typescript
static async getCurrentLunarDate(): Promise<LunarDate>
static getCurrentLunarDateSync(): LunarDate
```

## Code Style Conventions

### Conditional Rendering

**ALWAYS** convert ternary operators to explicit if-else statements on separate lines:

```typescript
// ❌ Avoid ternary
const text = isToday ? "bg-yellow-100" : "border-gray-200";

// ✅ Use if-else
let backgroundClass;
if (isToday) {
  backgroundClass = "bg-yellow-100";
} else {
  backgroundClass = "border-gray-200";
}
```

### Component Organization

- Main components in `src/components/`
- Type definitions in `src/types/`
- Utilities in `src/utils/`
- Services (adapters) in `src/services/`
- Static data in `src/data/`

## Development Workflow

### Package Management

Use `pnpm` for all package operations:

```bash
pnpm install
pnpm dev
pnpm build
pnpm lint
```

### Tailwind CSS Setup

Projects use Tailwind CSS v4 with Vite plugin integration. Color palette for lunar calendar:

- Primary: `#FFD700` (Gold)
- Secondary: `#FF4500` (Orange Red)
- Accent: `#8B0000` (Dark Red)

### TypeScript Configuration

Each project uses dual TypeScript configs:

- `tsconfig.app.json` - App source code
- `tsconfig.node.json` - Vite configuration
- Root `tsconfig.json` - References both

## Key Integration Points

### Lunar Calendar Library

The `lunar-javascript` library is dynamically imported in the adapter to handle cases where it's not available:

```typescript
const lunarModule = await import("lunar-javascript");
```

Always provide fallback calculations for offline reliability.

### Event Management

Personal events and festivals use separate data structures but share the same `LunarDate` interface. Events are managed in component state (no backend in v1).

### PWA Considerations

- Projects include `manifest.json` for PWA functionality
- Static JSON data files should be in `public/` or `src/data/`
- Use Vite's asset handling for optimal bundling

## Testing & Debugging

### Error Handling Pattern

Always wrap third-party library calls in try-catch with fallbacks:

```typescript
try {
  return await externalService.method();
} catch (error) {
  console.error("Service error, using fallback", error);
  return fallbackMethod();
}
```

### Calendar Date Validation

When working with lunar dates, always validate month (1-12) and day (1-30) ranges using utility methods in `LunarCalendarUtils`.

## File Naming Conventions

- React components: PascalCase (e.g., `LunarCalendar.tsx`)
- Utilities: camelCase (e.g., `lunarCalendar.ts`)
- Types: camelCase (e.g., `calendar.ts`)
- Data files: kebab-case (e.g., `lunar-festivals.json`)

Focus on the established patterns when extending functionality, especially the service abstraction layer and multi-language support structure.
