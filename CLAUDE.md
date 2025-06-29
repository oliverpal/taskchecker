# Task Checker - Claude Code Documentation

## Project Overview

Task Checker is a modern, multilingual Progressive Web App (PWA) built with Angular 20. It's a to-do list application that supports English and German languages, with local storage persistence and offline functionality.

## Technology Stack

- **Framework**: Angular 20 (Latest)
- **Language**: TypeScript 5.8.3
- **Styling**: SCSS
- **Build Tool**: Angular CLI with new application builder
- **PWA**: Angular Service Worker
- **Testing**: Jasmine + Karma
- **Package Manager**: PNPM (preferred) + NPM (fallback)

## Project Structure

```text
src/
├── app/
│   ├── components/           # Reusable UI components
│   │   ├── language-switcher/
│   │   └── task-list/
│   ├── i18n/                # Internationalization files
│   │   ├── en.translations.ts
│   │   ├── de.translations.ts
│   │   └── index.ts
│   ├── models/              # TypeScript interfaces
│   │   ├── task.model.ts
│   │   └── translation.model.ts
│   ├── services/            # Business logic services
│   │   ├── local-storage.service.ts
│   │   ├── task.service.ts
│   │   └── translation.service.ts
│   ├── app.component.*      # Root component
│   ├── app.config.ts        # Application configuration
│   └── app.routes.ts        # Routing configuration
├── public/                  # Static assets
│   ├── icons/              # PWA icons
│   └── manifest.webmanifest # PWA manifest
└── index.html              # Main HTML file
```

## Architecture Patterns

### 1. Angular Signals Architecture

The app uses Angular's latest reactive primitives:

- **Signals**: For reactive state management (`signal()`)
- **Computed**: For derived state (`computed()`)
- **Dependency Injection**: Using `inject()` function

### 2. Service Layer

- **TaskService**: Manages task CRUD operations with local storage persistence
- **TranslationService**: Handles i18n with automatic language detection
- **LocalStorageService**: Abstracts browser localStorage with error handling

### 3. Component Architecture

- **Standalone Components**: All components use the new standalone API
- **Signal-based State**: Components use signals for reactive updates
- **Template-driven Forms**: Uses Angular Forms module for user input

## Key Features

1. **Task Management**: Create, edit, delete, and toggle task completion
2. **Progress Tracking**: Visual progress bar and completion statistics
3. **Internationalization**: English/German support with browser language detection
4. **Data Persistence**: Local storage with automatic save/load
5. **PWA Support**: Offline functionality and installable app
6. **Responsive Design**: Mobile-first SCSS styling

## Development Commands

### Setup

```bash
# Install dependencies (preferred)
pnpm install

# Alternative with npm
npm install
```

### Development

```bash
# Start development server
ng serve
# or
npm start

# Build for production
ng build

# Watch mode for development
ng build --watch --configuration development
```

### Testing

```bash
# Run unit tests
ng test
# or 
npm test

# Run tests in CI mode
ng test --watch=false --browsers=ChromeHeadless
```

### Code Generation

```bash
# Generate component
ng generate component component-name

# Generate service
ng generate service service-name

# Generate other schematics
ng generate --help
```

## Configuration Files

### Angular Configuration

- `angular.json`: Main Angular CLI configuration
- `tsconfig.json`: TypeScript configuration with strict mode
- `tsconfig.app.json`: App-specific TypeScript config
- `tsconfig.spec.json`: Test-specific TypeScript config

### PWA Configuration

- `ngsw-config.json`: Service worker configuration
- `public/manifest.webmanifest`: PWA manifest file

## Code Standards

### TypeScript Configuration

- Strict mode enabled
- No implicit returns
- No fallthrough cases in switch statements
- Experimental decorators enabled
- ES2022 target

### Angular Configuration

- Strict injection parameters
- Strict input access modifiers
- Strict templates
- Component style: SCSS

## State Management

The app uses Angular Signals for state management:

```typescript
// Signal declaration
private readonly tasksSignal = signal<Task[]>([]);

// Computed properties
public readonly tasks = computed(() => this.tasksSignal());

// Updating signals
this.tasksSignal.set(newTasks);
```

## Internationalization

The i18n system supports:

- English (`en`) - Default language
- German (`de`)
- Automatic browser language detection
- Nested translation keys with dot notation
- Parameter substitution for dynamic content

Example usage:

```typescript
// Simple translation
this.translationService.translate('app.title')

// Translation with parameters
this.translationService.translateWithParams('key', { param: 'value' })
```

## Data Models

### Task Interface

```typescript
interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  completedAt?: Date;
}
```

### Translation Structure

Translations are strongly typed with nested interfaces for better maintainability.

## Local Storage

- Key prefix: `tc_` (task checker)
- Tasks stored under: `tc_tasks`
- Language preference: `tc_selectedLanguage`
- Automatic error handling with console logging

## PWA Features

- Offline functionality via Angular Service Worker
- Installable on mobile and desktop
- App icons for various sizes (72x72 to 512x512)
- Standalone display mode
- Theme colors: Primary #3b82f6, Background #f8fafc

## Development Guidelines

### Adding New Features

1. Create models in `src/app/models/`
2. Implement services in `src/app/services/`
3. Build components in `src/app/components/`
4. Add translations to both language files
5. Update interfaces if needed
6. Write unit tests

### Adding New Languages

1. Create translation file in `src/app/i18n/`
2. Add to `SupportedLanguage` type
3. Update translation detection logic
4. Add language option to switcher component

### Testing

- Unit tests are co-located with source files
- Use Jasmine for test structure
- Mock services for component testing
- Test reactive signals and computed properties

## Common Tasks

### Adding a New Component

```bash
ng generate component components/new-component
```

### Adding a New Service

```bash
ng generate service services/new-service
```

### Running in Different Modes

```bash
# Development
ng serve

# Production build
ng build --configuration production

# PWA testing (requires HTTPS)
ng build && npx http-server dist/taskchecker -p 8080 -c-1
```

### Constraints
- Do not import CommonModule, only import what is needed from there
- Always use new angular template syntax
- Favor signals and signnal inputs and outputs


## Troubleshooting

### Common Issues

1. **PWA not updating**: Clear service worker cache in DevTools
2. **Translation missing**: Check both language files have the key
3. **Local storage errors**: Check browser storage limits
4. **Build errors**: Ensure all TypeScript strict checks pass

### Debug Mode

The app includes console logging for localStorage operations and service worker registration.

## Future Development Notes

- The app uses standalone components (Angular 14+)
- Signal-based state management (Angular 16+)
- New control flow syntax ready (`@if`, `@for` - Angular 17+)
- PWA configured for production deployment
- Scalable i18n architecture for additional languages
