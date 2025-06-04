import React, { useEffect, useRef, useState } from 'react';

interface MicroFrontendWrapperProps {
  name: string;
  host: string;
  history?: History;
}

// Declare webpack's global scope type
interface WindowWithContainers extends Window {
  __webpack_init_sharing__?: (scopeName: string) => Promise<void>;
  __webpack_share_scopes__?: { default: any };
  [key: string]: any;
}

// Simple promise-based script loader
const loadScript = (url: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const element = document.createElement('script');
    element.src = url;
    element.type = 'text/javascript';
    element.async = true;

    element.onload = () => resolve();
    element.onerror = () => reject(new Error(`Failed to load script: ${url}`));

    document.head.appendChild(element);
  });
};

// Load remote module using dynamic federation
const loadRemote = async (remoteName: string, remoteUrl: string, moduleName: string) => {
  console.log(`Loading remote: ${remoteName} from ${remoteUrl}, module: ${moduleName}`);
  
  // Make sure webpack is ready with share scope
  const windowWithContainers = window as WindowWithContainers;
  
  // Initialize the share scope
  if (!windowWithContainers.__webpack_share_scopes__) {
    windowWithContainers.__webpack_share_scopes__ = { default: {} };
  }
  
  // Initialize sharing
  if (windowWithContainers.__webpack_init_sharing__) {
    await windowWithContainers.__webpack_init_sharing__('default');
    console.log('Webpack sharing initialized');
  }
  
  // Check if container already exists
  if (!windowWithContainers[remoteName]) {
    // Load the remote script
    console.log(`Loading remote entry script from ${remoteUrl}`);
    await loadScript(remoteUrl);
    console.log(`Remote script loaded for ${remoteName}`);
  } else {
    console.log(`Remote ${remoteName} already in window scope`);
  }
  
  // Get the container
  const container = windowWithContainers[remoteName];
  if (!container) {
    throw new Error(`Remote container ${remoteName} not found after loading`); 
  }
  
  // Initialize the container
  if (container.init) {
    try {
      container.init(windowWithContainers.__webpack_share_scopes__.default);
      console.log(`Container ${remoteName} initialized`);
    } catch (e) {
      console.warn(`Container ${remoteName} may already be initialized`, e);
      // Continue despite error - it might work anyway
    }
  }
  
  // Get the module factory
  const factory = await container.get(moduleName);
  if (!factory) {
    throw new Error(`Module ${moduleName} not found in ${remoteName}`);
  }
  
  return factory();
};

// This component is a wrapper that will mount microfrontends
const MicroFrontendWrapper: React.FC<MicroFrontendWrapperProps> = ({ name, host }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRefReady, setIsRefReady] = useState(false);
  const unmountFnRef = useRef<(() => void) | undefined>();
  
  // First effect to reliably track when the ref is ready
  useEffect(() => {
    // Check if the ref is attached after the first render
    if (containerRef.current) {
      console.log(`Container ref is ready for ${name}`);
      setIsRefReady(true);
    } else {
      console.log(`Container ref not yet available for ${name}`);
      // If ref is not available immediately, check again in the next tick
      const checkRefTimeout = setTimeout(() => {
        if (containerRef.current) {
          console.log(`Container ref became available for ${name} on setTimeout check`);
          setIsRefReady(true);
        } else {
          console.error(`Container ref still not available for ${name} after render`);
        }
      }, 50);
      
      return () => clearTimeout(checkRefTimeout);
    }
  }, [name]);
  
  // Second effect that only runs once the ref is confirmed ready
  useEffect(() => {
    // Only proceed if the ref is actually ready
    if (!isRefReady || !containerRef.current) {
      return;
    }
    
    console.log(`Starting mount process for ${name} with confirmed ref:`, containerRef.current);
    
    let isMounted = true;
    const remoteUrl = `${host}/remoteEntry.js`;
    
    const mountMicrofrontend = async () => {
      try {
        console.log(`Loading microfrontend: ${name} from ${host}`);
        
        // Confirm ref is still available (defensive check)
        if (!containerRef.current) {
          console.error(`Container ref became unavailable for ${name} right before mounting`);
          throw new Error('Container element is not available');
        }
        
        // Use the module federation pattern to load the module
        const moduleName = name === 'app1' ? './App1Index' : './App2Index';
        
        // Load the remote module using our approach
        const module = await loadRemote(name, remoteUrl, moduleName);
        console.log(`Module loaded successfully for ${name}:`, module);
        
        // Verify that we have a valid module
        if (!module) {
          throw new Error(`Module ${moduleName} failed to load properly`);
        }
        
        // Check for the mount function
        if (typeof module.mount !== 'function') {
          throw new Error(`Module ${moduleName} doesn't have a mount function`);
        }

        const { mount } = module;
        
        // Final check before mounting
        if (!isMounted) {
          console.warn(`Component is no longer mounted, aborting mount for ${name}`);
          return;
        }
        
        // Since we've already checked, we can be confident the ref exists
        console.log(`Mounting microfrontend ${name} into:`, containerRef.current);
        const result = mount(containerRef.current);
        
        // Store unmount function if available
        if (result && typeof result.unmount === 'function') {
          unmountFnRef.current = result.unmount;
          console.log(`Unmount function stored for ${name}`);
        }
        
        console.log(`${name} microfrontend mounted successfully!`);
        
        if (isMounted) {
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          console.error(`Error loading ${name} microfrontend:`, err);
          setError(`Error loading microfrontend: ${err instanceof Error ? err.message : String(err)}`);
          setLoading(false);
        }
      }
    };
    
    // Start the mounting process - no delays since we already confirmed the ref exists
    mountMicrofrontend();
    
    return () => {
      isMounted = false;
      if (unmountFnRef.current) {
        try {
          console.log(`Unmounting microfrontend: ${name}`);
          unmountFnRef.current();
        } catch (e) {
          console.error(`Error unmounting ${name}:`, e);
        }
      }
    };
  }, [isRefReady, name, host]);
  
  // Always render the container div first, regardless of loading state
  // This ensures the ref is attached as early as possible
  return (
    <div className="microfrontend-wrapper">
      {loading && (
        <div className="microfrontend-loading p-8 text-center">
          <div className="animate-pulse inline-block h-8 w-8 rounded-full bg-blue-500 opacity-75"></div>
          <p className="mt-4 text-gray-600">Loading {name} microfrontend from {host}...</p>
        </div>
      )}
      
      {error && (
        <div className="microfrontend-error bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-4">
          <p className="font-bold">Error Loading Microfrontend</p>
          <p>{error}</p>
          <p className="mt-2 text-sm">
            Make sure the microfrontend server is running at {host}
          </p>
        </div>
      )}
      
      {/* Always render the container div so the ref is attached as early as possible */}
      <div 
        ref={containerRef} 
        className="microfrontend-container" 
        style={{ display: loading || error ? 'none' : 'block' }}
      />
    </div>
  );
};

export default MicroFrontendWrapper;
