// Bootstrap file for Module Federation
// This ensures all remote modules are loaded before rendering the app

import("./App").then((module) => {
  const { default: App } = module;
  
  import("react").then(({ createElement }) => {
    import("react-dom/client").then(({ createRoot }) => {
      const container = document.getElementById("root");
      const root = createRoot(container!);
      root.render(createElement(App));
    });
  });
});
