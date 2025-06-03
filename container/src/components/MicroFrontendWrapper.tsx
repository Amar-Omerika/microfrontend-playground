import React, { useEffect, useRef } from 'react';

interface MicroFrontendWrapperProps {
  name: string;
  host: string;
  history?: History;
}

// This component is a wrapper that will mount microfrontends
const MicroFrontendWrapper: React.FC<MicroFrontendWrapperProps> = ({ name, host }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // This will only work once the microfrontends are created and properly expose their mount functions
    // For now this is a placeholder
    const mount = (window as any)[name]?.mount;
    
    if (mount && containerRef.current) {
      try {
        mount(containerRef.current);
        
        return () => {
          // Cleanup when this component unmounts
          const unmount = (window as any)[name]?.unmount;
          if (unmount) {
            unmount(containerRef.current);
          }
        };
      } catch (error) {
        console.error(`Error mounting ${name} microfrontend:`, error);
      }
    } else {
      console.warn(`Microfrontend ${name} is not loaded or doesn't export mount function`);
    }
  }, [name, host]);

  return (
    <div className="microfrontend-container">
      <div className="py-4">
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
          <p className="font-bold">Microfrontend Placeholder: {name}</p>
          <p>This component will load the actual microfrontend from {host} once it's implemented.</p>
        </div>
      </div>
      <div ref={containerRef} />
    </div>
  );
};

export default MicroFrontendWrapper;
