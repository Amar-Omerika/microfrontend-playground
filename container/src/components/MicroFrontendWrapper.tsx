import React, { useEffect, useRef, useState } from 'react';

interface MicroFrontendWrapperProps {
  name: string;
  host: string;
  history?: History;
}

// Dynamic federation - load remote modules
type FederatedModule = {
  get: <T>(module: string) => Promise<T>;
};

// Load the remote container entry point
const loadRemoteContainer = (remoteName: string, remoteUrl: string): Promise<FederatedModule> => {
  return new Promise((resolve, reject) => {
    // Check if the remote is already loaded
    if ((window as any)[remoteName]) {
      console.log(`Remote ${remoteName} already loaded`);
      return resolve((window as any)[remoteName]);
    }

    console.log(`Loading remote container: ${remoteUrl}`);
    const script = document.createElement('script');
    script.src = remoteUrl;
    script.type = 'text/javascript';
    script.async = true;
    script.onload = () => {
      // After script loads, container should be in window global
      const container = (window as any)[remoteName];
      if (!container) {
        reject(new Error(`Remote container ${remoteName} was not found after loading`));
        return;
      }

      console.log(`Successfully loaded remote container: ${remoteName}`);
      // Initialize the container
      container.init((window as any).app1ShareScope || {});
      resolve(container);
    };
    script.onerror = () => {
      reject(new Error(`Failed to load remote container: ${remoteName} from ${remoteUrl}`));
    };
    document.head.appendChild(script);
  });
};

// Load and mount a module from a remote container
const loadRemoteModule = async <T,>(remoteName: string, remoteUrl: string, moduleName: string): Promise<T> => {
  try {
    const container = await loadRemoteContainer(remoteName, remoteUrl);
    return await container.get(moduleName);
  } catch (error) {
    console.error(`Error loading remote module ${moduleName} from ${remoteName}:`, error);
    throw error;
  }
};

// This component is a wrapper that will mount microfrontends
const MicroFrontendWrapper: React.FC<MicroFrontendWrapperProps> = ({ name, host }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    let isMounted = true;
    const remoteUrl = `${host}/remoteEntry.js`;
    let unmountFn: (() => void) | undefined;
    
    const mountMicrofrontend = async () => {
      try {
        setLoading(true);
        console.log(`Loading microfrontend: ${name} from ${host}`);
        
        // Use the module federation pattern to load the module
        // For app1, we'll try to load the 'App1Index' module, for app2, 'App2Index'
        const moduleName = name === 'app1' ? './App1Index' : './App2Index';
        
        const { mount } = await loadRemoteModule<{ mount: (el: Element) => { unmount: () => void } }>(
          name,
          remoteUrl,
          moduleName
        );
        
        if (mount && containerRef.current && isMounted) {
          console.log(`Mounting microfrontend: ${name}`);
          const result = mount(containerRef.current);
          unmountFn = result.unmount;
          if (isMounted) setLoading(false);
        } else if (isMounted) {
          setError(`Failed to mount microfrontend: ${name}`);
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
    
    mountMicrofrontend();
    
    return () => {
      isMounted = false;
      if (unmountFn && typeof unmountFn === 'function') {
        try {
          console.log(`Unmounting microfrontend: ${name}`);
          unmountFn();
        } catch (e) {
          console.error(`Error unmounting ${name}:`, e);
        }
      }
    };
  }, [name, host]);

  if (loading) {
    return (
      <div className="microfrontend-loading p-8 text-center">
        <div className="animate-pulse inline-block h-8 w-8 rounded-full bg-blue-500 opacity-75"></div>
        <p className="mt-4 text-gray-600">Loading {name} microfrontend from {host}...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="microfrontend-error bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-4">
        <p className="font-bold">Error Loading Microfrontend</p>
        <p>{error}</p>
        <p className="mt-2 text-sm">
          Make sure the microfrontend server is running at {host}
        </p>
      </div>
    );
  }

  return <div ref={containerRef} className="microfrontend-container" />;
};

export default MicroFrontendWrapper;
