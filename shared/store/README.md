# Shared State Management for Microfrontends

This directory contains shared state management solutions for communication between microfrontends in our application architecture.

## Overview

The shared store provides a mechanism for microfrontends to communicate with each other by sharing state across application boundaries. This is essential for creating a cohesive user experience while maintaining the independence of individual microfrontends.

## Key Features

- **Cross-Microfrontend Communication**: Enable different microfrontends to communicate without tight coupling
- **Centralized State Management**: Maintain a single source of truth for shared application state
- **Runtime Integration**: Allow microfrontends to dynamically subscribe to state changes
- **Module Federation Compatible**: Designed to work with Webpack Module Federation

## Usage

### Importing the Store

```javascript
// In any microfrontend component
import { useSharedStore } from 'shared/store';

const MyComponent = () => {
  const { state, dispatch } = useSharedStore();
  
  // Access shared state
  console.log(state.someValue);
  
  // Update shared state
  dispatch({ type: 'UPDATE_VALUE', payload: { newValue: 'example' }});
  
  return <div>...</div>;
};
```

### Available Actions

The store supports the following actions:

- `UPDATE_USER`: Update user information
- `SET_THEME`: Change application theme
- `SET_LANGUAGE`: Change application language
- `ADD_NOTIFICATION`: Add a new notification
- `CLEAR_NOTIFICATIONS`: Clear all notifications

## State Persistence

By default, critical parts of the shared state are persisted in localStorage to survive page refreshes and provide a consistent experience across the application.

## Best Practices

1. **Minimize Shared State**: Only share what is absolutely necessary across microfrontends
2. **Use Namespaces**: Organize state by microfrontend to avoid conflicts
3. **Prefer Events for Simple Communication**: For simple interactions, use events instead of shared state
4. **Document State Changes**: Always document what state your microfrontend modifies

## Implementation Details

The shared store is implemented using React Context API and is made available to all microfrontends through Module Federation. The Redux pattern is used for state management with reducers handling different domains of the application.
