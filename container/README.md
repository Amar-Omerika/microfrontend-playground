# Container Application for Microfrontends

## Overview

This container application serves as the shell or host application in our microfrontend architecture. It is responsible for:

- Loading and rendering various microfrontends
- Providing shared application layout (header, footer, navigation)
- Managing routing and navigation between microfrontends
- Handling authentication and global state when necessary

## Technology Stack

- **React 18**: Modern UI library for component-based development
- **TypeScript**: Type-safe JavaScript for better developer experience
- **Webpack 5**: Module bundler with Module Federation support
- **React Router 6**: For client-side routing
- **Tailwind CSS**: Utility-first CSS framework for styling

## Project Structure

```
container/
├── public/              # Static assets
├── src/                 # Source code
│   ├── components/      # Shared components used across the container
│   ├── pages/           # Page-level components 
│   ├── styles/          # Global styles
│   ├── types/           # TypeScript type definitions
│   ├── App.tsx          # Main application component
│   ├── bootstrap.tsx    # Application bootstrap logic
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
   cd container
   npm install
   ```

## Development

To run the container application in development mode:

```bash
npm start
```

This will start the development server at `http://localhost:8080` with hot module replacement enabled.

## Production Build

To create a production build:

```bash
npm run build
```

The compiled assets will be placed in the `dist` directory.

## Module Federation Configuration

The container application uses Webpack Module Federation to dynamically load and render microfrontends. This is configured in the webpack configuration files:

- `webpack.common.js` - Shared configuration
- `webpack.dev.js` - Development-specific settings with remote microfrontend URLs
- `webpack.prod.js` - Production settings with CDN or deployed microfrontend URLs

## Integrating Microfrontends

To integrate a new microfrontend:

1. Configure the remote in the webpack config
2. Import the remote component using dynamic imports
3. Mount it in the appropriate route/location in the container application

## Environment Variables

The following environment variables can be configured:

- `PORT` - The port the container runs on (defaults to 8080)
- `API_URL` - URL for backend API services
- `MFE_*_URL` - URLs for various microfrontends in production

## Deployment

For deployment to production environments, a CI/CD pipeline should build the container with `npm run build` and deploy the resulting `dist` directory to your hosting platform.

## Notes for Development

- The container should be kept as lightweight as possible
- Shared dependencies should be managed carefully to avoid version conflicts
- CSS styles should use appropriate namespacing to avoid collision with microfrontends
