# App1 Microfrontend

## Overview

This is a standalone microfrontend application that demonstrates the microfrontend architecture. App1 features a simple counter component that can be integrated into the container application.

## Technology Stack

- **React 18**: UI component library
- **TypeScript**: Type-safe JavaScript
- **Webpack 5**: Module bundler with Module Federation support
- **React Router 6**: For client-side routing within the microfrontend
- **Tailwind CSS**: Utility-first CSS framework for styling

## Project Structure

```
app1/
├── public/              # Static assets
├── src/                 # Source code
│   ├── App.tsx          # Main application component with counter functionality
│   ├── bootstrap.tsx    # Application bootstrap logic for module federation
│   ├── index.css        # Global styles
│   └── index.tsx        # Entry point
├── webpack.common.js    # Common webpack configuration
├── webpack.dev.js       # Development-specific webpack configuration
├── webpack.prod.js      # Production-specific webpack configuration
├── tsconfig.json        # TypeScript configuration
├── tailwind.config.js   # Tailwind CSS configuration
└── package.json         # Project dependencies and scripts
```

## Setup and Installation

1. Make sure you have Node.js (v14+) and npm installed

2. Install dependencies:
   ```bash
   cd microfrontends/app1
   npm install
   ```

## Development

To run app1 in standalone development mode:

```bash
npm start
```

This will start the development server at `http://localhost:3001` with hot module replacement enabled.

## Production Build

To create a production build:

```bash
npm run build
```

The compiled assets will be placed in the `dist` directory.

## Module Federation Configuration

App1 is configured to be consumed by the container application using Webpack Module Federation:

- **Name**: app1
- **Filename**: remoteEntry.js
- **Exposed Modules**:
  - `./App1Index` - The main entry point of App1

## Integration with Container

App1 is designed to be integrated into the container application. When running both applications:

1. Container will load App1's remote entry
2. App1 will be rendered in the designated area within the container
3. App1 maintains its own state and functionality

## Features

App1 demonstrates:

- Basic React component with state management
- Counter functionality with increment/decrement buttons
- Standalone operation and federated operation modes
- Custom styling with Tailwind CSS

## Environment Variables

The following environment variables can be configured:

- `PORT` - The port App1 runs on (defaults to 3001)
- `CONTAINER_URL` - URL to the container application (for development)

## Local Development with Container

For the best development experience:

1. Start both the container and App1:
   ```bash
   # In one terminal
   cd ../../container
   npm start
   
   # In another terminal
   cd microfrontends/app1
   npm start
   ```

2. View the integrated application at the container's URL (default: http://localhost:8080)

## Notes for Development

- Changes made to App1 will automatically reflect in the container when using hot module replacement
- App1 can be developed independently from other microfrontends
- Shared dependencies are managed through the Module Federation configuration
