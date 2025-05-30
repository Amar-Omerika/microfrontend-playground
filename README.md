# Microfrontend Playground

This project demonstrates a microfrontend architecture using React.js. The architecture consists of:

- **Container**: The shell application that hosts and coordinates the microfrontends
- **Microfrontends**: Independent React applications that can be developed, tested, and deployed separately
  - `app1`: Example microfrontend 1
  - `app2`: Example microfrontend 2
- **Shared**: Common components, utilities, and styles shared across microfrontends

## Project Structure

```
microfrontend-playground/
├── container/           # Shell application that hosts microfrontends
├── microfrontends/      # Individual microfrontend applications
│   ├── app1/            # First microfrontend
│   └── app2/            # Second microfrontend
└── shared/              # Shared components and utilities
```

## Getting Started

1. Install dependencies in each application:
   ```
   cd container && npm install
   cd microfrontends/app1 && npm install
   cd microfrontends/app2 && npm install
   ```

2. Start the development servers:
   ```
   # Start container
   cd container && npm start
   
   # Start microfrontends (in separate terminals)
   cd microfrontends/app1 && npm start
   cd microfrontends/app2 && npm start
   ```

3. Open http://localhost:3000 to view the container application.

## Technologies Used

- React.js for UI components
- Webpack Module Federation for microfrontend loading
- React Router for navigation